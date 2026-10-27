import { Button, Dialog, Field, Input, Stack } from "@ai-system/design-system";
import type { Meta, StoryObj } from "@storybook/react-vite";

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
export const Default: Story = {
  name: "가운데 팝업",
  render: () => (
    <Dialog
      title="이름 바꾸기"
      description="변경한 이름은 함께 쓰는 사람에게도 보여요."
      trigger={<Button>팝업 열기</Button>}
      footer={<Button>변경 사항 저장</Button>}
    >
      <Stack>
        <Field label="새 이름">
          <Input defaultValue="우리의 공간" />
        </Field>
        <Button variant="secondary">기본 이름 사용</Button>
      </Stack>
    </Dialog>
  ),
};
