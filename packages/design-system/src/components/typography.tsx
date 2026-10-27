import type { ReactNode } from "react";
import { domProps } from "../internal/props.js";
import type { DesignProps } from "../internal/props.js";

export type TextProps = DesignProps<"p"> & {
  as?: "p" | "span";
  size?: "body" | "sub" | "caption";
  tone?: "default" | "muted" | "primary" | "destructive";
  weight?: "regular" | "semibold" | "bold";
};
export function Text({
  as: Component = "p",
  size = "body",
  tone = "default",
  weight,
  ...props
}: TextProps) {
  return (
    <Component
      {...domProps(props)}
      className={`ds-text ds-text-${size} ds-tone-${tone}${weight ? ` ds-weight-${weight}` : ""}`}
    />
  );
}

export type HeadingProps = {
  children: ReactNode;
  level?: 1 | 2 | 3 | 4;
  size?: "display" | "title" | "heading";
  id?: string;
};
export function Heading({
  level = 2,
  size = "heading",
  ...props
}: HeadingProps) {
  const Component = `h${level}` as "h1";
  return (
    <Component
      {...domProps(props)}
      className={`ds-heading ds-heading-${size}`}
    />
  );
}

export function SectionLabel(props: DesignProps<"span">) {
  return (
    <span
      {...domProps(props)}
      className="ds-section-label"
      data-slot="section-label"
    />
  );
}
