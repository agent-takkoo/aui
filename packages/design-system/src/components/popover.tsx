"use client";
import type { ReactElement, ReactNode } from "react";
import { usePortalHost } from "../theme/provider.js";
import { useId } from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
export type PopoverProps = {
  title: string;
  trigger: ReactElement;
  children: ReactNode;
  align?: "start" | "end" | undefined;
};
export function Popover({
  title,
  trigger,
  children,
  align = "end",
}: PopoverProps) {
  const portalHost = usePortalHost();
  const titleId = useId();
  return (
    <PopoverPrimitive.Root>
      <PopoverPrimitive.Trigger asChild>{trigger}</PopoverPrimitive.Trigger>
      {portalHost ? (
        <PopoverPrimitive.Portal container={portalHost}>
          <PopoverPrimitive.Content
            className="ds-popover"
            data-slot="popover"
            align={align}
            sideOffset={6}
            collisionPadding={16}
            aria-labelledby={titleId}
          >
            <h2 id={titleId} className="ds-dialog-title">
              {title}
            </h2>
            {children}
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      ) : null}
    </PopoverPrimitive.Root>
  );
}
