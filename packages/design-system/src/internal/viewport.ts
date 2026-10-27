"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";

function measure() {
  if (typeof window === "undefined") return null;
  const viewport = window.visualViewport;
  return {
    height: viewport?.height ?? window.innerHeight,
    top: viewport?.offsetTop ?? 0,
    keyboard: Math.max(
      0,
      window.innerHeight -
        ((viewport?.height ?? window.innerHeight) + (viewport?.offsetTop ?? 0)),
    ),
  };
}

export function useViewportStyle(): CSSProperties | undefined {
  const [viewport, setViewport] = useState<ReturnType<typeof measure>>(null);
  useEffect(() => {
    const update = () => setViewport(measure());
    const visualViewport = window.visualViewport;
    update();
    visualViewport?.addEventListener("resize", update);
    visualViewport?.addEventListener("scroll", update);
    window.addEventListener("resize", update);
    return () => {
      visualViewport?.removeEventListener("resize", update);
      visualViewport?.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  return viewport
    ? ({
        "--ds-viewport-height": `${viewport.height}px`,
        "--ds-viewport-top": `${viewport.top}px`,
        "--ds-keyboard-inset": `${viewport.keyboard}px`,
      } as CSSProperties)
    : undefined;
}
