import { Avatar } from "@ai-system/design-system";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  id: "base-avatar",
  title: "Base/Avatar",
  component: Avatar,
  args: { name: "지수", size: "md", toneIndex: 0 },
  argTypes: {
    size: { control: "inline-radio", options: ["xs", "sm", "md"] },
    toneIndex: { control: { type: "number", min: 0, max: 3 } },
  },
  parameters: {
    docs: {
      description: {
        component:
          "사진이나 이름의 첫 글자로 사용자를 표시해요. 사진을 가져오지 못하면 첫 글자를 보여줘요. 색은 theme의 avatar1~4와 avatarForeground를 사용해요.",
      },
    },
  },
} satisfies Meta<typeof Avatar>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { name: "기본" };
