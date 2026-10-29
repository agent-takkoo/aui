import type { ReactNode } from "react";
import { domProps } from "../internal/props.js";
import type { DesignProps } from "../internal/props.js";

export type TextProps = DesignProps<"p"> & {
  as?: "p" | "span" | undefined;
  size?: "body" | "sub" | "caption" | undefined;
  tone?: "default" | "muted" | "primary" | "destructive" | undefined;
  weight?: "regular" | "semibold" | "bold" | undefined;
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
  level?: 1 | 2 | 3 | 4 | undefined;
  size?: "display" | "title" | "heading" | undefined;
  id?: string | undefined;
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
