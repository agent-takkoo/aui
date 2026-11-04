"use client";

import { useLayoutEffect } from "react";
import type { RefObject } from "react";

// 레이아웃에 필요한 실제 높이를 같은 컴포넌트의 CSS 변수로 전달한다.
export function useMeasuredHeight(
  target: RefObject<HTMLElement | null>,
  container: RefObject<HTMLElement | null>,
  property: string,
  enabled = true,
) {
  useLayoutEffect(() => {
    const host = container.current;
    const element = target.current;
    if (!host) return;
    if (!enabled || !element) {
      host.style.setProperty(property, "0px");
      return;
    }
    const measure = () =>
      host.style.setProperty(
        property,
        `${element.getBoundingClientRect().height}px`,
      );
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => {
      observer.disconnect();
      host.style.removeProperty(property);
    };
  }, [target, container, property, enabled]);
}
