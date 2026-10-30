const packageName = "@heogeon0/aui";
const foreignUiPackages = [
  "@mui/",
  "@chakra-ui/",
  "@headlessui/",
  "@mantine/",
  "@radix-ui/themes",
  "antd",
  "react-bootstrap",
  "@ark-ui/",
  "@nextui-org/",
  "@heroui/",
  "daisyui",
  "styled-components",
  "@emotion/",
  "@stitches/",
  "@vanilla-extract/",
  "clsx",
  "tailwind-merge",
  "class-variance-authority",
];

function importedComponents() {
  const components = new Set();
  const namespaces = new Set();
  return {
    components,
    namespaces,
    collect(node) {
      if (node.source.value !== packageName) return;
      for (const item of node.specifiers) {
        if (item.type === "ImportNamespaceSpecifier")
          namespaces.add(item.local.name);
        else if (item.type === "ImportSpecifier")
          components.add(item.local.name);
      }
    },
    isPackageElement(name) {
      return name.type === "JSXIdentifier"
        ? components.has(name.name)
        : name.type === "JSXMemberExpression" &&
            name.object.type === "JSXIdentifier" &&
            namespaces.has(name.object.name);
    },
  };
}

const noStyleOverrides = {
  meta: {
    type: "problem",
    schema: [],
    messages: {
      override:
        "{{name}} 대신 공개 variant·size·레이아웃 props를 사용하세요. 디자인을 바꾸려면 theme이나 패키지의 선택지를 수정하세요.",
    },
  },
  create(context) {
    const imports = importedComponents();
    return {
      ImportDeclaration: imports.collect,
      JSXOpeningElement(node) {
        if (!imports.isPackageElement(node.name)) return;
        for (const attribute of node.attributes) {
          if (
            attribute.type === "JSXAttribute" &&
            ["className", "style", "color"].includes(attribute.name.name)
          ) {
            context.report({
              node: attribute,
              messageId: "override",
              data: { name: attribute.name.name },
            });
          }
        }
      },
    };
  },
};

const noRawStyling = {
  meta: {
    type: "problem",
    schema: [
      {
        type: "object",
        properties: {
          allowClassNames: { type: "array", items: { type: "string" } },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      raw: "<{{element}}>에 {{name}}을(를) 쓰지 마세요. 배치는 Stack·Inline·Grid·Container, 표면은 Card·Panel, 글자는 Text·Heading을 사용하세요. 없는 선택지는 패키지에 추가하세요.",
    },
  },
  create(context) {
    const allow = new Set(context.options[0]?.allowClassNames ?? []);
    return {
      JSXOpeningElement(node) {
        if (node.name.type !== "JSXIdentifier") return;
        const element = node.name.name;
        if (!/^[a-z]/.test(element)) return;
        for (const attribute of node.attributes) {
          if (attribute.type !== "JSXAttribute") continue;
          const name = attribute.name.name;
          if (name !== "style" && name !== "className") continue;
          if (
            name === "className" &&
            attribute.value?.type === "Literal" &&
            String(attribute.value.value)
              .split(/\s+/)
              .filter(Boolean)
              .every((item) => allow.has(item))
          )
            continue;
          context.report({
            node: attribute,
            messageId: "raw",
            data: { element, name },
          });
        }
      },
    };
  },
};

const noPrimitiveImports = {
  meta: {
    type: "problem",
    schema: [],
    messages: {
      primitive:
        "화면에서는 @heogeon0/aui의 공개 컴포넌트를 사용하세요. headless primitive와 내부 경로는 패키지 안에서 사용해요.",
    },
  },
  create(context) {
    return {
      ImportDeclaration(node) {
        const value = node.source.value;
        if (
          value.startsWith("@radix-ui/") ||
          value === "radix-ui" ||
          value.startsWith(`${packageName}/dist/`) ||
          value.startsWith(`${packageName}/src/`)
        )
          context.report({ node, messageId: "primitive" });
      },
    };
  },
};

const noForeignUi = {
  meta: {
    type: "problem",
    schema: [],
    messages: {
      foreign:
        "{{source}}은(는) 사용하지 않아요. 같은 역할의 @heogeon0/aui 컴포넌트를 쓰고, 없으면 패키지에 추가하세요.",
    },
  },
  create(context) {
    return {
      ImportDeclaration(node) {
        const value = node.source.value;
        if (
          foreignUiPackages.some(
            (name) => value === name || value.startsWith(name),
          )
        )
          context.report({
            node,
            messageId: "foreign",
            data: { source: value },
          });
      },
    };
  },
};

const noStylesheetImports = {
  meta: {
    type: "problem",
    schema: [],
    messages: {
      stylesheet:
        "화면 코드에서 {{source}}을(를) 불러오지 마세요. 외형은 theme과 패키지 CSS가 정하고, 앱 진입점에서 @heogeon0/aui/styles.css 하나만 불러와요.",
    },
  },
  create(context) {
    return {
      ImportDeclaration(node) {
        const value = node.source.value;
        if (value === `${packageName}/styles.css`) return;
        if (/\.(css|scss|sass|less|styl)$/.test(value))
          context.report({
            node,
            messageId: "stylesheet",
            data: { source: value },
          });
      },
    };
  },
};

const plugin = {
  meta: { name: "@heogeon0/aui", version: "0.1.0" },
  rules: {
    "no-style-overrides": noStyleOverrides,
    "no-raw-styling": noRawStyling,
    "no-primitive-imports": noPrimitiveImports,
    "no-foreign-ui": noForeignUi,
    "no-stylesheet-imports": noStylesheetImports,
  },
  configs: {},
};
plugin.configs.recommended = {
  name: "design-system/recommended",
  plugins: { "design-system": plugin },
  rules: {
    "design-system/no-style-overrides": "error",
    "design-system/no-raw-styling": "error",
    "design-system/no-primitive-imports": "error",
    "design-system/no-foreign-ui": "error",
    "design-system/no-stylesheet-imports": "error",
  },
};
export default plugin;
