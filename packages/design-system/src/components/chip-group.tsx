"use client";

import * as Primitive from "@radix-ui/react-radio-group";
import { domProps } from "../internal/props.js";
import { useFieldControl } from "./field.js";
import type { RadioGroupProps } from "./radio-group.js";

export type ChipGroupProps = RadioGroupProps;

export function ChipGroup({ options, ...props }: ChipGroupProps) {
  const field = useFieldControl(props);
  return (
    <Primitive.Root
      {...domProps(props)}
      {...field}
      className="ds-chip-group"
      data-slot="chip-group"
    >
      {options.map((option) => (
        <Primitive.Item
          key={option.value}
          value={option.value}
          disabled={option.disabled}
          className="ds-choice-chip"
        >
          {option.label}
        </Primitive.Item>
      ))}
    </Primitive.Root>
  );
}
