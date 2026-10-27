import { useEffect, useState } from "react";
import type { ReactNode } from "react";

export const DOCS_ARGS = "ai-system:docs-args";
export const DOCS_READY = "ai-system:docs-ready";

/** URL args는 한글을 제외하므로 같은 origin의 Docs 예제에 args를 직접 전달한다. */
export function DocsPreview({
  children,
}: {
  children: (
    args: Record<string, unknown>,
    globals: Record<string, unknown>,
  ) => ReactNode;
}) {
  const [state, setState] = useState<{
    args: Record<string, unknown>;
    globals: Record<string, unknown>;
  }>({ args: {}, globals: {} });
  useEffect(() => {
    if (!window.frameElement?.id.startsWith("iframe--")) return;
    const update = (event: Event) =>
      setState((event as CustomEvent<typeof state>).detail);
    window.addEventListener(DOCS_ARGS, update);
    window.parent.dispatchEvent(
      new CustomEvent(DOCS_READY, { detail: window.frameElement }),
    );
    return () => window.removeEventListener(DOCS_ARGS, update);
  }, []);
  return children(state.args, state.globals);
}
