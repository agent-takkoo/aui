import type { DesignProps } from "../internal/props.js";
import { domProps } from "../internal/props.js";

export type Space = "none" | "xs" | "sm" | "md" | "section";
export type StackProps = DesignProps<"div"> & { gap?: Space };
export function Stack({ gap = "md", ...props }: StackProps) {
  return <div {...domProps(props)} className={`ds-stack ds-gap-${gap}`} />;
}

export type InlineProps = StackProps & {
  align?: "start" | "center" | "end" | undefined;
  justify?: "start" | "between" | "end" | undefined;
  wrap?: boolean | undefined;
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
  width?: "form" | "content" | "wide" | undefined;
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
