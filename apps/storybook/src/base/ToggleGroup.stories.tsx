import { ToggleGroup } from "@ai-system/design-system";
import type { Meta, StoryObj } from "@storybook/react-vite";
const meta = {
  title: "Base/ToggleGroup",
  component: ToggleGroup,
  args: {
    disabled: false,
    "aria-label": "글자 서식",
    type: "multiple",
    defaultValue: ["bold"],
    options: [
      { value: "bold", label: "굵게" },
      { value: "italic", label: "기울임" },
      { value: "underline", label: "밑줄" },
    ],
  },
} satisfies Meta<typeof ToggleGroup>;
export default meta;
export const Default: StoryObj<typeof meta> = {};
