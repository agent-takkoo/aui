import test from "node:test";
import assert from "node:assert/strict";
import {
  defineTheme,
  defaultTheme,
  creamTheme,
  colorTokenNames,
} from "../packages/design-system/dist/theme/index.js";

test("두 theme은 light와 dark에서 같은 공통 token을 제공한다", () => {
  for (const theme of [defaultTheme, creamTheme]) {
    assert.equal(Object.keys(theme.light).length, colorTokenNames.length);
    assert.equal(Object.keys(theme.dark).length, colorTokenNames.length);
    assert.notEqual(theme.light.primary, theme.dark.primary);
  }
});

test("빠진 token과 공백 값은 런타임에서도 거부한다", () => {
  assert.throws(
    () =>
      defineTheme({
        ...defaultTheme,
        light: { ...defaultTheme.light, primary: "" },
      }),
    /light.primary/,
  );
  assert.throws(
    () => defineTheme({ ...defaultTheme, dark: undefined }),
    /dark.background/,
  );
  assert.throws(
    () => defineTheme({ ...defaultTheme, name: "Invalid name" }),
    /Theme 이름/,
  );
});

test("정의한 theme은 호출자가 나중에 바꿀 수 없다", () => {
  const light = { ...defaultTheme.light };
  const theme = defineTheme({ ...defaultTheme, light });
  light.primary = "#ff0000";
  assert.equal(theme.light.primary, defaultTheme.light.primary);
  assert.throws(() => {
    theme.dark.primary = "#000";
  }, TypeError);
});

test("typography는 역할별 필수값을 검사하고 깊이 복사해 고정한다", () => {
  const body = { ...defaultTheme.typography.body };
  const theme = defineTheme({
    ...defaultTheme,
    typography: { ...defaultTheme.typography, body },
  });
  body.size = "4rem";
  assert.equal(theme.typography.body.size, defaultTheme.typography.body.size);
  assert.throws(() => {
    theme.typography.body.size = "4rem";
  }, TypeError);
  assert.throws(() => {
    theme.typography.weights.bold = 900;
  }, TypeError);
  assert.throws(
    () => defineTheme({ ...defaultTheme, typography: undefined }),
    /typography.display.size/,
  );
  assert.throws(
    () =>
      defineTheme({
        ...defaultTheme,
        typography: {
          ...defaultTheme.typography,
          body: { ...body, lineHeight: "" },
        },
      }),
    /typography.body.lineHeight/,
  );
  assert.throws(
    () =>
      defineTheme({
        ...defaultTheme,
        typography: {
          ...defaultTheme.typography,
          weights: { ...defaultTheme.typography.weights, bold: NaN },
        },
      }),
    /weights.bold/,
  );
});
