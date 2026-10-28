import type { ReactNode } from "react";
import { domProps } from "../internal/props.js";
import type { DesignProps } from "../internal/props.js";
import { Icon } from "./icon.js";

export type CardProps = DesignProps<"div"> & { tone?: "plain" | "muted" };
export function Card({ tone = "plain", ...props }: CardProps) {
  return (
    <div
      {...domProps(props)}
      className={`ds-card ds-card-${tone}`}
      data-slot="card"
    />
  );
}
export function CardHeader(props: DesignProps<"div">) {
  return (
    <div
      {...domProps(props)}
      className="ds-card-header"
      data-slot="card-header"
    />
  );
}
export function CardTitle(props: DesignProps<"h3">) {
  return (
    <h3 {...domProps(props)} className="ds-card-title" data-slot="card-title" />
  );
}
export function CardDescription(props: DesignProps<"p">) {
  return (
    <p
      {...domProps(props)}
      className="ds-card-description"
      data-slot="card-description"
    />
  );
}
export function CardContent(props: DesignProps<"div">) {
  return (
    <div
      {...domProps(props)}
      className="ds-card-content"
      data-slot="card-content"
    />
  );
}
export function CardFooter(props: DesignProps<"div">) {
  return (
    <div
      {...domProps(props)}
      className="ds-card-footer"
      data-slot="card-footer"
    />
  );
}

export type BadgeProps = DesignProps<"span"> & {
  variant?: "primary" | "secondary" | "outline" | "destructive" | undefined;
};
export function Badge({ variant = "primary", ...props }: BadgeProps) {
  return (
    <span
      {...domProps(props)}
      className={`ds-badge ds-badge-${variant}`}
      data-slot="badge"
    />
  );
}

export type CalloutProps = Omit<DesignProps<"section">, "title"> & {
  title: string;
  tone?: "action" | "danger" | undefined;
  action?: ReactNode | undefined;
};
export function Callout({
  title,
  tone = "action",
  action,
  children,
  ...props
}: CalloutProps) {
  return (
    <section
      {...domProps(props)}
      className={`ds-callout ds-callout-${tone}`}
      data-slot="callout"
      role={tone === "danger" ? "alert" : undefined}
    >
      <div className="ds-callout-header">
        <p className="ds-callout-title">{title}</p>
        {action}
      </div>
      {children}
    </section>
  );
}

export type LinkRowProps = Omit<DesignProps<"a">, "title"> & {
  href: string;
  title: string;
  description?: string | undefined;
  variant?: "card" | "plain" | undefined;
};
export function LinkRow({
  title,
  description,
  variant = "card",
  ...props
}: LinkRowProps) {
  return (
    <a
      {...domProps(props)}
      className={`ds-link-row ds-link-row-${variant}`}
      data-slot="link-row"
    >
      <span className="ds-link-row-copy">
        <strong>{title}</strong>
        {description ? <span>{description}</span> : null}
      </span>
      <span className="ds-chevron">
        <Icon name="back" />
      </span>
    </a>
  );
}
