import {
  Avatar,
  Badge,
  Drawer,
  Icon,
  ListItem,
  Stack,
  Switch,
  Text,
} from "@heogeon0/aui";
import type { ListItemProps } from "@heogeon0/aui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

const meta = {
  id: "components-list-item",
  title: "Component/ListItem",
  component: ListItem,
  args: {
    title: "알림 설정",
    description: "받을 알림을 선택해요.",
    size: "sm",
    disabled: false,
  },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "lg"] },
    disabled: { control: "boolean" },
    chevron: { control: "boolean" },
    leading: { control: false },
    trailing: { control: false },
    onClick: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component:
          "행 전체를 눌러 동작을 실행해요. sm은 제목·설명을 한 줄에 놓는 44px 행이고, lg는 제목 아래에 설명을 두는 최소 64px 행이에요. 앞뒤에는 아이콘·텍스트·Badge를 넣고, 페이지 이동에는 LinkRow를 사용해요.",
      },
    },
  },
} satisfies Meta<typeof ListItem>;
export default meta;
type Story = StoryObj<typeof meta>;

function SettingsRow(args: ListItemProps) {
  const [notifications, setNotifications] = useState(true);
  return (
    <Stack>
      <Drawer
        title={args.title}
        description={args.description}
        trigger={<ListItem {...args} />}
      >
        <Switch
          label="알림 받기"
          checked={notifications}
          onCheckedChange={setNotifications}
        />
      </Drawer>
      <Text role="status" size="sub" tone="muted">
        {notifications ? "알림을 받아요." : "알림을 받지 않아요."}
      </Text>
    </Stack>
  );
}

export const Default: Story = {
  name: "기본",
  render: (args) => <SettingsRow {...args} />,
};

function SizeComparison(args: ListItemProps) {
  const [last, setLast] = useState("");
  return (
    <Stack gap="section">
      {(["sm", "lg"] as const).map((size) => (
        <Stack key={size} gap="xs">
          <Text size="caption" tone="muted">
            {size === "sm" ? "좁은형 · sm" : "큰형 · lg"}
          </Text>
          <ListItem
            {...args}
            size={size}
            onClick={() => setLast(size === "sm" ? "좁은형" : "큰형")}
          />
        </Stack>
      ))}
      <Text role="status" size="sub">
        {last ? `실행한 행: ${last}` : "행을 눌러 보세요."}
      </Text>
    </Stack>
  );
}

export const Sizes: Story = {
  name: "두 크기 비교",
  parameters: { controls: { exclude: ["size"] } },
  render: (args) => <SizeComparison {...args} />,
};

function ListDemo(args: ListItemProps) {
  const [last, setLast] = useState("");
  return (
    <Stack>
      <Stack gap="none">
        <ListItem
          {...args}
          title="내 정보"
          description="이름과 프로필을 관리해요."
          leading={<Avatar name="김하늘" size="sm" />}
          onClick={() => setLast("내 정보")}
        />
        <ListItem
          {...args}
          title="문서 검색"
          description="제목과 내용으로 문서를 찾아요."
          leading={<Icon name="search" />}
          onClick={() => setLast("문서 검색")}
        />
        <ListItem
          {...args}
          title="검토할 문서"
          description="공유된 문서와 변경 사항을 확인해요."
          trailing={<Badge tone="brand">3개</Badge>}
          onClick={() => setLast("검토할 문서")}
        />
        <ListItem
          {...args}
          title="현재 사용할 수 없는 항목"
          description="권한을 받은 뒤 사용할 수 있어요."
          disabled
          onClick={() => setLast("사용할 수 없는 항목")}
        />
      </Stack>
      <Text role="status" size="sub">
        {last ? `실행한 항목: ${last}` : "항목을 눌러 보세요."}
      </Text>
    </Stack>
  );
}

export const List: Story = {
  name: "앞뒤 콘텐츠와 비활성",
  render: (args) => <ListDemo {...args} />,
};
