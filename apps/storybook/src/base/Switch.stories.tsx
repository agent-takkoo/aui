import { Switch, Field, Stack } from "@heogeon0/aui";
import type { Meta, StoryObj } from "@storybook/react-vite";
const meta = {
  title: "Base/Switch",
  component: Switch,
  args: {
    disabled: false,
    label: "이메일 알림",
    defaultChecked: true,
  },
} satisfies Meta<typeof Switch>;
export default meta;
export const Default: StoryObj<typeof meta> = {};
export const States: StoryObj<typeof meta> = {
  name: "켜짐·꺼짐·비활성",
  parameters: { controls: { disable: true } },
  render: () => (
    <Stack>
      <Switch label="꺼진 알림" />
      <Switch label="켜진 알림" defaultChecked />
      <Switch label="관리자가 고정한 설정" defaultChecked disabled />
      <Field label="외부 공유" error="관리자에게 공유 권한을 요청해 주세요.">
        <Switch />
      </Field>
    </Stack>
  ),
};
