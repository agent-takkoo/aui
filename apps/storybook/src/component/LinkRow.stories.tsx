import { LinkRow, Stack } from "@ai-system/design-system";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  id: "components-link-row",
  title: "Component/LinkRow",
  component: LinkRow,
  args: {
    href: "#settings",
    title: "공간 설정",
    description: "이름과 공유 설정을 관리해요.",
    variant: "card",
  },
  argTypes: {
    variant: { control: "inline-radio", options: ["card", "plain"] },
  },
  parameters: {
    docs: {
      description: {
        component:
          "제목·설명·이동 표시를 묶는 링크예요. card에는 옅은 그림자, plain에는 목록 구분선을 사용해요. 실제 링크로 렌더링해 새 탭과 브라우저 기본 이동을 유지해요.",
      },
    },
  },
} satisfies Meta<typeof LinkRow>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { name: "카드 링크" };
export const Settings: Story = {
  name: "설정 목록",
  render: () => (
    <Stack gap="none">
      <LinkRow variant="plain" title="내 정보" href="#profile" />
      <LinkRow
        variant="plain"
        title="알림 설정"
        description="알림을 받을 항목을 골라요."
        href="#notifications"
      />
      <LinkRow variant="plain" title="도움말" href="#help" />
    </Stack>
  ),
};
