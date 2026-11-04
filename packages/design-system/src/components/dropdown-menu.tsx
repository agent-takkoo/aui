"use client";
import type { ReactElement } from "react";
import { usePortalHost } from "../theme/provider.js";
import * as Dropdown from "@radix-ui/react-dropdown-menu";
export type MenuItem = {
  id: string;
  label: string;
  onSelect: () => void;
  disabled?: boolean | undefined;
  destructive?: boolean | undefined;
};
export type DropdownMenuProps = {
  trigger: ReactElement;
  items: readonly MenuItem[];
  label: string;
  align?: "start" | "end" | undefined;
};

export function DropdownMenu({
  trigger,
  items,
  label,
  align = "end",
}: DropdownMenuProps) {
  const portalHost = usePortalHost();
  return (
    <Dropdown.Root>
      <Dropdown.Trigger asChild>{trigger}</Dropdown.Trigger>
      {portalHost ? (
        <Dropdown.Portal container={portalHost}>
          <Dropdown.Content
            className="ds-dropdown-menu"
            data-slot="dropdown-menu"
            align={align}
            sideOffset={6}
            collisionPadding={16}
            aria-label={label}
          >
            {items.map((item) => (
              <Dropdown.Item
                key={item.id}
                className="ds-dropdown-item"
                disabled={item.disabled}
                data-destructive={item.destructive || undefined}
                onSelect={() => item.onSelect()}
              >
                {item.label}
              </Dropdown.Item>
            ))}
          </Dropdown.Content>
        </Dropdown.Portal>
      ) : null}
    </Dropdown.Root>
  );
}
