"use client";
import type { ReactElement, ReactNode } from "react";
import { usePortalHost } from "../theme/provider.js";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { useViewportStyle } from "../internal/viewport.js";
import { IconButton } from "./button.js";
import { Icon } from "./icon.js";
export type DialogProps = {
  title: string;
  description?: string | undefined;
  trigger?: ReactElement | undefined;
  open?: boolean | undefined;
  onOpenChange?: ((open: boolean) => void) | undefined;
  children: ReactNode;
  footer?: ReactNode | undefined;
  size?: "sm" | "md" | undefined;
};

export function Dialog(props: DialogProps) {
  return <DialogFrame {...props} presentation="dialog" />;
}

export function DialogFrame({
  title,
  description,
  trigger,
  open,
  onOpenChange,
  children,
  footer,
  size = "md",
  presentation,
}: DialogProps & {
  presentation: "dialog" | "drawer" | "drawer-left" | "drawer-right";
}) {
  const portalHost = usePortalHost();
  const viewportStyle = useViewportStyle();
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      {trigger ? (
        <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>
      ) : null}
      {portalHost ? (
        <DialogPrimitive.Portal container={portalHost}>
          <DialogPrimitive.Overlay
            className={`ds-overlay ds-overlay-${presentation}`}
            style={viewportStyle}
          >
            <DialogPrimitive.Content
              className={`ds-dialog ds-dialog-${size} ds-presentation-${presentation}`}
              data-slot={presentation}
              {...(!description ? { "aria-describedby": undefined } : {})}
            >
              <header className="ds-dialog-header">
                <div>
                  <DialogPrimitive.Title className="ds-dialog-title">
                    {title}
                  </DialogPrimitive.Title>
                  {description ? (
                    <DialogPrimitive.Description className="ds-dialog-description">
                      {description}
                    </DialogPrimitive.Description>
                  ) : null}
                </div>
                <DialogPrimitive.Close asChild>
                  <IconButton icon={<Icon name="close" />} label="닫기" />
                </DialogPrimitive.Close>
              </header>
              <div className="ds-dialog-body">{children}</div>
              {footer ? (
                <footer className="ds-dialog-footer">{footer}</footer>
              ) : null}
            </DialogPrimitive.Content>
          </DialogPrimitive.Overlay>
        </DialogPrimitive.Portal>
      ) : null}
    </DialogPrimitive.Root>
  );
}
