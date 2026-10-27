import type { IconName } from "@ai-system/design-system";
import { Icon, Inline, Text } from "@ai-system/design-system";
import type { Meta, StoryObj } from "@storybook/react-vite";

const names = [
  "plus",
  "close",
  "back",
  "search",
  "check",
  "menu",
  "trash",
  "more",
] satisfies IconName[];
const meta = {
  id: "base-icon",
  title: "Base/Icon",
  component: Icon,
  args: { name: "plus" },
  argTypes: { name: { control: "select", options: names } },
  parameters: {
    docs: {
      description: {
        component:
          "공통 동작을 나타내는 장식 아이콘이에요. 아이콘만 누르는 버튼은 접근 가능한 label이 필수인 IconButton을 사용해요.",
      },
    },
  },
} satisfies Meta<typeof Icon>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  name: "기본",
  render: (args) => (
    <Inline>
      <Icon {...args} />
      <Text>{args.name}</Text>
    </Inline>
  ),
};
