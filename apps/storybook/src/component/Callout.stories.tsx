import { Callout } from "@ai-system/design-system";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  id: "components-callout",
  title: "Component/Callout",
  component: Callout,
  args: { title: "확인할 항목이 2개 있어요.", tone: "action" },
  argTypes: {
    tone: { control: "inline-radio", options: ["action", "danger"] },
  },
  parameters: {
    docs: {
      description: {
        component:
          "제목·설명·행동을 묶는 알림 띠예요. 행동과 오류의 표면을 구분하고 안쪽 버튼의 hover 색도 함께 조정해요.",
      },
    },
  },
} satisfies Meta<typeof Callout>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { name: "기본" };
