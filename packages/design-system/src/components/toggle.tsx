"use client";
import * as Primitive from "@radix-ui/react-toggle";
import type { ComponentPropsWithRef } from "react";
import { domProps } from "../internal/props.js";
import type { RestrictedProps } from "../internal/props.js";
export type ToggleProps = RestrictedProps<
  ComponentPropsWithRef<typeof Primitive.Root>
>;
export function Toggle(props: ToggleProps) {
  return (
    <Primitive.Root
      {...domProps(props)}
      className="ds-toggle"
      data-slot="toggle"
    />
  );
}
