import { Button } from "@ai-system/design-system";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  id: "components-button",
  title: "Base/Button",
  component: Button,
  args: { children: "변경 사항 저장", variant: "primary", size: "md" },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "soft",
        "outline",
        "ghost",
        "destructive",
        "quiet",
      ],
      description:
        "주요 행동은 primary, 보조 행동은 secondary, 위험한 행동은 destructive를 사용해요.",
    },
    size: {
      control: "inline-radio",
      options: ["sm", "md", "lg"],
      description: "기본 48px, 크게 56px예요. sm은 마우스 36px, 터치 44px예요.",
    },
    loading: {
      control: "boolean",
      description: "라벨을 유지하며 중복 실행을 막아요.",
    },
    fullWidth: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  parameters: {
    docs: {
      description: {
        component:
          "행동의 중요도에 맞춰 variant와 size를 선택해요. 링크 이동에는 ButtonLink를, 아이콘 하나에는 label이 필수인 IconButton을 사용해요.",
      },
    },
  },
} satisfies Meta<typeof Button>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { name: "기본" };
