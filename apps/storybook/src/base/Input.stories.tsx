import { Container, Field, Input } from "@ai-system/design-system";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  id: "base-input",
  title: "Base/Input",
  component: Input,
  args: { placeholder: "이름을 입력해 주세요…" },
  argTypes: {
    inputSize: { control: "inline-radio", options: ["sm", "md"] },
    disabled: { control: "boolean" },
    placeholder: { control: "text" },
  },
  parameters: {
    docs: {
      description: {
        component:
          "연한 입력면과 포커스 경계를 가진 기본 입력이에요. inputSize는 md 56px, sm 44px이며 터치 기기의 글자는 16px을 유지해요. label과 오류를 묶는 예제는 Component/Form에서 확인해요.",
      },
    },
  },
} satisfies Meta<typeof Input>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "기본 입력",
  render: (args) => (
    <Container width="form">
      <Field label="이름" description="서비스에서 사용할 이름이에요.">
        <Input {...args} name="name" autoComplete="name" />
      </Field>
    </Container>
  ),
};
