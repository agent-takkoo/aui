import * as radix from "@radix-ui/colors";

export const colorScaleNames = [
  "gray",
  "mauve",
  "slate",
  "sage",
  "olive",
  "sand",
  "tomato",
  "red",
  "ruby",
  "crimson",
  "pink",
  "plum",
  "purple",
  "violet",
  "iris",
  "indigo",
  "blue",
  "cyan",
  "teal",
  "jade",
  "green",
  "grass",
  "bronze",
  "gold",
  "brown",
  "orange",
  "amber",
  "yellow",
  "lime",
  "mint",
  "sky",
] as const;
export const neutralScaleNames = [
  "gray",
  "mauve",
  "slate",
  "sage",
  "olive",
  "sand",
] as const;
export const radiusNames = [
  "none",
  "small",
  "medium",
  "large",
  "full",
] as const;
export const scalingNames = ["90%", "95%", "100%", "105%", "110%"] as const;
export const typographyRoleNames = [
  "display",
  "title",
  "heading",
  "body",
  "sub",
  "caption",
  "input",
  "micro",
] as const;

export type ColorScaleName = (typeof colorScaleNames)[number];
export type NeutralScaleName = (typeof neutralScaleNames)[number];
export type ThemeRadius = (typeof radiusNames)[number];
export type ThemeScaling = (typeof scalingNames)[number];
export type ColorMode = "light" | "dark";
export type ColorSteps = readonly [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
];
export type CustomColorScale = Readonly<{
  light: ColorSteps;
  dark: ColorSteps;
  lightAlpha?: ColorSteps;
  darkAlpha?: ColorSteps;
  contrast?: "light" | "dark";
}>;
export type ColorScale = ColorScaleName | CustomColorScale;
export type NeutralScale = NeutralScaleName | CustomColorScale;

export type TypographyRole = Readonly<{
  size: string;
  lineHeight: string;
  weight: number;
  letterSpacing: string;
}>;
export type TypographyWeights = Readonly<{
  regular: number;
  medium: number;
  semibold: number;
  bold: number;
}>;
export type TypographyTokens = Readonly<
  Record<(typeof typographyRoleNames)[number], TypographyRole> & {
    weights: TypographyWeights;
  }
>;
export type TypographyInput = Partial<
  Record<(typeof typographyRoleNames)[number], Partial<TypographyRole>> & {
    weights: Partial<TypographyWeights>;
  }
>;

export type ThemeInput = {
  name: string;
  brand: ColorScale;
  neutral: NeutralScale;
  radius: ThemeRadius;
  scaling?: ThemeScaling;
  fontFamily: string;
  typography?: TypographyInput;
};
export type Theme = Readonly<{
  name: string;
  brand: ColorScale;
  neutral: NeutralScale;
  radius: ThemeRadius;
  scaling: ThemeScaling;
  fontFamily: string;
  typography: TypographyTokens;
}>;

export const defaultTypography: TypographyTokens = Object.freeze({
  display: Object.freeze({
    size: "1.875rem",
    lineHeight: "2.25rem",
    weight: 700,
    letterSpacing: "-0.025em",
  }),
  title: Object.freeze({
    size: "1.25rem",
    lineHeight: "1.75rem",
    weight: 700,
    letterSpacing: "-0.015em",
  }),
  heading: Object.freeze({
    size: "1.0625rem",
    lineHeight: "1.5rem",
    weight: 600,
    letterSpacing: "-0.01em",
  }),
  body: Object.freeze({
    size: "0.9375rem",
    lineHeight: "1.375rem",
    weight: 400,
    letterSpacing: "normal",
  }),
  sub: Object.freeze({
    size: "0.8125rem",
    lineHeight: "1.25rem",
    weight: 400,
    letterSpacing: "normal",
  }),
  caption: Object.freeze({
    size: "0.75rem",
    lineHeight: "1rem",
    weight: 400,
    letterSpacing: "normal",
  }),
  input: Object.freeze({
    size: "1rem",
    lineHeight: "1.5rem",
    weight: 400,
    letterSpacing: "normal",
  }),
  micro: Object.freeze({
    size: "0.625rem",
    lineHeight: "1",
    weight: 600,
    letterSpacing: "normal",
  }),
  weights: Object.freeze({
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  }),
});

