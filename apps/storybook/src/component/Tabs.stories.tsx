import { Tabs, Text } from "@ai-system/design-system";
import type { Meta, StoryObj } from "@storybook/react-vite";
const meta = {
  title: "Component/Tabs",
  component: Tabs,
  args: {
    label: "설정 구분",
    items: [
      {
        value: "general",
        label: "일반",
        content: <Text>일반 설정 내용이에요.</Text>,
      },
      {
        value: "security",
        label: "보안",
        content: <Text>보안 설정 내용이에요.</Text>,
      },
      {
        value: "billing",
        label: "결제",
        content: <Text>결제 설정</Text>,
        disabled: true,
      },
    ],
  },
} satisfies Meta<typeof Tabs>;
export default meta;
export const Default: StoryObj<typeof meta> = {};
