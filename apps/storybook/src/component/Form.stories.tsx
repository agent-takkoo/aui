import {
  Button,
  Container,
  Field,
  Input,
  Stack,
  Text,
  Textarea,
} from "@ai-system/design-system";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { FormEvent } from "react";
import { useRef, useState } from "react";

const meta = {
  id: "components-form",
  title: "Component/Form",
  parameters: {
    docs: {
      description: {
        component:
          "Base의 입력과 버튼을 조합해 라벨·설명·오류·저장 상태를 연결하는 폼이에요. Input 자체의 크기와 상태는 Base/Input에서 확인해요.",
      },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
function FormDemo() {
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [savedCount, setSavedCount] = useState(0);
  const nameRef = useRef<HTMLInputElement>(null);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    if (name.trim().length < 2) {
      setError("이름을 두 글자 이상 입력해 주세요.");
      nameRef.current?.focus();
      return;
    }
    setError("");
    setPending(true);
    await new Promise((resolve) => setTimeout(resolve, 400));
    setSavedCount((count) => count + 1);
    setPending(false);
  }
  return (
    <Container width="form">
      <form
        noValidate
        onSubmit={(event) => {
          void submit(event);
        }}
      >
        <Stack gap="section">
          <Field
            label="이름"
            description="두 글자 이상 입력해 주세요."
            required
            error={error}
          >
            <Input
              ref={nameRef}
              name="name"
              autoComplete="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              disabled={pending}
            />
          </Field>
          <Field label="메모">
            <Textarea
              name="note"
              value={note}
              onChange={(event) => setNote(event.target.value)}
              disabled={pending}
            />
          </Field>
          <Button type="submit" loading={pending} fullWidth>
            {pending ? "저장 중…" : "저장"}
          </Button>
          {savedCount > 0 ? (
            <Text role="status">
              {name.trim()} 저장 완료 · {savedCount}회
            </Text>
          ) : null}
        </Stack>
      </form>
    </Container>
  );
}
export const Validation: Story = {
  name: "검증과 저장",
  render: () => <FormDemo />,
};
