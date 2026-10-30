import {
  ActionBar,
  Button,
  Container,
  Field,
  Input,
  PageHeader,
  Stack,
  Text,
  Textarea,
} from "@heogeon0/aui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

const meta = {
  id: "layout-action-bar",
  title: "Layout/ActionBar",
  component: ActionBar,
  args: { children: null, justify: "end", sticky: true },
  argTypes: {
    justify: {
      control: "inline-radio",
      options: ["start", "end", "between", "stretch"],
    },
    sticky: { control: "boolean" },
  },
  parameters: {
    docs: {
      description: {
        component:
          "폼이나 화면 하단에 저장·취소를 고정 배치해요. 기본은 sticky이고 safe area 여백을 포함해요. 좁은 화면에서는 버튼이 가로를 채워요.",
      },
    },
  },
} satisfies Meta<typeof ActionBar>;
export default meta;
type Story = StoryObj<typeof meta>;

function LongForm({
  justify,
  sticky,
}: {
  justify: ActionBarProps["justify"];
  sticky: boolean;
}) {
  const [saved, setSaved] = useState(0);
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setSaved((count) => count + 1);
      }}
    >
      <Container width="form">
        <Stack gap="section">
          <PageHeader title="프로필 수정" level={2} />
          <Field label="이름" required>
            <Input name="name" autoComplete="name" />
          </Field>
          <Field label="소개">
            <Textarea name="bio" rows={8} />
          </Field>
          <Field label="웹사이트">
            <Input name="website" type="url" />
          </Field>
          <Field label="연락처">
            <Input name="phone" type="tel" />
          </Field>
          {saved > 0 ? <Text role="status">저장 {saved}회</Text> : null}
        </Stack>
      </Container>
      <ActionBar label="저장" justify={justify} sticky={sticky}>
        <Button variant="ghost" type="reset">
          취소
        </Button>
        <Button type="submit">변경 사항 저장</Button>
      </ActionBar>
    </form>
  );
}
type ActionBarProps = Parameters<typeof ActionBar>[0];

export const Default: Story = {
  name: "긴 폼과 고정 바",
  render: (args) => (
    <LongForm justify={args.justify} sticky={args.sticky ?? true} />
  ),
};
