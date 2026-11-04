import type { ReactNode } from "react";

export type StatProps = {
  label: string;
  value: ReactNode;
  hint?: string | undefined;
};

export function Stat({ label, value, hint }: StatProps) {
  return (
    <dl className="ds-stat" data-slot="stat">
      <dt className="ds-stat-label">{label}</dt>
      <dd>
        <span className="ds-stat-value">{value}</span>
        {hint ? <span className="ds-stat-hint">{hint}</span> : null}
      </dd>
    </dl>
  );
}
