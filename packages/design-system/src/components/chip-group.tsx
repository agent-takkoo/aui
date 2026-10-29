"use client";

import * as RadioGroup from "@radix-ui/react-radio-group";
import type { ReactNode } from "react";

export type ChipOption<T extends string> = {
  value: T;
  label: string;
  disabled?: boolean;
};
export type ChipGroupProps<T extends string> = {
  value: T | null;
  options: readonly ChipOption<T>[];
  onValueChange: (value: T) => void;
  ariaLabel: string;
  disabled?: boolean;
  name?: string;
  trailing?: ReactNode;
};

export function ChipGroup<T extends string>({
  value,
  options,
  onValueChange,
  ariaLabel,
  disabled = false,
  name,
  trailing,
}: ChipGroupProps<T>) {
  return (
    <RadioGroup.Root
      className="ds-chip-group"
      data-slot="chip-group"
      value={value ?? ""}
      onValueChange={(next) => onValueChange(next as T)}
      aria-label={ariaLabel}
      disabled={disabled}
      name={name}
      orientation="horizontal"
      loop
    >
      {options.map((option) => (
        <RadioGroup.Item
          key={option.value}
          value={option.value}
          disabled={option.disabled}
          className="ds-chip"
        >
          {option.label}
        </RadioGroup.Item>
      ))}
      {trailing !== undefined ? (
        <span className="ds-chip-trailing">{trailing}</span>
      ) : null}
    </RadioGroup.Root>
  );
}

export type ChipInputProps = {
  label: string;
  unit?: string;
  value: string;
  onChange: (value: string) => void;
  onCommit?: (value: string) => void;
  placeholder?: string;
  inputMode?: "numeric" | "decimal" | "text";
  name?: string;
  disabled?: boolean;
};

export function ChipInput({
  label,
  unit,
  value,
  onChange,
  onCommit,
  placeholder,
  inputMode = "numeric",
  name,
  disabled,
}: ChipInputProps) {
  return (
    <label className="ds-chip-input" data-slot="chip-input">
      <span>{label}</span>
      <input
        name={name}
        inputMode={inputMode}
        placeholder={placeholder}
        aria-label={unit ? `${label} (${unit})` : label}
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        onBlur={(event) => onCommit?.(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") event.currentTarget.blur();
        }}
      />
      {unit ? <span>{unit}</span> : null}
    </label>
  );
}
