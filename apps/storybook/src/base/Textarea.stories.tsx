import { Container, Field, Textarea } from "@heogeon0/aui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Example, ExampleGrid } from "../examples";

const meta = {
  id: "base-textarea",
  title: "Base/Textarea",
  component: Textarea,
  args: { placeholder: "남길 내용을 적어 주세요…", rows: 4 },
  argTypes: {
    rows: { control: { type: "number", min: 2, max: 10 } },
    disabled: { control: "boolean" },
  },
  parameters: {
    docs: {
      description: {
        component:
          "메모와 긴 내용을 입력하는 기본 UI예요. 기본 네 줄이며 네이티브 rows·name·입력 이벤트를 유지해요.",
      },
    },
  },
} satisfies Meta<typeof Textarea>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  name: "여러 줄 입력",
  render: (args) => (
    <Container width="form">
      <Field label="메모">
        <Textarea {...args} name="note" />
      </Field>
    </Container>
  ),
};

export const States: Story = {
  name: "긴 내용과 입력 상태",
  parameters: {
    controls: { disable: true },
    docs: { story: { height: "720px" } },
  },
  render: () => (
    <ExampleGrid>
      <Example title="오류">
        <Field
          label="추가 설명"
          error="개인정보를 제외하고 설명을 다시 작성해 주세요."
        >
          <Textarea
            defaultValue={
              "여러 줄의 내용을 입력하고 수정할 수 있어요.\n내용이 길어지면 입력 영역 안에서 스크롤해요."
            }
          />
        </Field>
      </Example>
      <Example title="읽기 전용">
        <Field label="공유된 안내">
          <Textarea readOnly defaultValue="문구를 선택해서 복사할 수 있어요." />
        </Field>
      </Example>
      <Example title="비활성">
        <Field label="관리자 메모">
          <Textarea disabled placeholder="현재는 수정할 수 없어요." />
        </Field>
      </Example>
    </ExampleGrid>
  ),
};
