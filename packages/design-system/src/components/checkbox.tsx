"use client";
import * as Primitive from "@radix-ui/react-checkbox";
import type { ComponentPropsWithRef } from "react";
import { useId } from "react";
import { domProps } from "../internal/props.js";
import type { RestrictedProps } from "../internal/props.js";
import { useFieldControl } from "./field.js";
export type CheckboxProps = RestrictedProps<
  Omit<ComponentPropsWithRef<typeof Primitive.Root>, "children">
> & { label?: string };
export function Checkbox({ label, ...props }: CheckboxProps) {
  const autoId = useId();
  const field = useFieldControl({
    ...props,
    "aria-label": props["aria-label"] ?? label,
  });
  const id = field.id ?? autoId;
  const control = (
    <Primitive.Root
      {...domProps(props)}
      {...field}
      id={id}
      className="ds-check-control"
      data-slot="checkbox"
    >
      <span className="ds-check-box">
        <Primitive.Indicator className="ds-check-indicator">
          <span aria-hidden="true" />
        </Primitive.Indicator>
      </span>
    </Primitive.Root>
  );
  return label ? (
    <label className="ds-choice-label" htmlFor={id}>
      {control}
      <span>{label}</span>
    </label>
  ) : (
    control
  );
}
