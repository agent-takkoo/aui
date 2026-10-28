import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
const require = createRequire(
  new URL("../packages/design-system/package.json", import.meta.url),
);
const { createElement: h } = require("react");
const { renderToString } = require("react-dom/server");
import * as UI from "../packages/design-system/dist/index.js";

test("범용 컴포넌트는 공개 export로 서버 렌더링된다", () => {
  const examples = [
    h(UI.Checkbox, { label: "동의" }),
    h(UI.Switch, { label: "알림" }),
    h(UI.RadioGroup, {
      "aria-label": "보기",
      options: [{ value: "all", label: "전체" }],
    }),
    h(UI.Select, {
      "aria-label": "언어",
      options: [{ value: "ko", label: "한국어" }],
    }),
    h(UI.Slider, { "aria-label": "음량", defaultValue: 30 }),
    h(UI.Toggle, {}, "굵게"),
    h(UI.ToggleGroup, { "aria-label": "서식", options: [] }),
    h(UI.Tabs, {
      label: "설정",
      items: [{ value: "general", label: "일반", content: "내용" }],
    }),
    h(UI.Accordion, {
      items: [{ value: "help", title: "도움말", content: "안내" }],
    }),
    h(UI.Collapsible, { label: "상세" }, "안내"),
    h(UI.Tooltip, { content: "설명", trigger: h(UI.Button, {}, "도움말") }),
    h(UI.ToastProvider, {}, h(UI.Button, {}, "알림")),
    h(UI.Progress, { label: "진행", value: 40 }),
    h(UI.Breadcrumb, { items: [{ label: "문서" }] }),
    h(UI.Pagination, { page: 1, pageCount: 10, onPageChange: () => {} }),
    h(
      UI.Table,
      { caption: "현황" },
      h(UI.TableBody, {}, h(UI.TableRow, {}, h(UI.TableCell, {}, "내용"))),
    ),
    h(UI.ScrollArea, { label: "목록" }, "내용"),
    h(UI.AspectRatio, {}, "이미지"),
  ];
  for (const example of examples)
    assert.ok(
      renderToString(h(UI.ThemeProvider, {}, example)).includes(
        "data-ds-theme",
      ),
    );
});

test("primitive와구식Table속성도 JavaScript 소비코드에서 제거한다", () => {
  const table = renderToString(
    h(
      UI.Table,
      { caption: "표", width: 100, border: 5, cellPadding: 0, bgColor: "red" },
      h(
        UI.TableBody,
        {},
        h(
          UI.TableRow,
          {},
          h(UI.TableCell, { align: "right", width: 100, colSpan: 2 }, "내용"),
        ),
      ),
    ),
  );
  assert.doesNotMatch(table, /width=|border=|cellPadding=|bgColor=|align=/);
  assert.match(table, /colSpan="2"/);
  const checkbox = renderToString(
    h(UI.Checkbox, {
      label: "동의",
      asChild: true,
      style: { color: "red" },
      className: "rogue",
    }),
  );
  assert.match(checkbox, /<button/);
  assert.doesNotMatch(checkbox, /rogue|color:red/);
});
