import { Container, Field, Textarea } from "@ai-system/design-system";
import type { Meta, StoryObj } from "@storybook/react-vite";

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
