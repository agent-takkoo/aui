import { Collapsible, Text } from "@ai-system/design-system";
import type { Meta, StoryObj } from "@storybook/react-vite";
const meta = {
  title: "Component/Collapsible",
  component: Collapsible,
  args: {
    label: "상세 설정",
    children: <Text>추가 설정을 이 영역에 배치해요.</Text>,
  },
} satisfies Meta<typeof Collapsible>;
export default meta;
export const Default: StoryObj<typeof meta> = {};
