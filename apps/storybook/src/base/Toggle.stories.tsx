import { Toggle } from "@ai-system/design-system";
import type { Meta, StoryObj } from "@storybook/react-vite";
const meta = {
  title: "Base/Toggle",
  component: Toggle,
  args: {
    disabled: false,
    children: "굵게",
    "aria-label": "굵게",
    defaultPressed: false,
  },
} satisfies Meta<typeof Toggle>;
export default meta;
export const Default: StoryObj<typeof meta> = {};
