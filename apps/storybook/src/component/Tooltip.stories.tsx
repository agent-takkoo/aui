import { Tooltip, IconButton, Icon } from "@heogeon0/aui";
import type { Meta, StoryObj } from "@storybook/react-vite";
const meta = {
  title: "Component/Tooltip",
  component: Tooltip,
  args: {
    content: "도움말에서 자세한 설명을 확인해요.",
    trigger: <IconButton label="도움말" icon={<Icon name="search" />} />,
  },
} satisfies Meta<typeof Tooltip>;
export default meta;
export const Default: StoryObj<typeof meta> = {};
