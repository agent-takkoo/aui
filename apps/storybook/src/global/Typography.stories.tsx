import { Heading, Stack, Text } from "@ai-system/design-system";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  id: "foundations-typography",
  title: "Global/Typography",
  parameters: {
    docs: {
      description: {
        component:
          "Theme.typography의 역할별 크기·줄 높이·굵기·자간을 사용해요. 기본값은 display 30px, title 20px, heading 17px, body 15px, sub 13px, caption 12px예요. input은 최소 16px, micro는 작은 아바타 글자에 사용해요.",
      },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  name: "글자 위계",
  render: () => (
    <Stack gap="section">
      <Heading level={1} size="display">
        대표 정보는 크게
      </Heading>
      <Heading size="title">화면 제목은 20px</Heading>
      <Heading level={3}>구역 제목은 17px</Heading>
      <Text>본문은 15px로 가장 자주 읽는 정보를 담아요.</Text>
      <Text size="sub" tone="muted">
        보조 설명은 13px로 한 단 물러나요.
      </Text>
      <Text size="caption" tone="muted">
        배지와 작은 메타 정보는 12px예요.
      </Text>
    </Stack>
  ),
};
