"use client";

import * as RadioGroup from "@radix-ui/react-radio-group";
import type { CSSProperties, ReactNode } from "react";
import { Icon } from "./icon.js";

export type SegmentedControlOption<T extends string> = {
  value: T;
  label: string;
  disabled?: boolean | undefined;
};
export type SegmentedControlProps<T extends string> = {
  value: T;
  options: readonly SegmentedControlOption<T>[];
  onValueChange: (value: T) => void;
  ariaLabel: string;
  disabled?: boolean | undefined;
  name?: string | undefined;
};

export function SegmentedControl<T extends string>({
  value,
  options,
  onValueChange,
  ariaLabel,
  disabled = false,
  name,
}: SegmentedControlProps<T>) {
  const index = options.findIndex((option) => option.value === value);
  const variables = {
    "--ds-option-count": options.length,
    "--ds-selected-index": Math.max(index, 0),
  } as CSSProperties;
  return (
    <RadioGroup.Root
      className="ds-segmented-control"
      data-slot="segmented-control"
      value={value}
      onValueChange={(next) => onValueChange(next as T)}
      aria-label={ariaLabel}
      disabled={disabled}
      name={name}
      orientation="horizontal"
      style={variables}
    >
      {index >= 0 ? (
        <span className="ds-segment-indicator" aria-hidden="true" />
      ) : null}
      {options.map((option) => (
        <RadioGroup.Item
          key={option.value}
          value={option.value}
          disabled={option.disabled}
          className="ds-segment-item"
        >
          {option.label}
        </RadioGroup.Item>
      ))}
    </RadioGroup.Root>
  );
}

export type FilterChipProps = {
  label: string;
  onClear: () => void;
  children: ReactNode;
  disabled?: boolean | undefined;
};
export function FilterChip({
  label,
  onClear,
  children,
  disabled,
}: FilterChipProps) {
  return (
    <button
      className="ds-filter-chip"
      data-slot="filter-chip"
      type="button"
      aria-label={label}
      onClick={onClear}
      disabled={disabled}
    >
      {children}
      <Icon name="close" />
    </button>
  );
}
