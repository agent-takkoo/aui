import { Avatar, Inline, Stack, Text } from "@heogeon0/aui";
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

export const Sizes: Story = {
  name: "크기와 이름 표시",
  parameters: { controls: { disable: true } },
  render: () => (
    <Inline align="end" gap="section">
      {(["xs", "sm", "md"] as const).map((size, index) => (
        <Stack gap="xs" key={size}>
          <Avatar name="지수" size={size} toneIndex={index} />
          <Text size="caption" tone="muted">
            {size}
          </Text>
        </Stack>
      ))}
    </Inline>
  ),
};
