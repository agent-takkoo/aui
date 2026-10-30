"use client";

import type { ReactNode } from "react";
import type { DesignProps } from "../internal/props.js";
import { domProps } from "../internal/props.js";
import { Icon } from "./icon.js";

export type ListItemProps = Omit<
  DesignProps<"button">,
  "title" | "children"
> & {
  title: string;
  description?: string | undefined;
  leading?: ReactNode;
  trailing?: ReactNode;
  size?: "sm" | "lg" | undefined;
  chevron?: boolean | undefined;
};

export function ListItem({
  title,
  description,
  leading,
  trailing,
  size = "sm",
  chevron = trailing === undefined,
  type = "button",
  ...props
}: ListItemProps) {
  return (
    <button
      {...domProps(props)}
      type={type}
      className={`ds-list-item ds-list-item-${size}`}
      data-slot="list-item"
      data-size={size}
    >
      {leading ? <span className="ds-list-item-leading">{leading}</span> : null}
      <span className="ds-list-item-copy">
        <strong>{title}</strong>
        {description ? <span>{description}</span> : null}
      </span>
      {trailing ? (
        <span className="ds-list-item-trailing">{trailing}</span>
      ) : null}
      {chevron ? (
        <span className="ds-chevron" aria-hidden="true">
          <Icon name="chevron-right" />
        </span>
      ) : null}
    </button>
  );
}
