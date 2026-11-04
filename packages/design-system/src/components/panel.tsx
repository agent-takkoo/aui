"use client";

import { useId } from "react";
import type { ReactNode } from "react";

export type PanelProps = {
  title: string;
  description?: string | undefined;
  children: ReactNode;
  footer?: ReactNode | undefined;
};

/** 화면 흐름 안에 놓는 독립 영역. 열림 상태나 focus trap을 만들지 않는다. */
export function Panel({ title, description, children, footer }: PanelProps) {
  const titleId = useId();
  return (
    <section className="ds-panel" aria-labelledby={titleId} data-slot="panel">
      <header className="ds-panel-header">
        <h2 id={titleId} className="ds-dialog-title">
          {title}
        </h2>
        {description ? (
          <p className="ds-dialog-description">{description}</p>
        ) : null}
      </header>
      <div className="ds-panel-body">{children}</div>
      {footer ? <footer className="ds-panel-footer">{footer}</footer> : null}
    </section>
  );
}
