"use client";
import * as Primitive from "@radix-ui/react-tooltip";
import type { ReactElement } from "react";
import { usePortalHost } from "../theme/provider.js";
export type TooltipProps = {
  content: string;
  trigger: ReactElement;
  side?: "top" | "bottom" | "left" | "right" | undefined;
};
export function Tooltip({ content, trigger, side = "top" }: TooltipProps) {
  const host = usePortalHost();
  return (
    <Primitive.Provider delayDuration={400}>
      <Primitive.Root>
        <Primitive.Trigger asChild>{trigger}</Primitive.Trigger>
        {host ? (
          <Primitive.Portal container={host}>
            <Primitive.Content
              side={side}
              sideOffset={6}
              collisionPadding={12}
              className="ds-tooltip"
              data-slot="tooltip"
            >
              {content}
            </Primitive.Content>
          </Primitive.Portal>
        ) : null}
      </Primitive.Root>
    </Primitive.Provider>
  );
}
