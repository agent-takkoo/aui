import { Progress } from "@ai-system/design-system";
import type { Meta, StoryObj } from "@storybook/react-vite";
const meta = {
  title: "Base/Progress",
  component: Progress,
  args: { label: "업로드 진행률", value: 45 },
} satisfies Meta<typeof Progress>;
export default meta;
export const Default: StoryObj<typeof meta> = {};
