import { Input, Label, Stack } from "@heogeon0/aui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ReactNode } from "react";
import { useId } from "react";

const meta = {
  id: "base-label",
  title: "Base/Label",
  component: Label,
  args: { children: "이름" },
  parameters: {
    docs: {
      description: {
        component:
          "기본 입력 라벨이에요. htmlFor를 입력의 id와 연결하면 라벨을 눌러 입력으로 이동할 수 있어요. 설명·오류까지 자동으로 연결하려면 Field를 사용해요.",
      },
    },
  },
} satisfies Meta<typeof Label>;
export default meta;
type Story = StoryObj<typeof meta>;

function LabelDemo({ children }: { children: ReactNode }) {
  const id = useId();
  return (
    <Stack gap="sm">
      <Label htmlFor={id}>{children}</Label>
      <Input id={id} name="name" />
    </Stack>
  );
}
export const Default: Story = {
  name: "입력과 연결",
  render: (args) => <LabelDemo>{args.children}</LabelDemo>,
};
