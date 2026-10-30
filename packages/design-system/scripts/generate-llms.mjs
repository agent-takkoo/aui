import ts from "typescript";
import { mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { catalog, recipes } from "../docs/catalog.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));
const configPath = join(root, "tsconfig.json");
const config = ts.readConfigFile(configPath, ts.sys.readFile);
if (config.error)
  throw new Error(
    ts.flattenDiagnosticMessageText(config.error.messageText, "\n"),
  );
const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, root);
const examplePath = join(root, "docs/examples.tsx");
const program = ts.createProgram([...parsed.fileNames, examplePath], {
  ...parsed.options,
  paths: { "@heogeon0/aui": [join(root, "src/index.ts")] },
  noEmit: true,
});
const diagnostics = ts.getPreEmitDiagnostics(program);
if (diagnostics.length) {
  throw new Error(
    ts.formatDiagnosticsWithColorAndContext(diagnostics, {
      getCanonicalFileName: (name) => name,
      getCurrentDirectory: () => root,
      getNewLine: () => "\n",
    }),
  );
}
const checker = program.getTypeChecker();
const entry = program.getSourceFile(join(root, "src/index.ts"));
const exports = checker.getExportsOfModule(checker.getSymbolAtLocation(entry));
const resolve = (symbol) =>
  symbol.flags & ts.SymbolFlags.Alias
    ? checker.getAliasedSymbol(symbol)
    : symbol;
const values = new Map(
  exports
    .map((symbol) => [symbol.name, resolve(symbol)])
    .filter(([, symbol]) => symbol.flags & ts.SymbolFlags.Value),
);
const documented = catalog.flatMap((group) => Object.keys(group.components));
if (documented.length !== new Set(documented).size)
  throw new Error("LLM 문서의 공개 API가 중복됐어요.");
const missing = [...values.keys()].filter((name) => !documented.includes(name));
const unknown = documented.filter((name) => !values.has(name));
if (missing.length || unknown.length)
  throw new Error(
    `LLM 문서 누락: ${missing.join(", ")}; 공개하지 않은 API: ${unknown.join(", ")}`,
  );

const nativeProps = new Set([
  "children",
  "id",
  "aria-label",
  "aria-labelledby",
]);
const nativeByComponent = {
  Button: ["type", "disabled", "onClick", "form"],
  IconButton: ["type", "disabled", "onClick"],
  ButtonLink: ["href", "target", "rel"],
  LinkRow: ["href", "target", "rel"],
  ListItem: ["type", "disabled", "onClick", "form"],
  Input: [
    "type",
    "name",
    "value",
    "defaultValue",
    "onChange",
    "disabled",
    "required",
    "placeholder",
    "autoComplete",
    "inputMode",
    "readOnly",
    "form",
    "min",
    "max",
    "step",
    "minLength",
    "maxLength",
    "pattern",
  ],
  Textarea: [
    "name",
    "value",
    "defaultValue",
    "onChange",
    "disabled",
    "required",
    "placeholder",
    "autoComplete",
    "readOnly",
    "rows",
    "minLength",
    "maxLength",
    "form",
  ],
  Label: ["htmlFor"],
  Select: ["form", "disabled"],
  TableHead: ["scope", "colSpan", "rowSpan"],
  TableCell: ["colSpan", "rowSpan"],
};
const formatFlags =
  ts.TypeFormatFlags.NoTruncation |
  ts.TypeFormatFlags.UseAliasDefinedOutsideCurrentScope;
const typeText = (type, at) => checker.typeToString(type, at, formatFlags);
const code = (value) =>
  `\`${value.replaceAll("|", "\\|").replaceAll("\n", " ")}\``;
const fence = (body, language = "tsx") => `\`\`\`${language}\n${body}\n\`\`\``;
const exampleFile = program.getSourceFile(examplePath);
const exampleFunctions = new Map(
  exampleFile.statements
    .filter(ts.isFunctionDeclaration)
    .map((node) => [node.name.text, node]),
);

