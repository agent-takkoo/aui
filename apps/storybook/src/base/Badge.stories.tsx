import { Badge } from "@ai-system/design-system";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  id: "base-badge",
  title: "Base/Badge",
  component: Badge,
  args: { children: "상태", variant: "primary" },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["primary", "secondary", "outline", "destructive"],
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "짧은 상태와 메타 정보를 표시하는 작은 UI예요. 역할에 맞는 네 가지 variant를 제공해요.",
      },
    },
  },
} satisfies Meta<typeof Badge>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { name: "기본" };
