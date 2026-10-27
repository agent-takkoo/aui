import { Button, Popover, Text } from "@ai-system/design-system";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  id: "component-popover",
  title: "Component/Popover",
  parameters: {
    docs: {
      description: {
        component:
          "Popover의 독립적인 사용 예제예요. 포커스와 키보드 동작은 내부 primitive가 관리해요.",
      },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  name: "가까이 띄우는 판",
  render: () => (
    <Popover
      title="공유 범위"
      trigger={<Button variant="secondary">공유 범위 보기</Button>}
    >
      <Text size="sub">초대한 사람에게만 보여요.</Text>
    </Popover>
  ),
};
