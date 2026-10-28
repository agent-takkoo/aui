import { useState } from "react";
import {
  ToastProvider,
  useToast,
  Button,
  Stack,
  Text,
} from "@ai-system/design-system";
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