const radixScale = (key: string): ColorSteps => {
  const record = (radix as Record<string, Record<string, string>>)[key];
  if (!record) throw new Error(`색 스케일을 찾을 수 없어요: ${key}`);
  const prefix = key.replace("Dark", "");
  return Array.from(
    { length: 12 },
    (_, index) => record[`${prefix}${index + 1}`] ?? "",
  ) as unknown as ColorSteps;
};
const brightScales = new Set<ColorScaleName>([
  "sky",
  "mint",
  "lime",
  "yellow",
  "amber",
]);

export type ResolvedScale = Readonly<{
  solid: ColorSteps;
  alpha: ColorSteps;
  contrast: string;
  solidStep: 9 | 10 | 11;
  solidForeground: string;
}>;

const DARK_TEXT = "#1c2024";
const LIGHT_TEXT = "#ffffff";

function parseColor(value: string): [number, number, number] | null {
  const hex = value.trim().match(/^#([0-9a-f]{3,8})$/i)?.[1];
  if (hex) {
    const digits =
      hex.length <= 4
        ? [...hex].map((char) => char + char).join("")
        : hex.padEnd(6, "0");
    return [0, 2, 4].map((offset) =>
      Number.parseInt(digits.slice(offset, offset + 2), 16),
    ) as [number, number, number];
  }
  const rgb = value.match(/rgba?\(([^)]+)\)/i)?.[1];
  if (rgb) {
    const parts = rgb
      .split(/[\s,/]+/)
      .filter(Boolean)
      .map(Number);
    if (parts.length >= 3 && parts.slice(0, 3).every(Number.isFinite))
      return parts.slice(0, 3) as [number, number, number];
  }
  return null;
}
const luminance = ([r, g, b]: [number, number, number]) =>
  [r, g, b]
    .map((channel) => channel / 255)
    .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
    .reduce((sum, v, index) => sum + v * [0.2126, 0.7152, 0.0722][index]!, 0);
export function contrastRatio(a: string, b: string): number | null {
  const x = parseColor(a);
  const y = parseColor(b);
  if (!x || !y) return null;
  const [lx, ly] = [luminance(x), luminance(y)];
  return (Math.max(lx, ly) + 0.05) / (Math.min(lx, ly) + 0.05);
}

// 채운 배경(버튼·solid 배지)은 글자와 4.5:1을 만족하는 첫 단계를 고른다.
function pickSolid(
  solid: ColorSteps,
  preferred: string,
): { step: 9 | 10 | 11; foreground: string } {
  const texts =
    preferred === DARK_TEXT ? [DARK_TEXT, LIGHT_TEXT] : [LIGHT_TEXT, DARK_TEXT];
  for (const text of texts) {
    for (const step of [9, 10, 11] as const) {
      const ratio = contrastRatio(solid[step - 1]!, text);
      if (ratio === null) return { step: 9, foreground: preferred };
      if (ratio >= 4.5) return { step, foreground: text };
    }
  }
  const [first, second] = texts as [string, string];
  const better =
    (contrastRatio(solid[8]!, first) ?? 0) >=
    (contrastRatio(solid[8]!, second) ?? 0)
      ? first
      : second;
  return { step: 9, foreground: better };
}

const isCustomScale = (scale: ColorScale): scale is CustomColorScale =>
  typeof scale !== "string";

