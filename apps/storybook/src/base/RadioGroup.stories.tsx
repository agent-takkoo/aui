import { RadioGroup } from "@ai-system/design-system";
import type { Meta, StoryObj } from "@storybook/react-vite";
const meta = {
  title: "Base/RadioGroup",
  component: RadioGroup,
  args: {
    disabled: false,
    "aria-label": "알림 빈도",
    name: "frequency",
    defaultValue: "daily",
    options: [
      { value: "daily", label: "매일" },
      { value: "weekly", label: "매주" },
      { value: "off", label: "받지 않기", disabled: true },
    ],
  },
} satisfies Meta<typeof RadioGroup>;
export default meta;
export const Default: StoryObj<typeof meta> = {};
