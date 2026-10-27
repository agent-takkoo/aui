"use client";
import type { ReactElement } from "react";
import { usePortalHost } from "../theme/provider.js";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { useViewportStyle } from "../internal/viewport.js";
import { Button } from "./button.js";
export type ConfirmDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  tone?: "primary" | "destructive";
  busy?: boolean;
  onConfirm: () => void;
  trigger?: ReactElement;
};

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "삭제",
  cancelLabel = "취소",
  tone = "destructive",
  busy = false,
  onConfirm,
  trigger,
}: ConfirmDialogProps) {
  const portalHost = usePortalHost();
  const viewportStyle = useViewportStyle();
  return (
    <AlertDialog.Root
      open={open}
      onOpenChange={(nextOpen) => {
        if (!busy) onOpenChange(nextOpen);
      }}
    >
      {trigger ? (
        <AlertDialog.Trigger asChild>{trigger}</AlertDialog.Trigger>
      ) : null}
      {portalHost ? (
        <AlertDialog.Portal container={portalHost}>
          <AlertDialog.Overlay
            className="ds-overlay ds-overlay-dialog"
            style={viewportStyle}
          >
            <AlertDialog.Content
              className="ds-dialog ds-confirm-dialog"
              data-slot="confirm-dialog"
              onEscapeKeyDown={(event) => {
                if (busy) event.preventDefault();
              }}
            >
              <AlertDialog.Title className="ds-dialog-title">
                {title}
              </AlertDialog.Title>
              <AlertDialog.Description className="ds-dialog-description">
                {description}
              </AlertDialog.Description>
              <div className="ds-confirm-actions">
                <AlertDialog.Cancel asChild>
                  <Button variant="secondary" fullWidth disabled={busy}>
                    {cancelLabel}
                  </Button>
                </AlertDialog.Cancel>
                <AlertDialog.Action asChild>
                  <Button
                    variant={tone}
                    fullWidth
                    loading={busy}
                    onClick={(event) => {
                      event.preventDefault();
                      if (!busy) onConfirm();
                    }}
                  >
                    {confirmLabel}
                  </Button>
                </AlertDialog.Action>
              </div>
            </AlertDialog.Content>
          </AlertDialog.Overlay>
        </AlertDialog.Portal>
      ) : null}
    </AlertDialog.Root>
  );
}