export function resolveScale(
  scale: ColorScale,
  mode: ColorMode,
): ResolvedScale {
  let solid: ColorSteps;
  let alpha: ColorSteps;
  let contrast: string;
  if (isCustomScale(scale)) {
    solid = scale[mode];
    alpha = (mode === "light" ? scale.lightAlpha : scale.darkAlpha) ?? solid;
    contrast = scale.contrast === "dark" ? DARK_TEXT : LIGHT_TEXT;
  } else {
    const suffix = mode === "dark" ? "Dark" : "";
    solid = radixScale(`${scale}${suffix}`);
    alpha = radixScale(`${scale}${suffix}A`);
    contrast = brightScales.has(scale) ? DARK_TEXT : LIGHT_TEXT;
  }
  const picked = pickSolid(solid, contrast);
  return {
    solid,
    alpha,
    contrast,
    solidStep: picked.step,
    solidForeground: picked.foreground,
  };
}

const isSteps = (value: unknown): value is ColorSteps =>
  Array.isArray(value) &&
  value.length === 12 &&
  value.every((item) => typeof item === "string" && item.trim());
function validateScale(
  label: string,
  scale: unknown,
  names: readonly string[],
) {
  if (typeof scale === "string") {
    if (!names.includes(scale))
      throw new Error(`Theme의 ${label}에 없는 스케일 이름이에요: ${scale}`);
    return;
  }
  if (!scale || typeof scale !== "object")
    throw new Error(`Theme의 ${label} 값이 필요해요.`);
  const custom = scale as Partial<CustomColorScale>;
  for (const key of ["light", "dark"] as const) {
    if (!isSteps(custom[key]))
      throw new Error(`Theme의 ${label}.${key}는 12단계 색 배열이어야 해요.`);
  }
  for (const key of ["lightAlpha", "darkAlpha"] as const) {
    if (custom[key] !== undefined && !isSteps(custom[key]))
      throw new Error(`Theme의 ${label}.${key}는 12단계 색 배열이어야 해요.`);
  }
}

function mergeTypography(input: TypographyInput | undefined): TypographyTokens {
  const roles = Object.fromEntries(
    typographyRoleNames.map((role) => {
      const merged = { ...defaultTypography[role], ...input?.[role] };
      for (const key of ["size", "lineHeight", "letterSpacing"] as const) {
        if (typeof merged[key] !== "string" || !merged[key].trim())
          throw new Error(`Theme의 typography.${role}.${key} 값이 필요해요.`);
      }
      if (
        !Number.isFinite(merged.weight) ||
        merged.weight < 1 ||
        merged.weight > 1000
      )
        throw new Error(`Theme의 typography.${role}.weight가 올바르지 않아요.`);
      return [role, Object.freeze(merged)];
    }),
  );
  const weights = { ...defaultTypography.weights, ...input?.weights };
  for (const key of ["regular", "medium", "semibold", "bold"] as const) {
    const value = weights[key];
    if (!Number.isFinite(value) || value < 1 || value > 1000)
      throw new Error(`Theme의 typography.weights.${key}가 올바르지 않아요.`);
  }
  return Object.freeze({
    ...roles,
    weights: Object.freeze(weights),
  }) as TypographyTokens;
}

const freezeScale = (scale: ColorScale): ColorScale =>
  isCustomScale(scale)
    ? Object.freeze({
        ...scale,
        light: Object.freeze([...scale.light]) as unknown as ColorSteps,
        dark: Object.freeze([...scale.dark]) as unknown as ColorSteps,
        lightAlpha: scale.lightAlpha
          ? (Object.freeze([...scale.lightAlpha]) as unknown as ColorSteps)
          : undefined,
        darkAlpha: scale.darkAlpha
          ? (Object.freeze([...scale.darkAlpha]) as unknown as ColorSteps)
          : undefined,
      })
    : scale;