function example(name) {
  const included = new Set();
  const imports = new Map();
  function visitFunction(functionName) {
    if (included.has(functionName)) return;
    const node = exampleFunctions.get(functionName);
    if (!node) throw new Error(`예제가 없어요: ${functionName}`);
    included.add(functionName);
    function visit(child) {
      if (ts.isIdentifier(child)) {
        const symbol = checker.getSymbolAtLocation(child);
        for (const declaration of symbol?.declarations ?? []) {
          if (ts.isImportSpecifier(declaration)) {
            const statement = declaration.parent.parent.parent;
            const typeOnly =
              declaration.isTypeOnly || statement.importClause.isTypeOnly;
            const from = `${typeOnly ? "type:" : ""}${statement.moduleSpecifier.text}`;
            if (!imports.has(from)) imports.set(from, new Set());
            imports
              .get(from)
              .add(declaration.getText(exampleFile).replace(/^type\s+/, ""));
          } else if (
            ts.isFunctionDeclaration(declaration) &&
            declaration.getSourceFile() === exampleFile
          ) {
            visitFunction(declaration.name.text);
          }
        }
      }
      ts.forEachChild(child, visit);
    }
    ts.forEachChild(node, visit);
  }
  visitFunction(name);
  const lines = [...imports]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([from, names]) => {
      const typeOnly = from.startsWith("type:");
      return `import ${typeOnly ? "type " : ""}{ ${[...names].sort().join(", ")} } from "${typeOnly ? from.slice(5) : from}";`;
    });
  const code = [
    ...lines,
    "",
    ...[...included]
      .reverse()
      .map((item) => exampleFunctions.get(item).getText(exampleFile)),
  ].join("\n");
  generatedExamples.set(name, code);
  return code;
}
const generatedExamples = new Map();

// 생성한 예제도 저장소와 같은 설정(verbatimModuleSyntax 포함)으로 타입 검사한다.
function checkGeneratedExamples() {
  const virtualDir = join(root, "docs/.generated/");
  const virtualFiles = new Map(
    [...generatedExamples].map(([name, code]) => [
      join(virtualDir, `${name}.tsx`),
      code,
    ]),
  );
  const options = {
    ...parsed.options,
    paths: { "@heogeon0/aui": [join(root, "src/index.ts")] },
    noEmit: true,
  };
  const host = ts.createCompilerHost(options);
  const original = {
    getSourceFile: host.getSourceFile,
    fileExists: host.fileExists,
    readFile: host.readFile,
  };
  host.fileExists = (file) =>
    virtualFiles.has(file) || original.fileExists.call(host, file);
  host.readFile = (file) =>
    virtualFiles.get(file) ?? original.readFile.call(host, file);
  host.getSourceFile = (file, language, onError, shouldCreate) =>
    virtualFiles.has(file)
      ? ts.createSourceFile(file, virtualFiles.get(file), language, true)
      : original.getSourceFile.call(
          host,
          file,
          language,
          onError,
          shouldCreate,
        );
  const checkProgram = ts.createProgram(
    [...virtualFiles.keys()],
    options,
    host,
  );
  const problems = ts.getPreEmitDiagnostics(checkProgram);
  if (problems.length)
    throw new Error(
      `생성한 예제가 타입 검사를 통과하지 못했어요.\n${ts.formatDiagnosticsWithColorAndContext(
        problems,
        {
          getCanonicalFileName: (name) => name,
          getCurrentDirectory: () => root,
          getNewLine: () => "\n",
        },
      )}`,
    );
}

function defaultsFor(node) {
  const defaults = new Map();
  const binding = node?.parameters?.[0]?.name;
  if (binding && ts.isObjectBindingPattern(binding)) {
    for (const element of binding.elements) {
      if (element.initializer)
        defaults.set(
          (element.propertyName ?? element.name).getText(),
          element.initializer.getText(),
        );
    }
  }
  return defaults;
}

