"use client";
import * as Primitive from "@radix-ui/react-switch";
import type { ComponentPropsWithRef } from "react";
import { useId } from "react";
import { domProps } from "../internal/props.js";
import type { RestrictedProps } from "../internal/props.js";
import { useFieldControl } from "./field.js";
export type SwitchProps = RestrictedProps<
  Omit<ComponentPropsWithRef<typeof Primitive.Root>, "children">
> & { label?: string };
export function Switch({ label, ...props }: SwitchProps) {
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
      className="ds-switch"
      data-slot="switch"
    >
      <span className="ds-switch-track">
        <Primitive.Thumb className="ds-switch-thumb" />
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
