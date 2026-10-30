import { Button, Drawer, Sidebar, Text } from "@heogeon0/aui";
import type { Meta, StoryObj } from "@storybook/react-vite";
const meta = {
  title: "Layout/Sidebar",
  component: Sidebar,
  args: {
    label: "설정",
    currentId: "general",
    items: [
      { id: "general", label: "일반", href: "#general" },
      { id: "members", label: "구성원", href: "#members" },
    ],
    footer: <Text size="caption">공간의 설정을 관리해요.</Text>,
  },
} satisfies Meta<typeof Sidebar>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  render: (args) => (
    <Drawer
      side="left"
      title="사이드바"
      trigger={<Button>사이드바 열기</Button>}
    >
      <Sidebar {...args} />
    </Drawer>
  ),
};
