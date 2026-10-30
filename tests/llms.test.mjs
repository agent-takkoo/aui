import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import * as UI from "../packages/design-system/dist/index.js";

const root = new URL("../packages/design-system/ai/", import.meta.url);
const read = (name) => readFile(new URL(name, root), "utf8");

test("공개 API마다 읽을 수 있는 LLM 문서와 예제가 있다", async () => {
  const index = await read("llms.txt");
  const full = await read("llms-full.txt");
  for (const name of Object.keys(UI)) {
    const document = await read(`llms/${name}.md`);
    assert.ok(index.includes(`./llms/${name}.md`), name);
    assert.ok(document.startsWith(`# ${name}\n`), name);
    assert.match(document, /## 예제\n\n```tsx/);
    assert.ok(full.includes(`### ${name}\n`), name);
    assert.doesNotMatch(document, /\| `(className|style|asChild|color)` \|/);
  }
});

test("false·0 기본값과 union의 선택 조건을 보존한다", async () => {
  const button = await read("llms/Button.md");
  const avatar = await read("llms/Avatar.md");
  const slider = await read("llms/Slider.md");
  const group = await read("llms/ToggleGroup.md");
  assert.match(button, /\| `loading` \|.*`false`/);
  assert.match(avatar, /\| `toneIndex` \| `number` \|/);
  assert.match(await read("llms/Grid.md"), /\| `columns` \|.*`2`/);
  assert.match(slider, /\| `min` \|.*`0`/);
  assert.match(group, /single.*string.*multiple.*string\[\]/);
  assert.match(group, /export type ChoiceOption/);
});

test("예제의 로컬 의존성과 공개하지 않은 Story 제목을 구분한다", async () => {
  const toast = await read("llms/useToast.md");
  const map = JSON.parse(await read("llms/story-map.json"));
  assert.match(toast, /function NoticeButton\(\)/);
  assert.match(toast, /import \{.*useToast.*\} from "@heogeon0\/aui"/);
  assert.deepEqual(map["Component/Modal"], ["Dialog"]);
  assert.deepEqual(map["Component/Form"], ["Field", "Label"]);
});
