"use client";

import { useLayoutEffect } from "react";
import type { RefObject } from "react";
import type { ColorMode } from "../theme/tokens.js";

type DocumentColors = { background: string; mode: ColorMode };
type DocumentThemes = {
  entries: Map<symbol, DocumentColors>;
  restore: () => void;
};
const documents = new WeakMap<Document, DocumentThemes>();

// 서로 다른 React root가 같은 문서를 쓰더라도, 마지막 provider가 사라진 뒤에만
// 원래 스타일로 돌아간다. Popup과 중첩 provider는 opt-in하지 않으면 영향이 없다.
function applyDocumentTheme(doc: Document, colors: DocumentColors) {
  const elements = [doc.documentElement, doc.body];
  let themes = documents.get(doc);
  if (!themes) {
    const previous = elements.flatMap((element) =>
      ["background-color", "color-scheme"].map((property) => ({
        element,
        property,
        value: element.style.getPropertyValue(property),
        priority: element.style.getPropertyPriority(property),
      })),
    );
    themes = {
      entries: new Map(),
      restore: () => {
        for (const { element, property, value, priority } of previous) {
          if (value) element.style.setProperty(property, value, priority);
          else element.style.removeProperty(property);
        }
      },
    };
    documents.set(doc, themes);
  }
  const state = themes;
  const key = Symbol();
  const paint = ({ background, mode }: DocumentColors) => {
    for (const element of elements) {
      element.style.setProperty("background-color", background);
      element.style.setProperty("color-scheme", mode);
    }
  };
  state.entries.set(key, colors);
  paint(colors);
  return () => {
    state.entries.delete(key);
    const latest = [...state.entries.values()].at(-1);
    if (latest) paint(latest);
    else {
      state.restore();
      documents.delete(doc);
    }
  };
}

export function useDocumentTheme(
  root: RefObject<HTMLDivElement | null>,
  enabled: boolean,
  mode: ColorMode,
  themeKey: string,
) {
  useLayoutEffect(() => {
    const element = root.current;
    if (!enabled || !element) return;
    const doc = element.ownerDocument;
    const background =
      doc.defaultView!.getComputedStyle(element).backgroundColor;
    return applyDocumentTheme(doc, { background, mode });
  }, [root, enabled, mode, themeKey]);
}
