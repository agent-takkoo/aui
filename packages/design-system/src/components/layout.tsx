import type { DesignProps } from "../internal/props.js";
import { domProps } from "../internal/props.js";

export type Space = "none" | "xs" | "sm" | "md" | "section";
export type StackProps = DesignProps<"div"> & {
  gap?: Space;
  align?: "stretch" | "start" | "center" | "end";
};
export function Stack({ gap = "md", align = "stretch", ...props }: StackProps) {
  return (
    <div
      {...domProps(props)}
      className={`ds-stack ds-gap-${gap} ds-align-${align}`}
    />
  );
}

export type InlineProps = DesignProps<"div"> & {
  gap?: Space;
  align?: "start" | "center" | "end";
  justify?: "start" | "center" | "between" | "end";
  wrap?: boolean;
};
export function Inline({
  gap = "sm",
  align = "center",
  justify = "start",
  wrap = true,
  ...props
}: InlineProps) {
  return (
    <div
      {...domProps(props)}
      className={`ds-inline ds-gap-${gap} ds-align-${align} ds-justify-${justify}${wrap ? " ds-wrap" : ""}`}
    />
  );
}

export type ContainerProps = DesignProps<"div"> & {
  width?: "form" | "content" | "wide";
};
export function Container({ width = "content", ...props }: ContainerProps) {
  return (
    <div
      {...domProps(props)}
      className={`ds-container ds-container-${width}`}
    />
  );
}

export function Separator() {
  return <hr className="ds-separator" data-slot="separator" />;
}

export type GridColumns = 1 | 2 | 3 | 4 | "auto";
export type GridCollapse = "none" | "sm" | "md" | "lg";
export type GridProps = DesignProps<"div"> & {
  columns?: GridColumns;
  gap?: Space;
  collapseBelow?: GridCollapse;
};
export function Grid({
  columns = 2,
  gap = "md",
  collapseBelow = "md",
  ...props
}: GridProps) {
  return (
    <div
      {...domProps(props)}
      className={`ds-grid ds-grid-${columns} ds-gap-${gap}${collapseBelow === "none" ? "" : ` ds-grid-collapse-${collapseBelow}`}`}
      data-slot="grid"
      data-columns={columns}
    />
  );
}
