import { Icon, IconButton, Inline, Stack, Text } from "@heogeon0/aui";
import type { IconButtonProps } from "@heogeon0/aui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

const meta = {
  id: "base-icon-button",
  title: "Base/IconButton",
  component: IconButton,
  args: {
    label: "정책 수정",
    icon: <Icon name="edit" />,
    size: "md",
    variant: "ghost",
    disabled: false,
    loading: false,
  },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost", "destructive"],
    },
    disabled: { control: "boolean" },
    loading: { control: "boolean" },
    icon: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component:
          "아이콘만 있는 버튼에는 label을 지정해요. sm은 PC에서 36px이고 터치 환경에서는 최소 44px이에요. 기본 md와 lg의 크기는 유지해요.",
      },
    },
  },
} satisfies Meta<typeof IconButton>;
export default meta;
type Story = StoryObj<typeof meta>;

function Demo(args: IconButtonProps) {
  const [count, setCount] = useState(0);
  return (
    <Stack>
      <IconButton {...args} onClick={() => setCount(count + 1)} />
      <Text role="status">실행 {count}회</Text>
    </Stack>
  );
}
export const Default: Story = {
  name: "기본",
  render: (args) => <Demo {...args} />,
};
export const Sizes: Story = {
  name: "크기 비교",
  render: (args) => (
    <Inline>
      {(["sm", "md", "lg"] as const).map((size) => (
        <Stack key={size} gap="xs">
          <Text>{size}</Text>
          <IconButton {...args} size={size} label={`${size} 정책 수정`} />
        </Stack>
      ))}
    </Inline>
  ),
};
export const Small: Story = {
  name: "작은 편집 버튼",
  args: { size: "sm" },
  render: (args) => <Demo {...args} />,
};
export const States: Story = {
  name: "로딩과 비활성",
  render: (args) => (
    <Inline>
      <IconButton {...args} size="sm" label="사용할 수 없는 수정" disabled />
      <IconButton {...args} size="sm" label="수정 저장 중" loading />
    </Inline>
  ),
};
