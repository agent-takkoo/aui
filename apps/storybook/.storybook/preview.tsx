import type { Preview } from "@storybook/react-vite";
import {
  ThemeProvider,
  defaultTheme,
  creamTheme,
} from "@ai-system/design-system";
import "@ai-system/design-system/styles.css";
import "pretendard/dist/web/variable/pretendardvariable.css";
import "../src/docs.css";
import { ResponsiveDocs } from "./ResponsiveDocs";
import { DocsPreview } from "./DocsPreview";

const preview: Preview = {
  decorators: [
    (Story, context) => (
      <DocsPreview>
        {(args, globals) => (
          <ThemeProvider
            theme={
              (globals.brand ?? context.globals.brand) === "cream"
                ? creamTheme
                : defaultTheme
            }
            mode={
              (globals.mode ?? context.globals.mode) === "dark"
                ? "dark"
                : "light"
            }
          >
            <div
              className={
                context.parameters.layout === "fullscreen"
                  ? "docs-fullscreen"
                  : "docs-canvas"
              }
            >
              <Story args={{ ...context.args, ...args }} />
            </div>
          </ThemeProvider>
        )}
      </DocsPreview>
    ),
  ],
  globalTypes: {
    viewport: {
      description: "미리보기 화면 크기",
      toolbar: {
        title: "화면",
        icon: "browser",
        items: [
          { value: "web", title: "웹 버전" },
          { value: "mobile", title: "모바일 버전" },
        ],
        dynamicTitle: true,
      },
    },
    brand: {
      description: "프로젝트 theme",
      toolbar: {
        title: "Theme",
        icon: "paintbrush",
        items: [
          { value: "default", title: "기본 theme" },
          { value: "cream", title: "크림 theme" },
        ],
        dynamicTitle: true,
      },
    },
    mode: {
      description: "색상 모드",
      toolbar: {
        title: "모드",
        icon: "circlehollow",
        items: [
          { value: "light", title: "라이트" },
          { value: "dark", title: "다크" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    brand: "default",
    mode: "light",
    viewport: "web",
  },
  tags: ["autodocs"],
  parameters: {
    docs: {
      container: ResponsiveDocs,
      story: { inline: false, height: "420px" },
    },
    viewport: {
      options: {
        web: {
          name: "웹 버전",
          styles: { width: "100%", height: "100%" },
          type: "desktop",
        },
        mobile: {
          name: "모바일 버전",
          styles: { width: "390px", height: "844px" },
          type: "mobile",
        },
      },
    },
    layout: "fullscreen",
    controls: { expanded: true },
    a11y: { test: "error" },
    options: {
      storySort: {
        order: [
          "Global",
          ["Theme", "Typography", "Spacing"],
          "Base",
          [
            "Button",
            "Input",
            "Textarea",
            "Label",
            "Checkbox",
            "Switch",
            "RadioGroup",
            "Select",
            "Slider",
            "Toggle",
            "ToggleGroup",
            "Badge",
            "Avatar",
            "Icon",
            "Separator",
            "Skeleton",
            "Progress",
          ],
          "Component",
          [
            "Form",
            "Card",
            "Callout",
            "LinkRow",
            "Selection",
            "Tabs",
            "Accordion",
            "Collapsible",
            "Table",
            "Breadcrumb",
            "Pagination",
            "Feedback",
            "Modal",
            "ConfirmDialog",
            "DropdownMenu",
            "Popover",
            "Tooltip",
            "Toast",
          ],
          "Layout",
          ["Drawer", "Panel", "Sidebar", "ScrollArea", "AspectRatio"],
        ],
      },
    },
  },
};
export default preview;
