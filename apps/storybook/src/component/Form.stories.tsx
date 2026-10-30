import {
  Button,
  Checkbox,
  Container,
  Field,
  Inline,
  Input,
  RadioGroup,
  Select,
  Stack,
  Text,
  Textarea,
} from "@heogeon0/aui";
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

function PreferencesForm() {
  const [result, setResult] = useState("");
  return (
    <Container width="form">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const data = new FormData(event.currentTarget);
          setResult(
            `${data.get("workspace")} · ${data.get("language") === "ko" ? "한국어" : "English"} · ${data.get("visibility") === "team" ? "팀에 공개" : "나만 보기"} · 이메일 ${data.has("email") ? "받기" : "받지 않기"}로 저장했어요.`,
          );
        }}
        onReset={() =>
          setResult("기본 설정으로 되돌렸어요. 저장을 누르면 적용해요.")
        }
      >
        <Stack gap="section">
          <Field label="공간 이름" required>
            <Input name="workspace" defaultValue="작업 공간" />
          </Field>
          <Field label="표시 언어" required>
            <Select
              name="language"
              defaultValue="ko"
              options={[
                { value: "ko", label: "한국어" },
                { value: "en", label: "English" },
              ]}
            />
          </Field>
          <Field
            label="공유 범위"
            description="새로 만드는 문서의 기본 공개 범위예요."
          >
            <RadioGroup
              name="visibility"
              defaultValue="self"
              options={[
                { value: "self", label: "나만 보기" },
                { value: "team", label: "팀에 공개" },
              ]}
            />
          </Field>
          <Checkbox
            name="email"
            label="활동 요약을 이메일로 받기"
            defaultChecked
          />
          <Inline>
            <Button type="submit">설정 저장</Button>
            <Button type="reset" variant="secondary">
              기본값으로 되돌리기
            </Button>
          </Inline>
          {result && <Text role="status">{result}</Text>}
        </Stack>
      </form>
    </Container>
  );
}
export const Preferences: Story = {
  name: "여러 입력을 쓰는 설정 폼",
  parameters: { docs: { story: { height: "720px" } } },
  render: () => <PreferencesForm />,
};