export function defineTheme(input: ThemeInput): Theme {
  if (!/^[a-z][a-z0-9-]*$/.test(input.name ?? ""))
    throw new Error("Theme 이름은 영문 소문자와 숫자, 하이픈으로 작성하세요.");
  validateScale("brand", input.brand, colorScaleNames);
  validateScale("neutral", input.neutral, neutralScaleNames);
  if (!radiusNames.includes(input.radius))
    throw new Error(`Theme의 radius는 ${radiusNames.join("·")} 중 하나예요.`);
  const scaling = input.scaling ?? "100%";
  if (!scalingNames.includes(scaling))
    throw new Error(`Theme의 scaling은 ${scalingNames.join("·")} 중 하나예요.`);
  if (typeof input.fontFamily !== "string" || !input.fontFamily.trim())
    throw new Error("Theme의 fontFamily가 필요해요.");
  return Object.freeze({
    name: input.name,
    brand: freezeScale(input.brand),
    neutral: freezeScale(input.neutral) as NeutralScale,
    radius: input.radius,
    scaling,
    fontFamily: input.fontFamily,
    typography: mergeTypography(input.typography),
  });
}

const radiusFactor: Record<ThemeRadius, number> = {
  none: 0,
  small: 0.75,
  medium: 1,
  large: 1.5,
  full: 1.5,
};
const radiusBase = [3, 4, 6, 8, 12, 16];

export const semanticScales = {
  danger: "red",
  success: "green",
  warning: "amber",
  info: "blue",
} as const satisfies Record<string, ColorScaleName>;

export function themeBaseVariables(theme: Theme): Record<string, string> {
  const scaling = Number.parseInt(theme.scaling, 10) / 100;
  const variables: Record<string, string> = {
    "--ds-scaling": String(scaling),
    "--ds-radius-factor": String(radiusFactor[theme.radius]),
    "--ds-radius-full": theme.radius === "full" ? "9999px" : "0px",
    "--ds-font-sans": theme.fontFamily,
  };
  radiusBase.forEach((pixels, index) => {
    variables[`--ds-radius-${index + 1}`] =
      `calc(${pixels}px * var(--ds-scaling) * var(--ds-radius-factor))`;
  });
  for (const role of typographyRoleNames) {
    const value = theme.typography[role];
    variables[`--ds-text-${role}`] = `calc(${value.size} * var(--ds-scaling))`;
    variables[`--ds-leading-${role}`] =
      value.lineHeight === "1"
        ? "1"
        : `calc(${value.lineHeight} * var(--ds-scaling))`;
    variables[`--ds-weight-${role}`] = String(value.weight);
    variables[`--ds-tracking-${role}`] = value.letterSpacing;
  }
  for (const [name, value] of Object.entries(theme.typography.weights))
    variables[`--ds-weight-${name}`] = String(value);
  return variables;
}

