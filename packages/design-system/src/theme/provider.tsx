"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import type { AnchorHTMLAttributes, ComponentType, ReactNode } from "react";
import { defaultTheme } from "./presets.js";
import { themeStylesheet } from "./tokens.js";
import type { ColorMode, Theme } from "./tokens.js";

export type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children?: ReactNode;
};
export type LinkComponent = ComponentType<LinkProps>;

export type ThemeProviderProps = {
  children: ReactNode;
  theme?: Theme;
  mode?: ColorMode | "system";
  linkComponent?: LinkComponent;
};

type ThemeContextValue = {
  portalHost: HTMLDivElement | null;
  linkComponent: LinkComponent | null;
};
const ThemeContext = createContext<ThemeContextValue | null>(null);

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
  linkComponent,
}: ThemeProviderProps) {
  const systemMode = useSyncExternalStore(
    subscribeScheme,
    readScheme,
    serverScheme,
  );
  const resolvedMode = mode === "system" ? systemMode : mode;
  const parent = useContext(ThemeContext);
  const [portalHost, setPortalHost] = useState<HTMLDivElement | null>(null);
  const stylesheet = useMemo(() => themeStylesheet(theme), [theme]);
  const value = useMemo(
    () => ({
      portalHost,
      linkComponent: linkComponent ?? parent?.linkComponent ?? null,
    }),
    [portalHost, linkComponent, parent],
  );

  return (
    <ThemeContext.Provider value={value}>
      <style href={`ds-theme-${theme.name}`} precedence="ds-theme">
        {stylesheet}
      </style>
      <div
        className="ds-root"
        data-ds-theme={theme.name}
        data-ds-mode={resolvedMode}
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

export function useLinkComponent(): LinkComponent | null {
  return useContext(ThemeContext)?.linkComponent ?? null;
}
