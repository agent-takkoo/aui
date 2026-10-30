import { Button, Dialog, Field, Input, Stack, Text } from "@heogeon0/aui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useId, useRef, useState } from "react";

const meta = {
  id: "component-modal",
  title: "Component/Modal",
  parameters: {
    docs: {
      description: {
        component:
          "Modal의 독립적인 사용 예제예요. 포커스와 키보드 동작은 내부 primitive가 관리해요.",
      },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
function NameDialog({ longContent = false }: { longContent?: boolean }) {
  const formId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [saved, setSaved] = useState("우리의 공간");
  const [draft, setDraft] = useState(saved);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  function changeOpen(next: boolean) {
    if (next) {
      setDraft(saved);
      setError("");
    }
    setOpen(next);
  }
  return (
    <Stack>
      <Text>현재 이름: {saved}</Text>
      <Dialog
        open={open}
        onOpenChange={changeOpen}
        title="이름 바꾸기"
        description="변경한 이름은 함께 쓰는 사람에게도 보여요."
        trigger={<Button>팝업 열기</Button>}
        footer={
          <>
            <Button variant="secondary" onClick={() => changeOpen(false)}>
              취소
            </Button>
            <Button type="submit" form={formId}>
              변경 사항 저장
            </Button>
          </>
        }
      >
        <form
          id={formId}
          noValidate
          onSubmit={(event) => {
            event.preventDefault();
            if (draft.trim().length < 2) {
              setError("이름을 두 글자 이상 입력해 주세요.");
              inputRef.current?.focus();
              return;
            }
            setSaved(draft.trim());
            setMessage(`${draft.trim()} 이름으로 저장했어요.`);
            changeOpen(false);
          }}
        >
          <Stack>
            <Field label="새 이름" required error={error}>
              <Input
                ref={inputRef}
                name="name"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
              />
            </Field>
            <Button
              variant="secondary"
              onClick={() => {
                setDraft("우리의 공간");
                setError("");
              }}
            >
              기본 이름 사용
            </Button>
            {longContent &&
              Array.from({ length: 12 }, (_, index) => (
                <Text key={index}>
                  안내 {index + 1}. 이름을 변경해도 기존 문서와 구성원은
                  유지돼요. 긴 내용을 읽는 동안에도 아래의 저장과 취소 버튼을
                  사용할 수 있어요.
                </Text>
              ))}
          </Stack>
        </form>
      </Dialog>
      {message && <Text role="status">{message}</Text>}
    </Stack>
  );
}
export const Default: Story = {
  name: "가운데 팝업",
  render: () => <NameDialog />,
};
export const LongContent: Story = {
  name: "긴 본문과 고정 footer",
  parameters: { docs: { story: { height: "640px" } } },
  render: () => <NameDialog longContent />,
};
