"use client";
import * as Primitive from "@radix-ui/react-tabs";
import type { ReactNode } from "react";
export type TabItem = {
  value: string;
  label: string;
  content: ReactNode;
  disabled?: boolean;
};
export type TabsProps = {
  label: string;
  items: readonly TabItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  activationMode?: "automatic" | "manual";
};
export function Tabs({ label, items, defaultValue, ...props }: TabsProps) {
  return (
    <Primitive.Root
      value={props.value}
      defaultValue={defaultValue ?? items.find((item) => !item.disabled)?.value}
      onValueChange={props.onValueChange}
      activationMode={props.activationMode}
      className="ds-tabs"
      data-slot="tabs"
    >
      <Primitive.List className="ds-tab-list" aria-label={label}>
        {items.map((item) => (
          <Primitive.Trigger
            className="ds-tab-trigger"
            key={item.value}
            value={item.value}
            disabled={item.disabled}
          >
            {item.label}
          </Primitive.Trigger>
        ))}
      </Primitive.List>
      {items.map((item) => (
        <Primitive.Content
          className="ds-tab-content"
          key={item.value}
          value={item.value}
        >
          {item.content}
        </Primitive.Content>
      ))}
    </Primitive.Root>
  );
}
