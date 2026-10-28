import { Switch } from "@ai-system/design-system";
import type { Meta, StoryObj } from "@storybook/react-vite";
const meta = {
  title: "Base/Switch",
  component: Switch,
  args: {
    disabled: false,
    label: "이메일 알림",
    defaultChecked: true,
  },
} satisfies Meta<typeof Switch>;
export default meta;
export const Default: StoryObj<typeof meta> = {};
