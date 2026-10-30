import { useState } from "react";
import {
  Button,
  ButtonLink,
  Inline,
  Select,
  Stack,
  Text,
  ThemeProvider,
} from "@heogeon0/aui";
import { Unstyled } from "@storybook/addon-docs/blocks";
import storyMap from "../../../packages/design-system/ai/llms/story-map.json";

const pages: Record<string, string[]> = storyMap;

async function readDocument(path: string) {
  const response = await fetch(path);
  if (!response.ok)
    throw new Error(`문서를 불러오지 못했어요 (${response.status}).`);
  const text = await response.text();
  if (!text.startsWith("# ")) throw new Error("문서 형식을 확인해 주세요.");
  return text;
}

function Actions({ names }: { names: string[] }) {
  const [name, setName] = useState(names[0]);
  const [status, setStatus] = useState("");
  const [copying, setCopying] = useState(false);
  const path = `./llms/${name}.md`;
  async function copy() {
    setCopying(true);
    setStatus("");
    try {
      const content = Promise.all([
        readDocument("./llms/guide.md"),
        readDocument(path),
      ]).then((parts) => parts.join("\n\n---\n\n"));
      if (typeof ClipboardItem !== "undefined" && navigator.clipboard?.write) {
        await navigator.clipboard.write([
          new ClipboardItem({
            "text/plain": content.then(
              (text) => new Blob([text], { type: "text/plain" }),
            ),
          }),
        ]);
      } else {
        await navigator.clipboard.writeText(await content);
      }
      setStatus("복사했어요.");
    } catch {
      setStatus("복사하지 못했어요. 원문을 열어 복사해 주세요.");
    } finally {
      setCopying(false);
    }
  }
  return (
    <Unstyled>
      <details className="docs-llm-actions">
        <summary>AI 문서</summary>
        <ThemeProvider>
          <Stack gap="xs">
            <Inline>
              {names.length > 1 ? (
                <Select
                  aria-label="문서의 API"
                  inputSize="sm"
                  value={name}
                  onValueChange={(next) => {
                    setName(next);
                    setStatus("");
                  }}
                  options={names.map((value) => ({ value, label: value }))}
                />
              ) : (
                <Text size="sub">{name}</Text>
              )}
              <Button
                size="sm"
                variant="secondary"
                loading={copying}
                onClick={copy}
              >
                복사
              </Button>
              <ButtonLink
                size="sm"
                variant="quiet"
                href={path}
                target="_blank"
                rel="noreferrer"
              >
                원문
              </ButtonLink>
              <ButtonLink
                size="sm"
                variant="quiet"
                href="./llms.txt"
                target="_blank"
                rel="noreferrer"
              >
                전체 목록
              </ButtonLink>
            </Inline>
            <Text size="caption" role="status">
              {status}
            </Text>
          </Stack>
        </ThemeProvider>
      </details>
    </Unstyled>
  );
}

export function LLMActions({ title }: { title: string }) {
  const names = pages[title];
  return names ? <Actions key={title} names={names} /> : null;
}
