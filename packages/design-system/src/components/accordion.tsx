"use client";
import * as Primitive from "@radix-ui/react-accordion";
import type { ReactNode } from "react";
import { Icon } from "./icon.js";
export type AccordionItem = {
  value: string;
  title: string;
  content: ReactNode;
  disabled?: boolean;
};
export type AccordionProps = {
  items: readonly AccordionItem[];
  disabled?: boolean;
} & (
  | {
      type?: "single";
      value?: string;
      defaultValue?: string;
      onValueChange?: (value: string) => void;
    }
  | {
      type: "multiple";
      value?: string[];
      defaultValue?: string[];
      onValueChange?: (value: string[]) => void;
    }
);
export function Accordion({ items, ...props }: AccordionProps) {
  const children = items.map((item) => (
    <Primitive.Item
      className="ds-accordion-item"
      key={item.value}
      value={item.value}
      disabled={item.disabled}
    >
      <Primitive.Header className="ds-accordion-header">
        <Primitive.Trigger className="ds-accordion-trigger">
          {item.title}
          <span aria-hidden="true">
            <Icon name="chevron-down" />
          </span>
        </Primitive.Trigger>
      </Primitive.Header>
      <Primitive.Content className="ds-accordion-content">
        <div className="ds-disclosure-body">{item.content}</div>
      </Primitive.Content>
    </Primitive.Item>
  ));
  return props.type === "multiple" ? (
    <Primitive.Root
      type="multiple"
      value={props.value}
      defaultValue={props.defaultValue}
      onValueChange={props.onValueChange}
      disabled={props.disabled}
      className="ds-accordion"
      data-slot="accordion"
    >
      {children}
    </Primitive.Root>
  ) : (
    <Primitive.Root
      type="single"
      collapsible
      value={props.value}
      defaultValue={props.defaultValue}
      onValueChange={props.onValueChange}
      disabled={props.disabled}
      className="ds-accordion"
      data-slot="accordion"
    >
      {children}
    </Primitive.Root>
  );
}
