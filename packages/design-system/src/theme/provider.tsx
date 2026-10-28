"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useSyncExternalStore,
} from "react";
import type { CSSProperties, ReactNode } from "react";
import { defaultTheme } from "./presets.js";
import {
  colorTokenNames,
  typographyRoleNames,
  tokenVariable,
} from "./tokens.js";
import type { ColorMode, Theme } from "./tokens.js";

export type ThemeProviderProps = {
  children: ReactNode;
  theme?: Theme | undefined;
  mode?: ColorMode | "system" | undefined;
  /**
   * 문서(`<html>`)의 배경색과 color-scheme도 Theme에 맞춘다.
   * 모바일 웹뷰처럼 `.ds-root` 바깥(overscroll 영역, 키보드 뒤)이 그대로 보이는 환경에서 켠다.
   */
  applyToDocument?: boolean | undefined;
};

const ThemeContext = createContext<{
  portalHost: HTMLDivElement | null;
} | null>(null);

function subscribeScheme(notify: () => void) {
  const query = window.matchMedia("(prefers-color-scheme: dark)");
  query.addEventListener("change", notify);
  return () => query.removeEventListener("change", notify);
}
const readScheme = (): ColorMode =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
const serverScheme = (): ColorMode => "light";

export function ThemeProvider({
  children,
  theme = defaultTheme,
  mode = "light",
  applyToDocument = false,
}: ThemeProviderProps) {
  const systemMode = useSyncExternalStore(
    subscribeScheme,
    readScheme,
    serverScheme,
  );
  const resolvedMode = mode === "system" ? systemMode : mode;
  const [portalHost, setPortalHost] = useState<HTMLDivElement | null>(null);
  const documentBackground = theme[resolvedMode].background;
  useEffect(() => {
    if (!applyToDocument) return;
    const root = document.documentElement;
    const previous = {
      background: root.style.backgroundColor,
      scheme: root.style.colorScheme,
    };
    root.style.backgroundColor = documentBackground;
    root.style.colorScheme = resolvedMode;
    root.dataset.dsDocumentMode = resolvedMode;
    return () => {
      root.style.backgroundColor = previous.background;
      root.style.colorScheme = previous.scheme;
      delete root.dataset.dsDocumentMode;
    };
  }, [applyToDocument, documentBackground, resolvedMode]);
  const variables: Record<string, string> = {
    "--ds-radius": theme.radius,
    "--ds-font-sans": theme.fontFamily,
    colorScheme: resolvedMode,
  };
  for (const name of colorTokenNames)
    variables[tokenVariable(name)] = theme[resolvedMode][name];
  for (const role of typographyRoleNames) {
    const value = theme.typography[role];
    variables[`--ds-text-${role}`] = value.size;
    variables[`--ds-leading-${role}`] = value.lineHeight;
    variables[`--ds-weight-${role}`] = String(value.weight);
    variables[`--ds-tracking-${role}`] = value.letterSpacing;
  }
  for (const [name, value] of Object.entries(theme.typography.weights))
    variables[`--ds-weight-${name}`] = String(value);

  return (
    <ThemeContext.Provider value={{ portalHost }}>
      <div
        className="ds-root"
        data-ds-theme={theme.name}
        data-ds-mode={resolvedMode}
        style={variables as CSSProperties}
      >
        {children}
        <div ref={setPortalHost} data-ds-portal-host="" />
      </div>
    </ThemeContext.Provider>
  );
}

export function usePortalHost() {
  const context = useContext(ThemeContext);
  if (!context)
    throw new Error("팝업 컴포넌트는 ThemeProvider 안에서 사용하세요.");
  return context.portalHost;
}
