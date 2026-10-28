"use client";
import * as Primitive from "@radix-ui/react-radio-group";
import type { ComponentPropsWithRef } from "react";
import { useId } from "react";
import { domProps } from "../internal/props.js";
import type { RestrictedProps } from "../internal/props.js";
import { useFieldControl } from "./field.js";
export type ChoiceOption = { value: string; label: string; disabled?: boolean };
export type RadioGroupProps = RestrictedProps<
  Omit<ComponentPropsWithRef<typeof Primitive.Root>, "children">
> & { options: readonly ChoiceOption[] };
export function RadioGroup({ options, ...props }: RadioGroupProps) {
  const prefix = useId();
  const field = useFieldControl(props);
  return (
    <Primitive.Root
      {...domProps(props)}
      {...field}
      className="ds-radio-group"
      data-slot="radio-group"
    >
      {options.map((option, index) => (
        <label
          key={option.value}
          htmlFor={`${prefix}-${index}`}
          className="ds-choice-label"
        >
          <Primitive.Item
            id={`${prefix}-${index}`}
            value={option.value}
            disabled={option.disabled}
            className="ds-radio"
          >
            <span className="ds-radio-circle">
              <Primitive.Indicator className="ds-radio-dot" />
            </span>
          </Primitive.Item>
          <span>{option.label}</span>
        </label>
      ))}
    </Primitive.Root>
  );
}
