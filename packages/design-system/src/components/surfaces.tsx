import type { ReactNode } from "react";
import { domProps } from "../internal/props.js";
import type { DesignProps } from "../internal/props.js";
import { Icon } from "./icon.js";
import { useLinkComponent } from "../theme/provider.js";

export type Tone =
  "brand" | "neutral" | "success" | "warning" | "danger" | "info";

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
export type CardTitleProps = DesignProps<"h3"> & { level?: 2 | 3 | 4 };
export function CardTitle({ level = 3, ...props }: CardTitleProps) {
  const Component = `h${level}` as "h3";
  return (
    <Component
      {...domProps(props)}
      className="ds-card-title"
      data-slot="card-title"
    />
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
  size?: "sm" | "md" | "lg";
  tone?: Tone;
  variant?: "soft" | "solid" | "outline";
};
export function Badge({
  tone = "neutral",
  variant = "soft",
  size = "md",
  ...props
}: BadgeProps) {
  return (
    <span
      {...domProps(props)}
      className={`ds-badge ds-badge-${variant} ds-badge-${tone} ds-badge-${size}`}
      data-slot="badge"
      data-tone={tone}
    />
  );
}

export type CalloutProps = Omit<DesignProps<"section">, "title"> & {
  title: string;
  tone?: "info" | "success" | "warning" | "danger";
  action?: ReactNode;
};
export function Callout({
  title,
  tone = "info",
  action,
  children,
  ...props
}: CalloutProps) {
  return (
    <section
      {...domProps(props)}
      className={`ds-callout ds-callout-${tone}`}
      data-slot="callout"
      data-tone={tone}
      role={
        tone === "danger" ? "alert" : tone === "warning" ? "status" : undefined
      }
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
  description?: string;
  variant?: "card" | "plain";
};
export function LinkRow({
  title,
  description,
  variant = "card",
  ...props
}: LinkRowProps) {
  const Link = useLinkComponent() ?? "a";
  return (
    <Link
      {...domProps(props)}
      className={`ds-link-row ds-link-row-${variant}`}
      data-slot="link-row"
    >
      <span className="ds-link-row-copy">
        <strong>{title}</strong>
        {description ? <span>{description}</span> : null}
      </span>
      <span className="ds-chevron">
        <Icon name="chevron-right" />
      </span>
    </Link>
  );
}