function api(name, symbol) {
  const node = symbol.valueDeclaration ?? symbol.declarations[0];
  const type = checker.getTypeOfSymbolAtLocation(symbol, node);
  const signature = type.getCallSignatures()[0];
  if (!signature || !/^[A-Z]/.test(name)) {
    return fence(
      signature
        ? `function ${name}${checker.signatureToString(signature, node, formatFlags)}`
        : `const ${name}: ${typeText(type, node)}`,
      "ts",
    );
  }
  const parameter = signature.parameters[0];
  if (!parameter) return "props 없음.";
  const props = checker.getTypeOfSymbolAtLocation(parameter, node);
  const defaults = defaultsFor(signature.declaration);
  const rows = props
    .getProperties()
    .filter((prop) => {
      const value = checker.getTypeOfSymbolAtLocation(prop, node);
      if (value.flags & (ts.TypeFlags.Undefined | ts.TypeFlags.Never))
        return false;
      const declarations = prop.declarations ?? [];
      return (
        nativeProps.has(prop.name) ||
        nativeByComponent[name]?.includes(prop.name) ||
        !(prop.flags & ts.SymbolFlags.Optional) ||
        declarations.some(
          (decl) => !decl.getSourceFile().fileName.includes("/@types/react/"),
        )
      );
    })
    .map((prop) => {
      const value = checker.getTypeOfSymbolAtLocation(prop, node);
      const required = !(prop.flags & ts.SymbolFlags.Optional);
      return `| ${code(prop.name)} | ${code(typeText(value, node).replace(/ \| undefined$/, ""))} | ${required ? "필수" : "—"} | ${defaults.has(prop.name) ? code(defaults.get(prop.name)) : "—"} |`;
    });
  const generics = signature.declaration?.typeParameters
    ?.map((parameter) => parameter.getText())
    .join(", ");
  return [
    generics ? `제네릭: ${code(generics)}.\n` : "",
    "| prop | 타입 | 필수 | 코드에 지정한 기본값 |",
    "| --- | --- | --- | --- |",
    ...rows,
  ]
    .filter(Boolean)
    .join("\n");
}

// 옵션 객체·union 등 공개 타입만 필요한 문서에 함께 넣는다.
const typeDeclarations = new Map(
  exports
    .filter(
      (symbol) => !values.has(symbol.name) && !symbol.name.endsWith("Props"),
    )
    .map((symbol) => {
      const node = resolve(symbol).declarations[0];
      return [symbol.name, node.getText()];
    }),
);
for (const name of [
  "colorScaleNames",
  "neutralScaleNames",
  "radiusNames",
  "scalingNames",
  "typographyRoleNames",
]) {
  typeDeclarations.set(
    name,
    `export const ${values.get(name).valueDeclaration.getText()};`,
  );
}
function relatedTypes(text) {
  const selected = new Map();
  function collect(body) {
    for (const name of body.match(/\b[A-Za-z][A-Za-z0-9]*\b/g) ?? []) {
      if (selected.has(name) || !typeDeclarations.has(name)) continue;
      const declaration = typeDeclarations.get(name);
      selected.set(name, declaration);
      collect(declaration);
    }
  }
  collect(text);
  return selected.size
    ? `\n\n## 관련 타입\n\n${fence([...selected.values()].join("\n\n"), "ts")}`
    : "";
}

