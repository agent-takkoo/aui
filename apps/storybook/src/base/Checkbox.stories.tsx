import { Checkbox, Field, Stack } from "@heogeon0/aui";
import type { Meta, StoryObj } from "@storybook/react-vite";
const meta = {
  title: "Base/Checkbox",
  component: Checkbox,
  args: {
    disabled: false,
    label: "사용 약관에 동의해요",
    defaultChecked: false,
  },
} satisfies Meta<typeof Checkbox>;
export default meta;
export const Default: StoryObj<typeof meta> = {};
export const States: StoryObj<typeof meta> = {
  name: "선택 상태와 오류",
  parameters: { controls: { disable: true } },
  render: () => (
    <Stack>
      <Checkbox label="선택하지 않은 항목" />
      <Checkbox label="선택한 항목" defaultChecked />
      <Checkbox label="일부 항목 선택" defaultChecked="indeterminate" />
      <Checkbox label="변경할 수 없는 선택" defaultChecked disabled />
      <Field
        label="이용 조건 동의"
        required
        error="계속하려면 이용 조건을 확인해 주세요."
      >
        <Checkbox name="terms" />
      </Field>
    </Stack>
  ),
};
