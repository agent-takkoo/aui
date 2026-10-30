import { Select, Field, Button, Dialog } from "@heogeon0/aui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Example, ExampleGrid } from "../examples";
const meta = {
  title: "Base/Select",
  component: Select,
  parameters: {
    docs: {
      description: {
        component:
          "웹은 드롭다운, 768px 미만의 모바일 화면은 하단 Drawer에서 선택해요. 항목을 고르면 바로 적용하고 닫혀요. Drawer 제목은 Field label이나 aria-label을 사용하며 selectionTitle로 바꿀 수 있어요.",
      },
    },
  },
  argTypes: { inputSize: { control: "inline-radio", options: ["sm", "md"] } },
  args: {
    disabled: false,
    "aria-label": "표시 언어",
    name: "language",
    defaultValue: "ko",
    options: [
      { value: "ko", label: "한국어" },
      { value: "en", label: "English" },
      { value: "ja", label: "日本語", disabled: true },
    ],
  },
} satisfies Meta<typeof Select>;
export default meta;
export const Default: StoryObj<typeof meta> = {
  render: (args) => (
    <Field label="표시 언어" description="메뉴에 사용할 언어를 선택해 주세요.">
      <Select {...args} />
    </Field>
  ),
};
export const States: StoryObj<typeof meta> = {
  name: "크기·오류·긴 선택지",
  parameters: {
    controls: { disable: true },
    docs: { story: { height: "720px" } },
  },
  render: () => (
    <ExampleGrid>
      <Example title="md · 56px">
        <Field label="기본 언어">
          <Select options={meta.args.options} />
        </Field>
      </Example>
      <Example title="sm · 44px">
        <Field label="작은 언어 선택">
          <Select
            inputSize="sm"
            options={meta.args.options}
            defaultValue="ko"
          />
        </Field>
      </Example>
      <Example title="오류">
        <Field label="필수 언어" required error="사용할 언어를 선택해 주세요.">
          <Select options={meta.args.options} />
        </Field>
      </Example>
      <Example title="비활성">
        <Field label="고정된 언어">
          <Select options={meta.args.options} defaultValue="ko" disabled />
        </Field>
      </Example>
      <Example title="긴 선택지">
        <Field label="공유 범위">
          <Select
            defaultValue="team"
            options={[
              {
                value: "team",
                label: "프로젝트에 참여한 모든 구성원과 초대받은 외부 협력자",
              },
              { value: "self", label: "나만 보기" },
            ]}
          />
        </Field>
      </Example>
    </ExampleGrid>
  ),
};
export const InDialog: StoryObj<typeof meta> = {
  name: "팝업 안에서 선택",
  parameters: { controls: { disable: true } },
  render: () => (
    <Dialog title="공유 설정" trigger={<Button>공유 설정 열기</Button>}>
      <Field label="공유할 프로젝트">
        <Select
          defaultValue="project-1"
          options={Array.from({ length: 20 }, (_, index) => ({
            value: `project-${index + 1}`,
            label: `프로젝트 ${index + 1}`,
            disabled: index === 2,
          }))}
        />
      </Field>
    </Dialog>
  ),
};
