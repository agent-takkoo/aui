"use client";
import * as Primitive from "@radix-ui/react-scroll-area";
import type { DesignProps } from "../internal/props.js";
import { domProps } from "../internal/props.js";
export type ScrollAreaProps = DesignProps<"div"> & {
  label: string;
  height?: "sm" | "md" | "lg" | undefined;
};
export function ScrollArea({
  label,
  height = "md",
  children,
  ...props
}: ScrollAreaProps) {
  return (
    <Primitive.Root
      className={`ds-scroll-area ds-scroll-area-${height}`}
      data-slot="scroll-area"
      type="auto"
    >
      <Primitive.Viewport
        {...domProps(props)}
        tabIndex={0}
        role="region"
        aria-label={label}
        className="ds-scroll-viewport"
      >
        {children}
      </Primitive.Viewport>
      <Primitive.Scrollbar orientation="vertical" className="ds-scrollbar">
        <Primitive.Thumb className="ds-scroll-thumb" />
      </Primitive.Scrollbar>
      <Primitive.Scrollbar orientation="horizontal" className="ds-scrollbar">
        <Primitive.Thumb className="ds-scroll-thumb" />
      </Primitive.Scrollbar>
      <Primitive.Corner className="ds-scroll-corner" />
    </Primitive.Root>
  );
}
