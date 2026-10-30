import { Button, ConfirmDialog, Stack, Text } from "@heogeon0/aui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

const meta = {
  id: "component-confirmdialog",
  title: "Component/ConfirmDialog",
  parameters: {
    docs: {
      description: {
        component:
          "ConfirmDialog의 독립적인 사용 예제예요. 포커스와 키보드 동작은 내부 primitive가 관리해요.",
      },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
function ConfirmDemo() {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [deleted, setDeleted] = useState(false);
  async function confirm() {
    setBusy(true);
    await new Promise((resolve) => setTimeout(resolve, 400));
    setBusy(false);
    setOpen(false);
    setDeleted(true);
  }
  return (
    <Stack>
      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title="항목을 삭제할까요?"
        description="삭제한 항목은 되돌릴 수 없어요."
        trigger={<Button variant="destructive">항목 삭제</Button>}
        busy={busy}
        onConfirm={() => {
          void confirm();
        }}
      />
      {deleted ? <Text role="status">항목을 삭제했어요.</Text> : null}
    </Stack>
  );
}
export const Default: Story = {
  name: "삭제 확인과 진행 상태",
  render: () => <ConfirmDemo />,
};
