"use client";
import * as Primitive from "@radix-ui/react-collapsible";
import type { ReactNode } from "react";
import { Icon } from "./icon.js";
export type CollapsibleProps = {
  label: string;
  children: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
};
export function Collapsible({
  label,
  children,
  open,
  defaultOpen,
  onOpenChange,
  disabled,
}: CollapsibleProps) {
  return (
    <Primitive.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      disabled={disabled}
      className="ds-collapsible"
      data-slot="collapsible"
    >
      <Primitive.Trigger className="ds-accordion-trigger">
        {label}
        <span aria-hidden="true">
          <Icon name="chevron-down" />
        </span>
      </Primitive.Trigger>
      <Primitive.Content className="ds-collapsible-content">
        <div className="ds-disclosure-body">{children}</div>
      </Primitive.Content>
    </Primitive.Root>
  );
}
