import { Button, ChipGroup, Field, Inline, Stack, Text } from "@heogeon0/aui";
import type { ChipGroupProps } from "@heogeon0/aui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

const meta = {
  id: "components-chip-group",
  title: "Component/ChipGroup",
  component: ChipGroup,
  args: {
    name: "visibility",
    defaultValue: "all",
    disabled: false,
    required: false,
    options: [
      { value: "all", label: "전체 문서" },
      { value: "mine", label: "내가 작성한 문서" },
      { value: "shared", label: "공유받은 문서" },
      { value: "archived", label: "보관한 문서", disabled: true },
      { value: "recent", label: "최근 수정한 문서" },
    ],
  },
  argTypes: {
    disabled: { control: "boolean" },
    required: { control: "boolean" },
  },
  parameters: {
    docs: {
      description: {
        component:
          "줄바꿈되는 칩에서 하나를 골라요. RadioGroup과 같은 값·폼·키보드 동작을 제공하며 Field로 이름과 오류를 연결해요.",
      },
    },
  },
} satisfies Meta<typeof ChipGroup>;
export default meta;
type Story = StoryObj<typeof meta>;

function Form(args: ChipGroupProps) {
  const [result, setResult] = useState("선택 후 적용해 주세요.");
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setResult(
          `제출: ${new FormData(event.currentTarget).get("visibility") ?? "없음"}`,
        );
      }}
      onReset={() => setResult("초기화했어요.")}
    >
      <Stack>
        <Field
          label="표시 범위"
          description="목록에 표시할 문서를 골라요."
          required={args.required}
        >
          <ChipGroup {...args} />
        </Field>
        <Inline>
          <Button type="submit">적용</Button>
          <Button type="reset" variant="secondary">
            초기화
          </Button>
        </Inline>
        <Text role="status">{result}</Text>
      </Stack>
    </form>
  );
}
export const Default: Story = {
  name: "선택과 폼 제출",
  render: (args) => <Form {...args} />,
};
export const Required: Story = {
  name: "필수 선택",
  args: { defaultValue: undefined, required: true },
  render: (args) => <Form {...args} />,
};
export const Disabled: Story = {
  name: "비활성",
  args: { disabled: true },
  render: (args) => <Form {...args} />,
};
