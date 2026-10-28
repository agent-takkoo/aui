"use client";

import { createContext, useContext, useId } from "react";
import type { ReactNode } from "react";
import { domProps } from "../internal/props.js";
import type { DesignProps } from "../internal/props.js";

type FieldContextValue = {
  id: string;
  describedBy?: string;
  invalid: boolean;
  required?: boolean;
};
const FieldContext = createContext<FieldContextValue | null>(null);
export function useFieldControl(props: {
  id?: string;
  required?: boolean;
  "aria-describedby"?: string;
  "aria-labelledby"?: string;
  "aria-label"?: string;
  "aria-invalid"?: boolean | "true" | "false" | "grammar" | "spelling";
}) {
  const field = useContext(FieldContext);
  return {
    id: props.id ?? field?.id,
    required: props.required ?? field?.required,
    "aria-label": props["aria-label"],
    "aria-labelledby":
      props["aria-labelledby"] ??
      (!props["aria-label"] && field ? `${field.id}-label` : undefined),
    "aria-describedby":
      [field?.describedBy, props["aria-describedby"]]
        .filter(Boolean)
        .join(" ") || undefined,
    "aria-invalid": props["aria-invalid"] ?? (field?.invalid || undefined),
  };
}
export type FieldProps = {
  id?: string;
  label: string;
  description?: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
};

export function Field({
  id,
  label,
  description,
  error,
  required,
  children,
}: FieldProps) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  const describedBy =
    [description && `${fieldId}-description`, error && `${fieldId}-error`]
      .filter(Boolean)
      .join(" ") || undefined;
  return (
    <FieldContext.Provider
      value={{ id: fieldId, describedBy, invalid: Boolean(error), required }}
    >
      <div className="ds-field" data-slot="field">
        <Label id={`${fieldId}-label`} htmlFor={fieldId}>
          {label}
          {required ? (
            <span className="ds-required" aria-hidden="true">
              {" "}
              (필수)
            </span>
          ) : null}
        </Label>
        {children}
        {description ? (
          <p className="ds-field-description" id={`${fieldId}-description`}>
            {description}
          </p>
        ) : null}
        {error ? (
          <p className="ds-field-error" role="alert" id={`${fieldId}-error`}>
            {error}
          </p>
        ) : null}
      </div>
    </FieldContext.Provider>
  );
}

export type InputProps = DesignProps<"input"> & { inputSize?: "sm" | "md" };

export function Input({
  inputSize = "md",
  id,
  "aria-describedby": describedBy,
  "aria-invalid": invalid,
  required,
  type = "text",
  ...props
}: InputProps) {
  const field = useContext(FieldContext);
  return (
    <input
      {...domProps(props)}
      id={id ?? field?.id}
      type={type}
      required={required ?? field?.required}
      aria-describedby={
        [field?.describedBy, describedBy].filter(Boolean).join(" ") || undefined
      }
      aria-invalid={invalid ?? (field?.invalid || undefined)}
      className={`ds-input ds-input-${inputSize}`}
      data-slot="input"
    />
  );
}

export type TextareaProps = DesignProps<"textarea">;

export function Textarea({
  id,
  "aria-describedby": describedBy,
  "aria-invalid": invalid,
  required,
  rows = 4,
  ...props
}: TextareaProps) {
  const field = useContext(FieldContext);
  return (
    <textarea
      {...domProps(props)}
      id={id ?? field?.id}
      rows={rows}
      required={required ?? field?.required}
      aria-describedby={
        [field?.describedBy, describedBy].filter(Boolean).join(" ") || undefined
      }
      aria-invalid={invalid ?? (field?.invalid || undefined)}
      className="ds-input ds-textarea"
      data-slot="textarea"
    />
  );
}

export function Label(props: DesignProps<"label">) {
  return <label {...domProps(props)} className="ds-label" data-slot="label" />;
}