export function themeModeVariables(
  theme: Theme,
  mode: ColorMode,
): Record<string, string> {
  const brand = resolveScale(theme.brand, mode);
  const neutral = resolveScale(theme.neutral, mode);
  const variables: Record<string, string> = { colorScheme: mode };
  const emit = (name: string, scale: ResolvedScale, withAlpha: boolean) => {
    scale.solid.forEach((value, index) => {
      variables[`--ds-${name}-${index + 1}`] = value;
    });
    if (withAlpha)
      scale.alpha.forEach((value, index) => {
        variables[`--ds-${name}-a${index + 1}`] = value;
      });
    variables[`--ds-${name}-contrast`] = scale.contrast;
    variables[`--ds-${name}-solid`] = `var(--ds-${name}-${scale.solidStep})`;
    variables[`--ds-${name}-solid-hover`] =
      `color-mix(in oklab, var(--ds-${name}-${scale.solidStep}) 88%, var(--ds-neutral-12))`;
    variables[`--ds-${name}-solid-foreground`] = scale.solidForeground;
  };
  emit("brand", brand, true);
  emit("neutral", neutral, true);
  for (const [name, scaleName] of Object.entries(semanticScales))
    emit(name, resolveScale(scaleName, mode), true);

  const roles: Record<string, string> = {
    background: "var(--ds-neutral-1)",
    foreground: "var(--ds-neutral-12)",
    card: mode === "light" ? "#ffffff" : "var(--ds-neutral-2)",
    "card-foreground": "var(--ds-neutral-12)",
    "card-border": "var(--ds-neutral-a6)",
    popover: mode === "light" ? "#ffffff" : "var(--ds-neutral-3)",
    "popover-foreground": "var(--ds-neutral-12)",
    primary: "var(--ds-brand-solid)",
    "primary-hover": "var(--ds-brand-solid-hover)",
    "primary-foreground": "var(--ds-brand-solid-foreground)",
    "primary-text": "var(--ds-brand-11)",
    secondary: "var(--ds-neutral-a3)",
    "secondary-hover": "var(--ds-neutral-a4)",
    "secondary-active": "var(--ds-neutral-a5)",
    "secondary-foreground": "var(--ds-neutral-12)",
    muted: "var(--ds-neutral-2)",
    "muted-foreground": "var(--ds-neutral-11)",
    accent: "var(--ds-neutral-a4)",
    "accent-foreground": "var(--ds-neutral-12)",
    selected: "var(--ds-brand-a3)",
    "selected-foreground": "var(--ds-brand-12)",
    destructive: "var(--ds-danger-solid)",
    "destructive-hover": "var(--ds-danger-solid-hover)",
    "destructive-foreground": "var(--ds-danger-solid-foreground)",
    "destructive-text": "var(--ds-danger-11)",
    border: "var(--ds-neutral-a6)",
    input: "var(--ds-neutral-a9)",
    "input-hover": "var(--ds-neutral-a10)",
    ring: "var(--ds-primary)",
    "surface-pressed": "var(--ds-neutral-a5)",
    field: "var(--ds-neutral-a2)",
    separator: "var(--ds-neutral-a6)",
    link: "var(--ds-brand-11)",
    avatar1: "var(--ds-brand-4)",
    "avatar1-foreground": "var(--ds-brand-12)",
    avatar2: "var(--ds-success-4)",
    "avatar2-foreground": "var(--ds-success-12)",
    avatar3: "var(--ds-warning-4)",
    "avatar3-foreground": "var(--ds-warning-12)",
    avatar4: "var(--ds-info-4)",
    "avatar4-foreground": "var(--ds-info-12)",
    overlay: mode === "light" ? radix.blackA.blackA6 : radix.blackA.blackA8,
    shadow: "var(--ds-neutral-12)",
    "scrollbar-thumb": "var(--ds-neutral-a6)",
    "scrollbar-thumb-hover": "var(--ds-neutral-a8)",
    "scrollbar-thumb-active": "var(--ds-neutral-a9)",
  };
  for (const [name, value] of Object.entries(roles))
    variables[`--ds-${name}`] = value;
  return variables;
}

const toDeclarations = (variables: Record<string, string>) =>
  Object.entries(variables)
    .map(([name, value]) =>
      name.startsWith("--")
        ? `${name}:${value};`
        : `${name.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}:${value};`,
    )
    .join("");

// 같은 이름으로 설정만 바꾼 theme도 서로 다른 선택자와 stylesheet를 갖게 내용 해시를 키에 붙인다.
function hashText(text: string): string {
  let hash = 5381;
  for (let index = 0; index < text.length; index++)
    hash = ((hash << 5) + hash + text.charCodeAt(index)) >>> 0;
  return hash.toString(36);
}
export function themeKey(theme: Theme): string {
  return `${theme.name}-${hashText(
    JSON.stringify([
      themeBaseVariables(theme),
      themeModeVariables(theme, "light"),
      themeModeVariables(theme, "dark"),
    ]),
  )}`;
}

export function themeStylesheet(theme: Theme): string {
  const scope = `[data-ds-theme-key="${themeKey(theme)}"]`;
  return [
    `${scope}{${toDeclarations(themeBaseVariables(theme))}}`,
    `${scope}[data-ds-mode="light"]{${toDeclarations(themeModeVariables(theme, "light"))}}`,
    `${scope}[data-ds-mode="dark"]{${toDeclarations(themeModeVariables(theme, "dark"))}}`,
  ].join("\n");
}
