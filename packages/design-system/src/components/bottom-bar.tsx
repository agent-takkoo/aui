"use client";

import { useRef } from "react";
import { useMeasuredHeight } from "../internal/measured-height.js";
import { ActionBar } from "./shell.js";
import type { ActionBarProps } from "./shell.js";

export type BottomBarProps = Omit<ActionBarProps, "sticky">;

export function BottomBar(props: BottomBarProps) {
  const spaceRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  useMeasuredHeight(barRef, spaceRef, "--ds-bottom-bar-height");
  return (
    <div ref={spaceRef} className="ds-bottom-bar-space" data-slot="bottom-bar">
      <div ref={barRef} className="ds-bottom-bar-fixed">
        <ActionBar {...props} sticky={false} />
      </div>
    </div>
  );
}
