import { DocsContainer } from "@storybook/addon-docs/blocks";
import type { DocsContainerProps } from "@storybook/addon-docs/blocks";
import type { PropsWithChildren } from "react";
import { useEffect, useRef, useState } from "react";
import {
  RESET_STORY_ARGS,
  UPDATE_GLOBALS,
  UPDATE_STORY_ARGS,
} from "storybook/internal/core-events";
import { deepDiff, DEEPLY_EQUAL } from "storybook/internal/router";
import { DOCS_ARGS, DOCS_READY } from "./DocsPreview";

type ViewportGlobal = string | { value?: string } | undefined;
type Values = Record<string, unknown>;
const isMobile = (viewport: ViewportGlobal) =>
  (typeof viewport === "string" ? viewport : viewport?.value) === "mobile";

export function ResponsiveDocs({
  context,
  children,
  ...props
}: PropsWithChildren<DocsContainerProps>) {
  const root = useRef<HTMLDivElement>(null);
  const [mobile, setMobile] = useState(() => {
    const story = context.componentStories()[0];
    return story
      ? isMobile(context.getStoryContext(story).globals.viewport)
      : false;
  });
  useEffect(() => {
    const element = root.current!;
    const firstStory = context.componentStories()[0];
    let globals: Values = firstStory
      ? { ...context.getStoryContext(firstStory).globals }
      : {};
    const argsById = new Map<string, Values>();
    const readOverrides = (id: string): Values => {
      const story = context.storyById(id);
      const current = context.getStoryContext(story).args;
      return Object.fromEntries(
        Object.keys({ ...story.initialArgs, ...current })
          .filter(
            (key) =>
              deepDiff(story.initialArgs[key], current[key]) !== DEEPLY_EQUAL,
          )
          .map((key) => [key, current[key]]),
      );
    };
    const sendArgs = (frame: HTMLIFrameElement) => {
      const id = frame.id.slice("iframe--".length);
      const args = argsById.get(id) ?? readOverrides(id);
      frame.contentWindow?.dispatchEvent(
        new CustomEvent(DOCS_ARGS, { detail: { args, globals } }),
      );
    };
    // iframe Story는 globals/Controls를 자동으로 공유하지 않는다.
    // 같은 origin의 preview decorator에 전달해 입력 상태를 보존한다.
    const synchronize = () => {
      for (const frame of element.querySelectorAll<HTMLIFrameElement>(
        'iframe[id^="iframe--"]',
      )) {
        sendArgs(frame);
      }
    };
    const updateGlobals = ({ globals: changed }: { globals: Values }) => {
      globals = { ...globals, ...changed };
      if ("viewport" in changed)
        setMobile(isMobile(changed.viewport as ViewportGlobal));
      synchronize();
    };
    const updateArgs = ({
      storyId,
      updatedArgs,
    }: {
      storyId: string;
      updatedArgs: Values;
    }) => {
      argsById.set(storyId, {
        ...(argsById.get(storyId) ?? readOverrides(storyId)),
        ...updatedArgs,
      });
      synchronize();
    };
    const resetArgs = ({
      storyId,
      argNames,
    }: {
      storyId: string;
      argNames?: string[];
    }) => {
      const args = { ...(argsById.get(storyId) ?? readOverrides(storyId)) };
      for (const name of argNames ?? Object.keys(args)) delete args[name];
      argsById.set(storyId, args);
      synchronize();
    };
    const observer = new MutationObserver(synchronize);
    observer.observe(element, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["src"],
    });
    const ready = (event: Event) => {
      const frame = (event as CustomEvent<HTMLIFrameElement>).detail;
      if (element.contains(frame)) sendArgs(frame);
    };
    window.addEventListener(DOCS_READY, ready);
    context.channel.on(UPDATE_GLOBALS, updateGlobals);
    context.channel.on(UPDATE_STORY_ARGS, updateArgs);
    context.channel.on(RESET_STORY_ARGS, resetArgs);
    synchronize();
    return () => {
      observer.disconnect();
      window.removeEventListener(DOCS_READY, ready);
      context.channel.off(UPDATE_GLOBALS, updateGlobals);
      context.channel.off(UPDATE_STORY_ARGS, updateArgs);
      context.channel.off(RESET_STORY_ARGS, resetArgs);
    };
  }, [context]);
  return (
    <div ref={root} data-docs-viewport={mobile ? "mobile" : "web"}>
      <DocsContainer context={context} {...props}>
        {children}
      </DocsContainer>
    </div>
  );
}
