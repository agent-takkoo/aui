import test from "node:test";
import assert from "node:assert/strict";
import {
  defineTheme,
  defaultTheme,
  creamTheme,
  resolveScale,
  themeStylesheet,
  themeKey,
  colorScaleNames,
  radiusNames,
} from "../packages/design-system/dist/theme/index.js";

test("두 preset은 라이트·다크 12단계 스케일과 역할 변수를 제공한다", () => {
  for (const theme of [defaultTheme, creamTheme]) {
    for (const mode of ["light", "dark"]) {
      const brand = resolveScale(theme.brand, mode);
      assert.equal(brand.solid.length, 12);
      assert.equal(brand.alpha.length, 12);
      assert.ok([9, 10, 11].includes(brand.solidStep));
    }
    const css = themeStylesheet(theme);
    assert.match(
      css,
      new RegExp(`\\[data-ds-theme-key="${themeKey(theme)}"\\]\\{`),
    );
    assert.match(css, /\[data-ds-mode="dark"\]\{[^}]*--ds-primary:/);
    assert.match(css, /--ds-radius-factor:/);
    assert.match(css, /--ds-scaling:/);
  }
  assert.notEqual(
    resolveScale(defaultTheme.brand, "light").solid[0],
    resolveScale(defaultTheme.brand, "dark").solid[0],
  );
});

test("같은 이름으로 설정만 바꾼 theme은 다른 키와 stylesheet를 갖는다", () => {
  const indigo = defineTheme({ ...defaultTheme, name: "swap" });
  const ruby = defineTheme({ ...defaultTheme, name: "swap", brand: "ruby" });
  assert.notEqual(themeKey(indigo), themeKey(ruby));
  assert.equal(
    themeKey(indigo),
    themeKey(defineTheme({ ...defaultTheme, name: "swap" })),
  );
  assert.notEqual(themeStylesheet(indigo), themeStylesheet(ruby));
});

test("채운 배경은 글자와 4.5:1을 만족하는 단계를 고른다", () => {
  const blue = resolveScale("blue", "light");
  assert.equal(blue.solidStep, 11);
  assert.equal(blue.solidForeground, "#ffffff");
  assert.equal(resolveScale("blue", "dark").solidForeground, "#1c2024");
  const indigo = resolveScale("indigo", "light");
  assert.equal(indigo.solidStep, 9);
  assert.equal(indigo.solidForeground, "#ffffff");
  const amber = resolveScale("amber", "light");
  assert.equal(amber.solidForeground, "#1c2024");
});

test("없는 스케일 이름과 잘못된 단계는 거부한다", () => {
  assert.throws(
    () => defineTheme({ ...defaultTheme, brand: "rainbow" }),
    /brand/,
  );
  assert.throws(
    () => defineTheme({ ...defaultTheme, neutral: "blue" }),
    /neutral/,
  );
  assert.throws(
    () => defineTheme({ ...defaultTheme, radius: "0.75rem" }),
    /radius/,
  );
  assert.throws(
    () => defineTheme({ ...defaultTheme, scaling: "120%" }),
    /scaling/,
  );
  assert.throws(
    () => defineTheme({ ...defaultTheme, name: "Invalid name" }),
    /Theme 이름/,
  );
  assert.throws(
    () =>
      defineTheme({
        ...defaultTheme,
        brand: { light: ["#000"], dark: ["#fff"] },
      }),
    /12단계/,
  );
  assert.ok(colorScaleNames.includes("indigo"));
  assert.deepEqual(radiusNames, ["none", "small", "medium", "large", "full"]);
});

test("custom 스케일은 그대로 쓰고 정의한 theme은 고정된다", () => {
  const steps = Array.from(
    { length: 12 },
    (_, i) => `#${String(i).padStart(2, "0")}0000`,
  );
  const light = [...steps];
  const theme = defineTheme({
    ...defaultTheme,
    name: "custom",
    brand: { light, dark: steps, contrast: "dark" },
  });
  light[8] = "#ffffff";
  assert.equal(resolveScale(theme.brand, "light").solid[8], "#080000");
  assert.throws(() => {
    theme.radius = "none";
  }, TypeError);
  assert.throws(() => {
    theme.typography.body.size = "4rem";
  }, TypeError);
});

test("typography는 바꿀 역할만 적고 필수값을 검사한다", () => {
  const theme = defineTheme({
    ...defaultTheme,
    name: "typo",
    typography: { body: { size: "1rem" } },
  });
  assert.equal(theme.typography.body.size, "1rem");
  assert.equal(
    theme.typography.body.lineHeight,
    defaultTheme.typography.body.lineHeight,
  );
  assert.throws(
    () =>
      defineTheme({
        ...defaultTheme,
        typography: { body: { lineHeight: "" } },
      }),
    /typography.body.lineHeight/,
  );
  assert.throws(
    () =>
      defineTheme({
        ...defaultTheme,
        typography: { weights: { bold: NaN } },
      }),
    /weights.bold/,
  );
});
