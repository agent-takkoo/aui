"use client";
import * as Primitive from "@radix-ui/react-toggle-group";
import type { ComponentPropsWithRef } from "react";
import { domProps } from "../internal/props.js";
import type { RestrictedProps } from "../internal/props.js";
import type { ChoiceOption } from "./radio-group.js";
type Shared = RestrictedProps<
  Omit<
    ComponentPropsWithRef<typeof Primitive.Root>,
    "type" | "value" | "defaultValue" | "onValueChange" | "children"
  >
> & { options: readonly ChoiceOption[]; "aria-label": string };
export type ToggleGroupProps = Shared &
  (
    | {
        type?: "single";
        value?: string;
        defaultValue?: string;
        onValueChange?: (value: string) => void;
      }
    | {
        type: "multiple";
        value?: string[];
        defaultValue?: string[];
        onValueChange?: (value: string[]) => void;
      }
  );
export function ToggleGroup({ options, ...props }: ToggleGroupProps) {
  const children = options.map((option) => (
    <Primitive.Item
      className="ds-toggle"
      key={option.value}
      value={option.value}
      disabled={option.disabled}
    >
      {option.label}
    </Primitive.Item>
  ));
  return props.type === "multiple" ? (
    <Primitive.Root
      {...domProps(props)}
      className="ds-toggle-group"
      data-slot="toggle-group"
    >
      {children}
    </Primitive.Root>
  ) : (
    <Primitive.Root
      {...domProps(props)}
      type="single"
      className="ds-toggle-group"
      data-slot="toggle-group"
    >
      {children}
    </Primitive.Root>
  );
}
