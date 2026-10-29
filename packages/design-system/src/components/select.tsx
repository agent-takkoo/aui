"use client";
import * as Primitive from "@radix-ui/react-select";
import type { ComponentPropsWithRef } from "react";
import type { RestrictedProps } from "../internal/props.js";
import { domProps } from "../internal/props.js";
import { usePortalHost } from "../theme/provider.js";
import { useFieldControl } from "./field.js";
import type { ChoiceOption } from "./radio-group.js";
export type SelectProps = RestrictedProps<
  Omit<
    ComponentPropsWithRef<typeof Primitive.Trigger>,
    "children" | "defaultValue" | "value" | "onChange"
  >
> & {
  options: readonly ChoiceOption[];
  placeholder?: string | undefined;
  value?: string | undefined;
  defaultValue?: string | undefined;
  onValueChange?: ((value: string) => void) | undefined;
  name?: string | undefined;
  required?: boolean | undefined;
  autoComplete?: string | undefined;
};
export function Select({
  options,
  placeholder = "선택해 주세요…",
  value,
  defaultValue,
  onValueChange,
  name,
  required,
  disabled,
  form,
  autoComplete,
  ...props
}: SelectProps) {
  const host = usePortalHost();
  const field = useFieldControl({ ...props, required });
  return (
    <Primitive.Root
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      name={name}
      required={field.required}
      disabled={disabled}
      form={form}
      autoComplete={autoComplete}
    >
      <Primitive.Trigger
        {...domProps(props)}
        {...field}
        className="ds-select-trigger"
        data-slot="select"
      >
        <Primitive.Value placeholder={placeholder} />
        <Primitive.Icon aria-hidden="true">⌄</Primitive.Icon>
      </Primitive.Trigger>
      {host ? (
        <Primitive.Portal container={host}>
          <Primitive.Content
            className="ds-select-content"
            position="popper"
            sideOffset={4}
            collisionPadding={12}
          >
            <Primitive.ScrollUpButton className="ds-select-scroll">
              ⌃
            </Primitive.ScrollUpButton>
            <Primitive.Viewport>
              {options.map((option) => (
                <Primitive.Item
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                  className="ds-select-item"
                >
                  <Primitive.ItemText>{option.label}</Primitive.ItemText>
                  <Primitive.ItemIndicator aria-hidden="true">
                    ✓
                  </Primitive.ItemIndicator>
                </Primitive.Item>
              ))}
            </Primitive.Viewport>
            <Primitive.ScrollDownButton className="ds-select-scroll">
              ⌄
            </Primitive.ScrollDownButton>
          </Primitive.Content>
        </Primitive.Portal>
      ) : null}
    </Primitive.Root>
  );
}
