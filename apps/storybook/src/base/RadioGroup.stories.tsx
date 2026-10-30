import { Field, RadioGroup } from "@heogeon0/aui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Example, ExampleGrid } from "../examples";
const meta = {
  title: "Base/RadioGroup",
  component: RadioGroup,
  args: {
    disabled: false,
    "aria-label": "알림 빈도",
    name: "frequency",
    defaultValue: "daily",
    options: [
      { value: "daily", label: "매일" },
      { value: "weekly", label: "매주" },
      { value: "off", label: "받지 않기", disabled: true },
    ],
  },
} satisfies Meta<typeof RadioGroup>;
export default meta;
export const Default: StoryObj<typeof meta> = {};

export const States: StoryObj<typeof meta> = {
  name: "방향과 입력 상태",
  parameters: {
    controls: { disable: true },
    docs: { story: { height: "640px" } },
  },
  render: () => (
    <ExampleGrid>
      <Example title="가로 배치">
        <Field label="수신 주기">
          <RadioGroup
            orientation="horizontal"
            options={meta.args.options}
            defaultValue="daily"
          />
        </Field>
      </Example>
      <Example title="오류">
        <Field
          label="필수 알림 빈도"
          required
          error="알림을 받을 주기를 선택해 주세요."
        >
          <RadioGroup options={meta.args.options} />
        </Field>
      </Example>
      <Example title="비활성">
        <Field label="고정된 알림 빈도">
          <RadioGroup
            options={meta.args.options}
            defaultValue="weekly"
            disabled
          />
        </Field>
      </Example>
    </ExampleGrid>
  ),
};
