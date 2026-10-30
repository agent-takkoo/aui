import type { ReactNode } from "react";
import { Heading } from "./typography.js";

export type PageHeaderProps = {
  title: string;
  description?: string;
  actions?: ReactNode;
  breadcrumb?: ReactNode;
  level?: 1 | 2;
  size?: "title" | "display";
};
export function PageHeader({
  title,
  description,
  actions,
  breadcrumb,
  level = 1,
  size = "title",
}: PageHeaderProps) {
  return (
    <header className="ds-page-header" data-slot="page-header">
      {breadcrumb ? (
        <div className="ds-page-header-breadcrumb">{breadcrumb}</div>
      ) : null}
      <div className="ds-page-header-row">
        <div className="ds-page-header-copy">
          <Heading level={level} size={size}>
            {title}
          </Heading>
          {description ? (
            <p className="ds-page-header-description">{description}</p>
          ) : null}
        </div>
        {actions ? (
          <div className="ds-page-header-actions">{actions}</div>
        ) : null}
      </div>
    </header>
  );
}

export type ActionBarProps = {
  children: ReactNode;
  justify?: "start" | "end" | "between" | "stretch";
  sticky?: boolean;
  label?: string;
};
export function ActionBar({
  children,
  justify = "end",
  sticky = true,
  label,
}: ActionBarProps) {
  return (
    <div
      className={`ds-action-bar ds-action-bar-${justify}`}
      data-slot="action-bar"
      data-sticky={sticky || undefined}
      role={label ? "group" : undefined}
      aria-label={label}
    >
      {children}
    </div>
  );
}

export type AppShellProps = {
  children: ReactNode;
  header?: ReactNode;
  sidebar?: ReactNode;
  sidebarWidth?: "sm" | "md";
};
export function AppShell({
  children,
  header,
  sidebar,
  sidebarWidth = "md",
}: AppShellProps) {
  return (
    <div
      className={`ds-app-shell ds-app-shell-sidebar-${sidebarWidth}`}
      data-slot="app-shell"
    >
      {header ? <div className="ds-app-shell-header">{header}</div> : null}
      <div className="ds-app-shell-body">
        {sidebar ? <div className="ds-app-shell-sidebar">{sidebar}</div> : null}
        <main className="ds-app-shell-main">{children}</main>
      </div>
    </div>
  );
}
