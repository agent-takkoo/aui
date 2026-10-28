import { Checkbox } from "@ai-system/design-system";
import type { Meta, StoryObj } from "@storybook/react-vite";
const meta = {
  title: "Base/Checkbox",
  component: Checkbox,
  args: {
    disabled: false,
    label: "사용 약관에 동의해요",
    defaultChecked: false,
  },
} satisfies Meta<typeof Checkbox>;
export default meta;
export const Default: StoryObj<typeof meta> = {};
