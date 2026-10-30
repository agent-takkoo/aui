import { Separator, Stack, Text } from "@heogeon0/aui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  id: "base-separator",
  title: "Base/Separator",
  component: Separator,
  parameters: {
    docs: {
      description: {
        component:
          "내용의 경계를 표시하는 기본 구분선이에요. 굵기와 색은 패키지와 theme의 separator token이 정해요.",
      },
    },
  },
} satisfies Meta<typeof Separator>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  name: "내용 구분",
  render: () => (
    <Stack>
      <Text>첫 번째 내용</Text>
      <Separator />
      <Text>두 번째 내용</Text>
    </Stack>
  ),
};
