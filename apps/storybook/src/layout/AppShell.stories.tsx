import {
  AppShell,
  Button,
  Container,
  Drawer,
  Grid,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Heading,
  Icon,
  IconButton,
  Inline,
  PageHeader,
  Sidebar,
  Stack,
  Text,
} from "@heogeon0/aui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { AppShellProps } from "@heogeon0/aui";
import { useState } from "react";

const items = [
  { id: "overview", label: "개요", href: "#overview" },
  { id: "members", label: "구성원", href: "#members" },
  { id: "billing", label: "결제", href: "#billing" },
];

const meta = {
  id: "layout-app-shell",
  title: "Layout/AppShell",
  component: AppShell,
  args: { children: null, sidebarWidth: "md", sidebarSticky: true },
  argTypes: {
    sidebarWidth: { control: "inline-radio", options: ["sm", "md"] },
    sidebarSticky: { control: "boolean" },
  },
  parameters: {
    docs: {
      description: {
        component:
          "상단 헤더·사이드바·본문으로 앱 화면의 틀을 만들어요. 사이드바는 1024px 이상에서 보이고, 좁은 화면에서는 헤더의 메뉴 버튼으로 Drawer를 열어 같은 Sidebar를 넣어요.",
      },
      story: { height: "560px" },
    },
  },
} satisfies Meta<typeof AppShell>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "기본",
  render: (args) => (
    <AppShell
      {...args}
      header={
        <Inline justify="between" wrap={false}>
          <Inline gap="sm">
            <Drawer
              side="left"
              title="메뉴"
              trigger={
                <IconButton label="메뉴 열기" icon={<Icon name="menu" />} />
              }
            >
              <Sidebar label="메뉴" currentId="members" items={items} />
            </Drawer>
            <Heading level={1} size="heading">
              관리 콘솔
            </Heading>
          </Inline>
          <Button size="sm" variant="secondary">
            로그아웃
          </Button>
        </Inline>
      }
      sidebar={<Sidebar label="메뉴" currentId="members" items={items} />}
    >
      <Container width="wide">
        <Stack gap="section">
          <PageHeader
            title="구성원"
            description="공간에 참여한 사람과 권한을 관리해요."
            actions={
              <Button leadingIcon={<Icon name="user-plus" />}>
                구성원 초대
              </Button>
            }
          />
          <Grid columns={3}>
            {["전체 12명", "관리자 2명", "초대 대기 1명"].map((label) => (
              <Card key={label}>
                <CardHeader>
                  <CardTitle>{label}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Text size="sub" tone="muted">
                    이번 달 기준이에요.
                  </Text>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </Stack>
      </Container>
    </AppShell>
  ),
};

function DocumentDemo({
  withHeader = true,
  ...args
}: AppShellProps & { withHeader?: boolean }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <AppShell
      {...args}
      header={
        withHeader ? (
          <Stack gap="sm">
            <Inline justify="between">
              <Heading level={1}>문서 편집기</Heading>
              <Button size="sm" onClick={() => setExpanded(!expanded)}>
                도움말 {expanded ? "접기" : "펼치기"}
              </Button>
            </Inline>
            {expanded ? (
              <Text>
                문서 내용을 편집하면서 왼쪽 메뉴로 다른 보기로 이동할 수 있어요.
                메뉴가 길면 메뉴 안에서 스크롤해 주세요.
              </Text>
            ) : null}
          </Stack>
        ) : undefined
      }
      sidebar={
        <Sidebar
          label="문서 보기"
          items={Array.from({ length: 40 }, (_, index) => ({
            id: String(index),
            label: `문서 ${index + 1}`,
            href: `#document-${index + 1}`,
          }))}
        />
      }
    >
      <Stack>
        {Array.from({ length: 100 }, (_, index) => (
          <Text key={index} id={`document-${index + 1}`}>
            문서 본문 {index + 1}
          </Text>
        ))}
      </Stack>
    </AppShell>
  );
}
export const LongDocument: Story = {
  name: "긴 문서와 사이드바",
  render: (args) => <DocumentDemo {...args} />,
};
export const WithoutHeader: Story = {
  name: "헤더 없는 화면",
  render: (args) => <DocumentDemo {...args} withHeader={false} />,
};
export const ScrollingSidebar: Story = {
  name: "본문과 함께 스크롤",
  args: { sidebarSticky: false },
  render: (args) => <DocumentDemo {...args} />,
};
