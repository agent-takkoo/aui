import { Button, Callout, Stack, Text } from "@heogeon0/aui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  id: "components-callout",
  title: "Component/Callout",
  component: Callout,
  args: { title: "확인할 항목이 2개 있어요.", tone: "info" },
  argTypes: {
    tone: {
      control: "inline-radio",
      options: ["info", "success", "warning", "danger"],
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "제목·설명·행동을 묶는 알림 띠예요. tone은 info·success·warning·danger이고 danger는 alert, warning은 status로 읽혀요.",
      },
    },
  },
} satisfies Meta<typeof Callout>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { name: "기본" };
export const Tones: Story = {
  name: "의미별 비교",
  parameters: { controls: { disable: true } },
  render: () => (
    <Stack gap="md">
      <Callout title="공유 전에 내용을 확인해 주세요." tone="info">
        <Text size="sub">프로젝트 구성원이 안내를 읽을 수 있어요.</Text>
      </Callout>
      <Callout title="변경 사항을 저장했어요." tone="success">
        <Text size="sub">다른 구성원에게도 바로 반영돼요.</Text>
      </Callout>
      <Callout
        title="결제 수단이 곧 만료돼요."
        tone="warning"
        action={
          <Button size="sm" variant="secondary">
            수단 변경
          </Button>
        }
      >
        <Text size="sub">만료되면 자동 결제가 중단돼요.</Text>
      </Callout>
      <Callout title="변경 사항을 저장하지 못했어요." tone="danger">
        <Text size="sub">
          입력한 내용은 유지돼요. 연결 상태를 확인한 뒤 다시 저장해 주세요.
        </Text>
      </Callout>
    </Stack>
  ),
};
