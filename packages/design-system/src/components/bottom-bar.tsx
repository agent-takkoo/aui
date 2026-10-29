import type { DesignProps } from "../internal/props.js";
import { domProps } from "../internal/props.js";

export type BottomBarProps = DesignProps<"div"> & {
  width?: "form" | "content" | "wide" | "full";
};

export function BottomBar({ width = "content", ...props }: BottomBarProps) {
  return (
    <div
      {...domProps(props)}
      className={`ds-bottom-bar ds-bottom-bar-${width}`}
      data-slot="bottom-bar"
    />
  );
}

export function BottomBarSpace() {
  return <div className="ds-bottom-bar-space" aria-hidden="true" />;
}
