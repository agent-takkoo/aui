import {
  BottomBar,
  BottomBarSpace,
  Button,
  Container,
  Heading,
  Stack,
  Text,
} from "@ai-system/design-system";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  id: "layout-bottom-bar",
  title: "Layout/BottomBar",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "화면 아래에 붙는 주 행동 자리예요. 안전 영역(홈 인디케이터)만큼 여백을 두고 위쪽은 배경색으로 흐려져 본문이 아래로 지나가요. 본문 끝에 BottomBarSpace를 두어 마지막 내용이 가려지지 않게 해요. width는 Container와 같은 폭을 써요.",
      },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "하단 행동 바",
  render: () => (
    <Container width="content">
      <Stack gap="section">
        <Heading level={1} size="title">
          어디서 내리나
        </Heading>
        {Array.from({ length: 12 }, (_, index) => (
          <Text key={index}>
            본문 {index + 1}. 아래로 내려도 하단 버튼은 제자리에 있어요.
          </Text>
        ))}
        <BottomBarSpace />
      </Stack>
      <BottomBar width="content">
        <Button size="lg" fullWidth>
          이수역 · 1정거장 전 깨우기
        </Button>
      </BottomBar>
    </Container>
  ),
};
