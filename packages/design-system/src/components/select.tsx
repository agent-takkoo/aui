"use client";
import * as Primitive from "@radix-ui/react-select";
import * as TogglePrimitive from "@radix-ui/react-toggle-group";
import type { ComponentPropsWithRef } from "react";
import {
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import type { RestrictedProps } from "../internal/props.js";
import { domProps } from "../internal/props.js";
import { useMobileViewport } from "../internal/media.js";
import { usePortalHost } from "../theme/provider.js";
import { useFieldControl, useFieldLabel } from "./field.js";
import { DialogFrame } from "./dialog.js";
import { Icon } from "./icon.js";
import type { ChoiceOption } from "./radio-group.js";
export type SelectProps = RestrictedProps<
  Omit<
    ComponentPropsWithRef<typeof Primitive.Trigger>,
    "children" | "defaultValue" | "value" | "onChange"
  >
> & {
  inputSize?: "sm" | "md";
  selectionTitle?: string;
  options: readonly ChoiceOption[];
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  name?: string;
  required?: boolean;
  autoComplete?: string;
};
export function Select({
  inputSize = "md",
  selectionTitle,
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
  ref,
  ...props
}: SelectProps) {
  const host = usePortalHost();
  const mobile = useMobileViewport();
  const field = useFieldControl({ ...props, required });
  const fieldLabel = useFieldLabel();
  const title =
    selectionTitle ?? fieldLabel ?? props["aria-label"] ?? "항목 선택";
  const initialValue = useRef(value ?? defaultValue ?? "");
  const [uncontrolled, setUncontrolled] = useState(initialValue.current);
  const currentValue = value ?? uncontrolled;
  const current = options.find((option) => option.value === currentValue);
  const [popup, setPopup] = useState({ mobile, open: false });
  // 열려 있는 동안 화면 폭이 바뀌면 다른 표시 방식으로 팝업이 이어지지 않게 닫는다.
  if (popup.mobile !== mobile) setPopup({ mobile, open: false });
  const open = popup.mobile === mobile && popup.open;
  const setOpen = (next: boolean) => setPopup({ mobile, open: next });
  const triggerRef = useRef<HTMLButtonElement>(null);
  const nativeRef = useRef<HTMLSelectElement>(null);
  const choicesRef = useRef<HTMLDivElement>(null);
  useImperativeHandle(ref, () => triggerRef.current!);
  const changeValue = useCallback(
    (next: string) => {
      if (value === undefined) setUncontrolled(next);
      onValueChange?.(next);
    },
    [value, onValueChange],
  );
  useEffect(() => {
    const associatedForm = form
      ? document.getElementById(form)
      : triggerRef.current?.form;
    if (!(associatedForm instanceof HTMLFormElement)) return;
    let resetTimer: ReturnType<typeof setTimeout> | undefined;
    const reset = () => {
      resetTimer = setTimeout(() => {
        changeValue(initialValue.current);
        // native reset의 기본 동작이 끝난 뒤 화면 값과 실제 제출 값을 맞춘다.
        if (nativeRef.current)
          nativeRef.current.value = value ?? initialValue.current;
      }, 0);
    };
    associatedForm.addEventListener("reset", reset);
    return () => {
      associatedForm.removeEventListener("reset", reset);
      clearTimeout(resetTimer);
    };
  }, [mobile, form, changeValue, value]);

  if (mobile)
    return (
      <>
        <DialogFrame
          presentation="drawer"
          title={title}
          open={open && !disabled}
          onOpenChange={setOpen}
          onOpenAutoFocus={(event) => {
            const target =
              choicesRef.current?.querySelector<HTMLButtonElement>(
                '[data-state="on"]:not(:disabled)',
              ) ??
              choicesRef.current?.querySelector<HTMLButtonElement>(
                "button:not(:disabled)",
              );
            if (target) {
              event.preventDefault();
              target.focus();
            }
          }}
          trigger={
            <button
              {...domProps(props)}
              {...field}
              ref={triggerRef}
              type="button"
              role="combobox"
              aria-haspopup="dialog"
              aria-required={field.required}
              disabled={disabled}
              form={form}
              data-slot="select"
              data-presentation="drawer"
              data-placeholder={current ? undefined : ""}
              className={`ds-select-trigger ds-input-${inputSize}`}
              onKeyDown={(event) => {
                props.onKeyDown?.(event);
                if (
                  !event.defaultPrevented &&
                  ["ArrowDown", "ArrowUp"].includes(event.key)
                ) {
                  event.preventDefault();
                  setOpen(true);
                }
              }}
            >
              <span>{current?.label ?? placeholder}</span>
              <span aria-hidden="true">
                <Icon name="chevron-down" />
              </span>
            </button>
          }
        >
          <TogglePrimitive.Root
            ref={choicesRef}
            type="single"
            orientation="vertical"
            value={currentValue}
            aria-label={title}
            className="ds-select-choices"
            onValueChange={(next) => {
              if (next && next !== currentValue && nativeRef.current) {
                // 실제 select의 change를 사용해 form 이벤트와 제출 값을 함께 유지한다.
                const setter = Object.getOwnPropertyDescriptor(
                  HTMLSelectElement.prototype,
                  "value",
                )?.set;
                setter?.call(nativeRef.current, next);
                nativeRef.current.dispatchEvent(
                  new Event("change", { bubbles: true }),
                );
              }
              setOpen(false);
            }}
          >
            {options.map((option) => (
              <TogglePrimitive.Item
                key={option.value}
                value={option.value}
                disabled={option.disabled}
                className="ds-select-choice"
              >
                <span>{option.label}</span>
                {option.value === currentValue && <Icon name="check" />}
              </TogglePrimitive.Item>
            ))}
          </TogglePrimitive.Root>
        </DialogFrame>
        <select
          ref={nativeRef}
          className="ds-select-native"
          aria-hidden="true"
          tabIndex={-1}
          name={name}
          form={form}
          autoComplete={autoComplete}
          required={field.required}
          disabled={disabled}
          value={currentValue}
          onChange={(event) => changeValue(event.target.value)}
          onInvalid={(event) => {
            event.preventDefault();
            setOpen(true);
          }}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
      </>
    );

  return (
    <Primitive.Root
      value={currentValue}
      onValueChange={changeValue}
      open={open}
      onOpenChange={setOpen}
      name={name}
      required={field.required}
      disabled={disabled}
      form={form}
      autoComplete={autoComplete}
    >
      <Primitive.Trigger
        {...domProps(props)}
        {...field}
        ref={triggerRef}
        className={`ds-select-trigger ds-input-${inputSize}`}
        data-slot="select"
        data-presentation="popover"
      >
        <Primitive.Value placeholder={placeholder} />
        <Primitive.Icon aria-hidden="true">
          <Icon name="chevron-down" />
        </Primitive.Icon>
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
              <Icon name="chevron-up" />
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
                    <Icon name="check" />
                  </Primitive.ItemIndicator>
                </Primitive.Item>
              ))}
            </Primitive.Viewport>
            <Primitive.ScrollDownButton className="ds-select-scroll">
              <Icon name="chevron-down" />
            </Primitive.ScrollDownButton>
          </Primitive.Content>
        </Primitive.Portal>
      ) : null}
    </Primitive.Root>
  );
}
