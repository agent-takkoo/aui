import { Button, Drawer, Panel, Text } from "@heogeon0/aui";
import type { Meta, StoryObj } from "@storybook/react-vite";
const meta = {
  title: "Layout/Panel",
  component: Panel,
  args: {
    title: "작업 정보",
    description: "현재 화면에서 필요한 내용을 함께 확인해요.",
    children: <Text>현재 화면을 유지하며 작업 정보를 확인해요.</Text>,
    footer: <Button>저장</Button>,
  },
} satisfies Meta<typeof Panel>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  render: (args) => (
    <Drawer side="right" title="패널" trigger={<Button>패널 열기</Button>}>
      <Panel {...args} />
    </Drawer>
  ),
};
