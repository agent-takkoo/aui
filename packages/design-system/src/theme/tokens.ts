export const colorTokenNames = [
  "background",
  "foreground",
  "card",
  "cardForeground",
  "popover",
  "popoverForeground",
  "primary",
  "primaryForeground",
  "secondary",
  "secondaryForeground",
  "muted",
  "mutedForeground",
  "accent",
  "accentForeground",
  "destructive",
  "destructiveForeground",
  "border",
  "input",
  "ring",
  "surfacePressed",
  "field",
  "separator",
  "avatar1",
  "avatar2",
  "avatar3",
  "avatar4",
  "avatarForeground",
  "overlay",
  "shadow",
] as const;

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
export type TypographyRole = Readonly<{
  size: string;
  lineHeight: string;
  weight: number;
  letterSpacing: string;
}>;
export type TypographyTokens = Readonly<
  Record<(typeof typographyRoleNames)[number], TypographyRole> & {
    weights: Readonly<{
      regular: number;
      medium: number;
      semibold: number;
      bold: number;
    }>;
  }
>;

export type ColorTokens = Record<(typeof colorTokenNames)[number], string>;
export type ColorMode = "light" | "dark";
export type Theme = Readonly<{
  name: string;
  light: Readonly<ColorTokens>;
  dark: Readonly<ColorTokens>;
  radius: string;
  fontFamily: string;
  typography: TypographyTokens;
}>;

export function defineTheme(theme: Theme): Theme {
  if (!/^[a-z][a-z0-9-]*$/.test(theme.name))
    throw new Error("Theme 이름은 영문 소문자와 숫자, 하이픈으로 작성하세요.");
  for (const mode of ["light", "dark"] as const) {
    for (const token of colorTokenNames) {
      if (
        typeof theme[mode]?.[token] !== "string" ||
        !theme[mode][token].trim()
      ) {
        throw new Error(`Theme의 ${mode}.${token} 값이 필요해요.`);
      }
    }
  }
  if (!theme.radius?.trim() || !theme.fontFamily?.trim())
    throw new Error("radius와 fontFamily가 필요해요.");
  for (const role of typographyRoleNames) {
    const value = theme.typography?.[role];
    for (const key of ["size", "lineHeight", "letterSpacing"] as const) {
      if (typeof value?.[key] !== "string" || !value[key].trim())
        throw new Error(`Theme의 typography.${role}.${key} 값이 필요해요.`);
    }
    if (
      !Number.isFinite(value?.weight) ||
      value.weight < 1 ||
      value.weight > 1000
    )
      throw new Error(`Theme의 typography.${role}.weight가 올바르지 않아요.`);
  }
  for (const key of ["regular", "medium", "semibold", "bold"] as const) {
    const value = theme.typography?.weights?.[key];
    if (!Number.isFinite(value) || value < 1 || value > 1000)
      throw new Error(`Theme의 typography.weights.${key}가 올바르지 않아요.`);
  }
  return Object.freeze({
    ...theme,
    light: Object.freeze({ ...theme.light }),
    dark: Object.freeze({ ...theme.dark }),
    typography: Object.freeze({
      ...Object.fromEntries(
        typographyRoleNames.map((role) => [
          role,
          Object.freeze({ ...theme.typography[role] }),
        ]),
      ),
      weights: Object.freeze({ ...theme.typography.weights }),
    }) as TypographyTokens,
  });
}

export function tokenVariable(name: string): string {
  return `--ds-${name.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}`;
}
