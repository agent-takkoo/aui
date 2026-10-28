import { Breadcrumb } from "@ai-system/design-system";
import type { Meta, StoryObj } from "@storybook/react-vite";
const meta = {
  title: "Component/Breadcrumb",
  component: Breadcrumb,
  args: {
    items: [
      { label: "홈", href: "#home" },
      { label: "문서", href: "#documents" },
      { label: "사용 안내" },
    ],
  },
} satisfies Meta<typeof Breadcrumb>;
export default meta;
export const Default: StoryObj<typeof meta> = {};
