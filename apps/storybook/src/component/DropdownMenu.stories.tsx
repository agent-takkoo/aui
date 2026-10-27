import { Button, DropdownMenu, Stack, Text } from "@ai-system/design-system";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

const meta = {
  id: "component-dropdownmenu",
  title: "Component/DropdownMenu",
  parameters: {
    docs: {
      description: {
        component:
          "DropdownMenu의 독립적인 사용 예제예요. 포커스와 키보드 동작은 내부 primitive가 관리해요.",
      },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
function MenuDemo() {
  const [selected, setSelected] = useState("");
  return (
    <Stack>
      <DropdownMenu
        label="항목 메뉴"
        trigger={<Button variant="secondary">메뉴 열기</Button>}
        items={[
          {
            id: "edit",
            label: "이름 바꾸기",
            onSelect: () => setSelected("이름 바꾸기"),
          },
          { id: "copy", label: "복제", onSelect: () => setSelected("복제") },
          {
            id: "disabled",
            label: "이동",
            onSelect: () => setSelected("이동"),
            disabled: true,
          },
          {
            id: "delete",
            label: "삭제",
            destructive: true,
            onSelect: () => setSelected("삭제"),
          },
        ]}
      />
      {selected ? <Text role="status">선택: {selected}</Text> : null}
    </Stack>
  );
}
export const Default: Story = { name: "항목 메뉴", render: () => <MenuDemo /> };
