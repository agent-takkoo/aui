import { useState } from "react";
import {
  ToastProvider,
  useToast,
  Button,
  Inline,
  Stack,
  Text,
} from "@heogeon0/aui";
import type { Meta, StoryObj } from "@storybook/react-vite";
const meta = {
  title: "Component/Toast",
  args: { duration: 5000 },
} satisfies Meta<{ duration: number }>;
export default meta;
function Demo() {
  const { toast } = useToast();
  const [undone, setUndone] = useState(false);
  return (
    <Stack>
      <Button
        onClick={() =>
          toast({
            title: "설정을 저장했어요",
            description: "변경 사항이 반영됐어요.",
            action: {
              label: "되돌리기",
              altText: "저장한 설정을 이전 상태로 되돌리기",
              onClick: () => setUndone(true),
            },
          })
        }
      >
        알림 보기
      </Button>
      {undone ? <Text role="status">변경을 되돌렸어요.</Text> : null}
    </Stack>
  );
}
export const Default: StoryObj<{ duration: number }> = {
  render: ({ duration }) => (
    <ToastProvider duration={duration}>
      <Demo />
    </ToastProvider>
  ),
};
function Messages() {
  const { toast } = useToast();
  return (
    <Inline>
      <Button onClick={() => toast({ title: "복사했어요" })}>짧은 알림</Button>
      <Button
        variant="secondary"
        onClick={() =>
          toast({
            title: "변경 내용을 저장하지 못했어요",
            description: "네트워크 연결을 확인하고 다시 시도해 주세요.",
            tone: "destructive",
          })
        }
      >
        오류 알림
      </Button>
      <Button
        variant="ghost"
        onClick={() =>
          toast({
            title: "공유할 항목을 보관함에 저장했어요",
            description:
              "이름이 긴 항목도 잘리지 않고 전체 내용을 확인할 수 있어요.",
          })
        }
      >
        긴 알림
      </Button>
    </Inline>
  );
}
export const MessagesAndStack: StoryObj<{ duration: number }> = {
  name: "문구와 쌓임",
  render: ({ duration }) => (
    <ToastProvider duration={duration}>
      <Messages />
    </ToastProvider>
  ),
};
