import { Container, Stat, StatGrid } from "@ai-system/design-system";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  id: "components-stat",
  title: "Component/Stat",
  component: Stat,
  args: {
    label: "목적지까지",
    value: "1,235 m",
    tone: "default",
  },
  argTypes: {
    tone: { control: "inline-radio", options: ["default", "primary"] },
  },
  parameters: {
    docs: {
      description: {
        component:
          "라벨 하나와 값 하나를 담는 작은 면이에요. 진행 화면의 현재 상태처럼 숫자 몇 개를 나란히 보여줄 때 StatGrid로 2·3열에 놓아요. 값이 길면 줄이지 않고 말줄임해요.",
      },
    },
  },
} satisfies Meta<typeof Stat>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { name: "수치 타일" };

export const Grid: Story = {
  name: "2열 그리드",
  render: () => (
    <Container width="form">
      <StatGrid>
        <Stat label="노선" value="540 군포공영차고지 → 고속터미널" />
        <Stat label="가장 가까운 정류장" value="남태령역" />
        <Stat label="목적지까지" value="1,235 m" tone="primary" />
        <Stat label="위치 추적" value="촘촘히 (GPS)" hint="초 단위" />
      </StatGrid>
    </Container>
  ),
};
