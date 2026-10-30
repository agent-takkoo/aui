import { Accordion, Text } from "@heogeon0/aui";
import type { Meta, StoryObj } from "@storybook/react-vite";
const meta = {
  title: "Component/Accordion",
  component: Accordion,
  args: {
    items: [
      {
        value: "first",
        title: "알림은 어떻게 설정하나요?",
        content: <Text>설정 화면에서 알림을 선택해 주세요.</Text>,
      },
      {
        value: "second",
        title: "파일은 어디에서 확인하나요?",
        content: <Text>문서 목록에서 확인할 수 있어요.</Text>,
      },
    ],
  },
} satisfies Meta<typeof Accordion>;
export default meta;
export const Default: StoryObj<typeof meta> = {};
