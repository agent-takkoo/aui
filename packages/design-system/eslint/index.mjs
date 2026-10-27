const packageName = "@ai-system/design-system";

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
    const components = new Set();
    const namespaces = new Set();
    return {
      ImportDeclaration(node) {
        if (node.source.value !== packageName) return;
        for (const item of node.specifiers) {
          if (item.type === "ImportNamespaceSpecifier")
            namespaces.add(item.local.name);
          else if (item.type === "ImportSpecifier")
            components.add(item.local.name);
        }
      },
      JSXOpeningElement(node) {
        const name = node.name;
        const known =
          name.type === "JSXIdentifier"
            ? components.has(name.name)
            : name.type === "JSXMemberExpression" &&
              name.object.type === "JSXIdentifier" &&
              namespaces.has(name.object.name);
        if (!known) return;
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

const noPrimitiveImports = {
  meta: {
    type: "problem",
    schema: [],
    messages: {
      primitive:
        "화면에서는 @ai-system/design-system의 공개 컴포넌트를 사용하세요. headless primitive와 내부 경로는 패키지 안에서 사용해요.",
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

const plugin = {
  meta: { name: "@ai-system/design-system", version: "0.1.0" },
  rules: {
    "no-style-overrides": noStyleOverrides,
    "no-primitive-imports": noPrimitiveImports,
  },
  configs: {},
};
plugin.configs.recommended = {
  name: "design-system/recommended",
  plugins: { "design-system": plugin },
  rules: {
    "design-system/no-style-overrides": "error",
    "design-system/no-primitive-imports": "error",
  },
};
export default plugin;
