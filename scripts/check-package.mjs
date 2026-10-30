import { execFileSync } from "node:child_process";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import assert from "node:assert/strict";

const root = fileURLToPath(new URL("../", import.meta.url));
const temp = await mkdtemp(join(tmpdir(), "ai-system-package-"));
const artifacts = join(temp, "artifacts");
await mkdir(artifacts, { recursive: true });
execFileSync(
  "pnpm",
  ["--filter", "@heogeon0/aui", "pack", "--pack-destination", artifacts],
  { cwd: root, stdio: "pipe" },
);
const manifest = JSON.parse(
  await readFile(join(root, "packages/design-system/package.json"), "utf8"),
);
const tarball = join(artifacts, `heogeon0-aui-${manifest.version}.tgz`);
try {
  await writeFile(
    join(temp, "package.json"),
    JSON.stringify({
      private: true,
      type: "module",
      dependencies: {
        "@heogeon0/aui": `file:${tarball}`,
        react: "19.3.1",
        "react-dom": "19.3.1",
      },
      devDependencies: {
        "@types/react": "^19.2.18",
        "@types/react-dom": "^19.2.4",
      },
    }),
  );
  const entries = execFileSync("tar", ["-tzf", tarball], { encoding: "utf8" })
    .trim()
    .split("\n");
  assert.ok(
    entries.every((path) =>
      /^package\/(dist\/|ai\/|package\.json$|README\.md$|LICENSE$|NOTICE\.md$)/.test(
        path,
      ),
    ),
    "배포 파일에는 dist·AI 문서와 패키지 문서만 포함해야 해요.",
  );
  execFileSync(
    "npm",
    [
      "install",
      "--ignore-scripts",
      "--no-audit",
      "--no-fund",
      "--package-lock=false",
    ],
    { cwd: temp, stdio: "pipe", timeout: 120_000 },
  );
  const installed = JSON.parse(
    await readFile(
      join(temp, "node_modules/@heogeon0/aui/package.json"),
      "utf8",
    ),
  );
  assert.equal(installed.name, manifest.name);
  assert.equal(installed.version, manifest.version);
  assert.equal(installed.license, "MIT");
  assert.equal(
    await readFile(join(temp, "node_modules/@heogeon0/aui/LICENSE"), "utf8"),
    await readFile(join(root, "LICENSE"), "utf8"),
    "배포 패키지에도 저장소와 같은 MIT 라이선스를 포함해야 해요.",
  );
  assert.equal(installed.publishConfig.access, "public");
  await writeFile(
    join(temp, "smoke.mjs"),
    `
    import assert from 'node:assert/strict';
    import { createElement } from 'react';
    import { renderToString } from 'react-dom/server';
    import { Button, Field, Input, ThemeProvider } from '@heogeon0/aui';
    import { defaultTheme } from '@heogeon0/aui/theme';
    import plugin from '@heogeon0/aui/eslint';
    import { existsSync } from 'node:fs';
    import { fileURLToPath } from 'node:url';
    assert.ok(existsSync(fileURLToPath(import.meta.resolve('@heogeon0/aui/styles.css'))));
    assert.ok(existsSync(fileURLToPath(import.meta.resolve('@heogeon0/aui/llms.txt'))));
    assert.ok(existsSync(fileURLToPath(import.meta.resolve('@heogeon0/aui/llms-full.txt'))));
    assert.ok(existsSync(fileURLToPath(import.meta.resolve('@heogeon0/aui/llms/Button.md'))));
    assert.ok(existsSync(new URL('node_modules/@heogeon0/aui/dist/index.d.ts', import.meta.url)));
    assert.ok(plugin.configs.recommended);
    assert.equal(plugin.meta.name, ${JSON.stringify(manifest.name)});
    assert.equal(plugin.meta.version, ${JSON.stringify(manifest.version)});
    const html = renderToString(createElement(ThemeProvider, { theme: defaultTheme },
      createElement(Field, { label: '이름' }, createElement(Input, { name: 'name' })),
      createElement(Button, { type: 'submit' }, '저장')));
    assert.match(html, /data-ds-theme="default"/);
    assert.match(html, /저장/);
    assert.match(html, /aria-describedby|for=/);
    console.log('배포 파일의 ESM·CSS·theme·ESLint·서버 렌더링을 확인했어요.');
  `,
  );
  const result = execFileSync(process.execPath, ["smoke.mjs"], {
    cwd: temp,
    encoding: "utf8",
  });
  await writeFile(
    join(temp, "consumer.tsx"),
    `
    import { Badge, Button, Field, Input, ThemeProvider, defineTheme, defaultTheme } from '@heogeon0/aui';
    import type { Theme } from '@heogeon0/aui/theme';
    const theme: Theme = defineTheme({ ...defaultTheme, name: 'consumer' });
    export const view = <ThemeProvider theme={theme}><Field label="이름"><Input name="name" /></Field><Button variant="secondary">저장</Button><Badge size="sm">준비</Badge></ThemeProvider>;
    // @ts-expect-error 소비 코드에서는 임의 색상으로 디자인을 우회할 수 없다.
    export const invalid = <Button color="red">저장</Button>;
  `,
  );
  await writeFile(
    join(temp, "tsconfig.json"),
    JSON.stringify({
      compilerOptions: {
        strict: true,
        noEmit: true,
        target: "ES2022",
        module: "NodeNext",
        moduleResolution: "NodeNext",
        jsx: "react-jsx",
      },
      files: ["consumer.tsx"],
    }),
  );
  execFileSync(
    process.execPath,
    [
      join(root, "node_modules/typescript/bin/tsc"),
      "-p",
      join(temp, "tsconfig.json"),
    ],
    { cwd: temp, stdio: "pipe" },
  );
  console.log(result.trim());
  console.log(
    "독립 프로젝트에서 설치한 타입과 제한된 props도 TypeScript로 확인했어요.",
  );
  console.log(`패키지: ${tarball}`);
} finally {
  await rm(temp, { recursive: true, force: true });
}
