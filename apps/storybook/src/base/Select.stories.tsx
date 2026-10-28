import { Select } from "@ai-system/design-system";
import type { Meta, StoryObj } from "@storybook/react-vite";
const meta = {
  title: "Base/Select",
  component: Select,
  args: {
    disabled: false,
    "aria-label": "표시 언어",
    name: "language",
    defaultValue: "ko",
    options: [
      { value: "ko", label: "한국어" },
      { value: "en", label: "English" },
      { value: "ja", label: "日本語", disabled: true },
    ],
  },
} satisfies Meta<typeof Select>;
export default meta;
export const Default: StoryObj<typeof meta> = {};
