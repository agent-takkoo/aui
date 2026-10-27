import { Skeleton } from "@ai-system/design-system";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  id: "base-skeleton",
  title: "Base/Skeleton",
  component: Skeleton,
  args: { variant: "line" },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["line", "title", "avatar", "card"],
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "콘텐츠를 기다리는 자리를 표시하는 기본 UI예요. 정해진 네 가지 형태를 제공하고 움직임 줄이기 설정을 따라요.",
      },
    },
  },
} satisfies Meta<typeof Skeleton>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { name: "기본" };
