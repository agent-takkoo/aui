import { Container, Field, Input } from "@heogeon0/aui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Example, ExampleGrid } from "../examples";

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

export const Sizes: Story = {
  name: "입력 크기",
  parameters: { controls: { disable: true } },
  render: () => (
    <ExampleGrid>
      <Example title="md · 56px">
        <Field label="이름">
          <Input placeholder="기본 입력" />
        </Field>
      </Example>
      <Example title="sm · 44px">
        <Field label="검색">
          <Input inputSize="sm" placeholder="작은 입력" />
        </Field>
      </Example>
    </ExampleGrid>
  ),
};

export const States: Story = {
  name: "오류·필수·비활성·읽기 전용",
  parameters: {
    controls: { disable: true },
    docs: { story: { height: "720px" } },
  },
  render: () => (
    <ExampleGrid>
      <Example title="필수와 설명">
        <Field
          label="이메일"
          required
          description="변경한 설정을 안내할 주소예요."
        >
          <Input
            type="email"
            autoComplete="email"
            placeholder="name@example.com"
          />
        </Field>
      </Example>
      <Example title="오류">
        <Field
          label="프로젝트 이름"
          error="다른 사람이 구분할 수 있도록 두 글자 이상의 이름을 입력해 주세요."
        >
          <Input defaultValue="A" aria-invalid />
        </Field>
      </Example>
      <Example title="비활성">
        <Field label="사용할 수 없는 이름">
          <Input disabled defaultValue="관리자 설정" />
        </Field>
      </Example>
      <Example title="읽기 전용">
        <Field
          label="복사할 수 있는 이름"
          description="텍스트 선택과 복사는 가능해요."
        >
          <Input readOnly defaultValue="공유 프로젝트" />
        </Field>
      </Example>
    </ExampleGrid>
  ),
};
