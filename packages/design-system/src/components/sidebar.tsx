"use client";
import type { ReactNode } from "react";
import { useLinkComponent } from "../theme/provider.js";

export type SidebarItem = { id: string; label: string; href: string };
export type SidebarProps = {
  label: string;
  items: readonly SidebarItem[];
  currentId?: string;
  footer?: ReactNode;
};

/** 현재 경로의 결정과 실제 라우팅은 소비 프로젝트가 맡는다. */
export function Sidebar({ label, items, currentId, footer }: SidebarProps) {
  const Link = useLinkComponent() ?? "a";
  return (
    <aside className="ds-sidebar" data-slot="sidebar">
      <nav aria-label={label}>
        <p className="ds-section-label">{label}</p>
        <ul className="ds-sidebar-list">
          {items.map((item) => (
            <li key={item.id}>
              <Link
                className="ds-sidebar-link"
                href={item.href}
                aria-current={currentId === item.id ? "page" : undefined}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {footer ? <div className="ds-sidebar-footer">{footer}</div> : null}
    </aside>
  );
}
