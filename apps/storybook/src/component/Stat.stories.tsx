import { Grid, Stat } from "@heogeon0/aui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  id: "components-stat",
  title: "Component/Stat",
  component: Stat,
  args: { label: "등록한 문서", value: "24", hint: "이번 달 기준" },
  parameters: {
    docs: {
      description: {
        component:
          "라벨·값·보조 설명을 표시해요. 여러 타일은 Grid로 배치하고, 값의 계산과 업무 의미는 소비 코드에서 정해요.",
      },
    },
  },
} satisfies Meta<typeof Stat>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { name: "기본" };
export const GridLayout: Story = {
  name: "두 열과 긴 값",
  render: (args) => (
    <Grid columns={2} collapseBelow="none">
      <Stat {...args} />
      <Stat
        label="저장 공간 사용량"
        value="123,456,789 MB"
        hint="긴 값도 타일 안에서 줄바꿈해요."
      />
    </Grid>
  ),
};
