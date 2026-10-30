import { Progress } from "@heogeon0/aui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Example, ExampleGrid } from "../examples";
const meta = {
  title: "Base/Progress",
  component: Progress,
  args: { label: "업로드 진행률", value: 45 },
} satisfies Meta<typeof Progress>;
export default meta;
export const Default: StoryObj<typeof meta> = {};

export const States: StoryObj<typeof meta> = {
  name: "시작·진행·완료·대기",
  parameters: { controls: { disable: true } },
  render: () => (
    <ExampleGrid>
      <Example title="시작 · 0%">
        <Progress label="업로드 시작" value={0} />
      </Example>
      <Example title="진행 · 45%">
        <Progress label="업로드 중" value={45} />
      </Example>
      <Example title="완료 · 100%">
        <Progress label="업로드 완료" value={100} />
      </Example>
      <Example
        title="진행량을 모를 때"
        description="서버에서 응답을 기다리고 있어요."
      >
        <Progress label="응답 대기" />
      </Example>
    </ExampleGrid>
  ),
};
