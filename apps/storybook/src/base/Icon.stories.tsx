import { Icon, Inline, Stack, Text, iconNames } from "@heogeon0/aui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Rocket } from "lucide-react";

const meta = {
  id: "base-icon",
  title: "Base/Icon",
  component: Icon,
  args: { name: "plus", size: "md" },
  argTypes: {
    name: { control: "select", options: iconNames },
    size: { control: "inline-radio", options: ["sm", "md"] },
  },
  parameters: {
    docs: {
      description: {
        component:
          "lucide 아이콘을 패키지 크기와 선 굵기로 표시해요. name은 정해진 목록에서 고르고, 목록에 없는 아이콘은 lucide-react에서 import해 source로 넘겨요. 아이콘만 누르는 버튼은 IconButton을 사용해요.",
      },
    },
  },
} satisfies Meta<typeof Icon>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  name: "기본",
  render: (args) => (
    <Inline>
      <Icon {...args} />
      <Text>{args.name}</Text>
    </Inline>
  ),
};
export const Catalog: Story = {
  name: "전체 목록",
  parameters: { controls: { disable: true } },
  render: () => (
    <Stack gap="md">
      <Inline gap="md">
        {iconNames.map((name) => (
          <Stack key={name} gap="xs" align="center">
            <Icon name={name} />
            <Text size="caption" tone="muted">
              {name}
            </Text>
          </Stack>
        ))}
      </Inline>
      <Inline>
        <Icon source={Rocket} />
        <Text size="sub" tone="muted">
          source로 넘긴 lucide 아이콘도 같은 크기와 굵기를 써요.
        </Text>
      </Inline>
    </Stack>
  ),
};
