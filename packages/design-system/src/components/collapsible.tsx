"use client";
import * as Primitive from "@radix-ui/react-collapsible";
import type { ReactNode } from "react";
export type CollapsibleProps = {
  label: string;
  children: ReactNode;
  open?: boolean | undefined;
  defaultOpen?: boolean | undefined;
  onOpenChange?: ((open: boolean) => void) | undefined;
  disabled?: boolean | undefined;
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
        <span aria-hidden="true">⌄</span>
      </Primitive.Trigger>
      <Primitive.Content className="ds-collapsible-content">
        <div className="ds-disclosure-body">{children}</div>
      </Primitive.Content>
    </Primitive.Root>
  );
}
