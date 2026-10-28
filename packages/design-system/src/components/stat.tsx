import type { ReactNode } from "react";
import type { DesignProps } from "../internal/props.js";
import { domProps } from "../internal/props.js";

export type StatProps = Omit<DesignProps<"div">, "children"> & {
  label: string;
  value: ReactNode;
  hint?: string | undefined;
  tone?: "default" | "primary" | undefined;
};

export function Stat({ label, value, hint, tone = "default", ...props }: StatProps) {
  return (
    <div
      {...domProps(props)}
      className={`ds-stat ds-stat-${tone}`}
      data-slot="stat"
    >
      <span className="ds-stat-label">{label}</span>
      <span className="ds-stat-value">{value}</span>
      {hint ? <span className="ds-stat-hint">{hint}</span> : null}
    </div>
  );
}

export type StatGridProps = DesignProps<"div"> & { columns?: 2 | 3 };

export function StatGrid({ columns = 2, ...props }: StatGridProps) {
  return (
    <div
      {...domProps(props)}
      className={`ds-stat-grid ds-stat-grid-${columns}`}
      data-slot="stat-grid"
    />
  );
}