const manifest = JSON.parse(await readFile(join(root, "package.json"), "utf8"));
const guide = await readFile(join(root, "docs/guide.md"), "utf8");
const files = new Map([["llms/guide.md", guide]]);
const storyMap = {};
const full = [guide.trim()];
for (const group of catalog) {
  const usage = example(group.example);
  const names = Object.keys(group.components);
  const groupApis = [];
  for (const title of group.stories) {
    if (storyMap[title]) throw new Error(`Storybook 연결 중복: ${title}`);
    storyMap[title] = names;
  }
  for (const [name, description] of Object.entries(group.components)) {
    const props = api(name, values.get(name));
    groupApis.push(`### ${name}\n\n${props}`);
    const document =
      [
        `# ${name}`,
        description,
        `[설정·공통 규칙](./guide.md) · ${manifest.name}@${manifest.version}`,
        "## 사용",
        ...group.rules.map((rule) => `- ${rule}`),
        "## API",
        props + relatedTypes(props),
        "## 예제",
        fence(usage),
      ].join("\n\n") + "\n";
    files.set(`llms/${name}.md`, document);
  }
  const combinedApi = groupApis.join("\n\n");
  full.push(
    [
      `## ${names.join(" · ")}`,
      group.rules.map((rule) => `- ${rule}`).join("\n"),
      combinedApi + relatedTypes(combinedApi),
      "### 예제",
      fence(usage),
    ].join("\n\n"),
  );
}
for (const recipe of recipes) {
  const usage = example(recipe.example);
  files.set(
    `llms/recipes/${recipe.id}.md`,
    [
      `# ${recipe.title}`,
      recipe.description,
      `[설정·공통 규칙](../guide.md) · ${manifest.name}@${manifest.version}`,
      "## 예제",
      fence(usage),
    ].join("\n\n") + "\n",
  );
  full.push(
    [`## 레시피 · ${recipe.title}`, recipe.description, fence(usage)].join(
      "\n\n",
    ),
  );
}
checkGeneratedExamples();
files.set("agents.md", await readFile(join(root, "docs/agents.md"), "utf8"));
files.set(
  "skill/SKILL.md",
  await readFile(join(root, "docs/skill/SKILL.md"), "utf8"),
);
files.set("llms/story-map.json", JSON.stringify(storyMap, null, 2) + "\n");
files.set(
  "llms.txt",
  [
    "# AUI",
    `> ${manifest.name}@${manifest.version}`,
    "## 시작",
    "- [설정·공통 규칙](./llms/guide.md): 하지 않는 것, 화면을 만드는 순서, 컴포넌트 선택 기준",
    "- [소비 프로젝트 AGENTS.md 규칙](./agents.md)",
    "- [Claude Code 스킬](./skill/SKILL.md)",
    "## 화면 레시피",
    ...recipes.map(
      (recipe) =>
        `- [${recipe.title}](./llms/recipes/${recipe.id}.md): ${recipe.description}`,
    ),
    "## API",
    ...documented.map((name) => `- [${name}](./llms/${name}.md)`),
    "## Optional",
    "- [전체 문서](./llms-full.txt)",
    "",
  ].join("\n\n"),
);
files.set("llms-full.txt", full.join("\n\n---\n\n") + "\n");

const output = join(root, "ai");
async function existing(directory) {
  const entries = await readdir(directory, { withFileTypes: true }).catch(
    (error) => {
      if (error.code === "ENOENT") return [];
      throw error;
    },
  );
  const result = [];
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) result.push(...(await existing(path)));
    else result.push(relative(output, path));
  }
  return result;
}
const oldFiles = await existing(output);
const check = process.argv.includes("--check");
const changed = [];
for (const [name, content] of files) {
  const path = join(output, name);
  const before = await readFile(path, "utf8").catch((error) => {
    if (error.code === "ENOENT") return null;
    throw error;
  });
  if (before === content) continue;
  changed.push(name);
  if (!check) {
    await mkdir(dirname(path), { recursive: true });
    await writeFile(path, content);
  }
}
for (const name of oldFiles.filter((name) => !files.has(name))) {
  changed.push(name);
  if (!check) await rm(join(output, name));
}
if (check && changed.length)
  throw new Error(`LLM 문서를 다시 생성하세요: ${changed.join(", ")}`);
console.log(
  `LLM 문서: 공개 API ${documented.length}개, 예제 ${catalog.length}개 확인${check ? "" : "·생성"}.`,
);
