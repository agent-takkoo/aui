import js from "@eslint/js";
import tseslint from "typescript-eslint";
import hooks from "eslint-plugin-react-hooks";
import designSystem from "./packages/design-system/eslint/index.mjs";

export default [
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "storybook-static/**",
      "playwright-report/**",
      "test-results/**",
      "**/type-tests/**",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        process: "readonly",
        console: "readonly",
        URL: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
        Buffer: "readonly",
        fetch: "readonly",
      },
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } },
  },
  {
    files: ["**/*.tsx"],
    plugins: { "react-hooks": hooks },
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "error",
    },
  },
  {
    files: ["apps/storybook/src/**/*.tsx"],
    ...designSystem.configs.recommended,
  },
  {
    // Storybook 문서 틀(docs-*)은 패키지 사용 예제가 아니라 카탈로그 장치다.
    files: ["apps/storybook/src/**/*.tsx"],
    rules: { "design-system/no-raw-styling": "off" },
  },
];
