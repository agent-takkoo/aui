import type { ReactNode } from "react";
import type { DesignProps } from "../internal/props.js";
import { domProps } from "../internal/props.js";
import { Icon } from "./icon.js";

export type ListItemProps = Omit<DesignProps<"button">, "title"> & {
  title: string;
  description?: string | undefined;
  leading?: ReactNode;
  trailing?: ReactNode;
  selected?: boolean | undefined;
  chevron?: boolean | undefined;
};

export function ListItem({
  title,
  description,
  leading,
  trailing,
  selected = false,
  chevron,
  type = "button",
  ...props
}: ListItemProps) {
  const showChevron = chevron ?? trailing === undefined;
  return (
    <button
      {...domProps(props)}
      type={type}
      className="ds-list-item"
      data-slot="list-item"
      aria-current={selected ? "true" : undefined}
    >
      {leading !== undefined ? (
        <span className="ds-list-item-leading">{leading}</span>
      ) : null}
      <span className="ds-list-item-copy">
        <strong>{title}</strong>
        {description ? <span>{description}</span> : null}
      </span>
      {trailing !== undefined ? (
        <span className="ds-list-item-trailing">{trailing}</span>
      ) : null}
      {showChevron ? (
        <span className="ds-chevron" aria-hidden="true">
          <Icon name="back" />
        </span>
      ) : null}
    </button>
  );
}

export type PickerRowProps = Omit<DesignProps<"button">, "title" | "value"> & {
  label: string;
  value?: string | undefined;
  placeholder: string;
  onClear?: (() => void) | undefined;
  clearLabel?: string | undefined;
};

export function PickerRow({
  label,
  value,
  placeholder,
  onClear,
  clearLabel,
  type = "button",
  ...props
}: PickerRowProps) {
  const filled = Boolean(value);
  return (
    <span className="ds-picker-row" data-slot="picker-row">
      <button
        {...domProps(props)}
        type={type}
        className="ds-picker-row-button"
        data-filled={filled ? "true" : undefined}
      >
        <span className="ds-picker-row-label">{label}</span>
        <span className="ds-picker-row-value">{filled ? value : placeholder}</span>
        {!(filled && onClear) ? (
          <span className="ds-chevron" aria-hidden="true">
            <Icon name="back" />
          </span>
        ) : null}
      </button>
      {filled && onClear ? (
        <button
          type="button"
          className="ds-picker-row-clear"
          aria-label={clearLabel ?? `${label} 지우기`}
          onClick={onClear}
        >
          <Icon name="close" />
        </button>
      ) : null}
    </span>
  );
}
