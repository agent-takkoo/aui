"use client";
import * as Primitive from "@radix-ui/react-slider";
import type { ComponentPropsWithRef } from "react";
import type { RestrictedProps } from "../internal/props.js";
import { domProps } from "../internal/props.js";
import { useFieldControl } from "./field.js";
export type SliderProps = RestrictedProps<
  Omit<
    ComponentPropsWithRef<typeof Primitive.Root>,
    | "children"
    | "value"
    | "defaultValue"
    | "onValueChange"
    | "onValueCommit"
    | "orientation"
    | "minStepsBetweenThumbs"
  >
> & {
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  onValueCommit?: (value: number) => void;
};
export function Slider({
  value,
  defaultValue,
  min = 0,
  max = 100,
  step = 1,
  onValueChange,
  onValueCommit,
  ...props
}: SliderProps) {
  const field = useFieldControl(props);
  if (
    !Number.isFinite(min) ||
    !Number.isFinite(max) ||
    !Number.isFinite(step) ||
    max <= min ||
    step <= 0
  )
    throw new Error("Slider는 유한한 min < max와 양수 step이 필요해요.");
  const clamp = (number: number) =>
    Number.isFinite(number) ? Math.min(max, Math.max(min, number)) : min;
  return (
    <Primitive.Root
      {...domProps(props)}
      id={undefined}
      className="ds-slider"
      data-slot="slider"
      min={min}
      max={max}
      step={step}
      value={value === undefined ? undefined : [clamp(value)]}
      defaultValue={[clamp(defaultValue ?? min)]}
      onValueChange={(values) => onValueChange?.(values[0])}
      onValueCommit={(values) => onValueCommit?.(values[0])}
    >
      <Primitive.Track className="ds-slider-track">
        <Primitive.Range className="ds-slider-range" />
      </Primitive.Track>
      <Primitive.Thumb {...field} className="ds-slider-thumb" />
    </Primitive.Root>
  );
}
