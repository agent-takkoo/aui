import {
  Breadcrumb,
  Button,
  Card,
  CardContent,
  Container,
  Icon,
  PageHeader,
  Stack,
  Text,
} from "@heogeon0/aui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  id: "layout-page-header",
  title: "Layout/PageHeader",
  component: PageHeader,
  args: {
    title: "구성원",
    description: "공간에 참여한 사람과 권한을 관리해요.",
  },
  argTypes: {
    level: { control: "inline-radio", options: [1, 2] },
    size: { control: "inline-radio", options: ["title", "display"] },
  },
  parameters: {
    docs: {
      description: {
        component:
          "페이지 제목·설명·경로·주요 행동을 한 가지 규칙으로 배치해요. 화면마다 하나만 두고 제목은 h1이에요. 좁은 화면에서는 행동 버튼이 제목 아래로 내려가요.",
      },
    },
  },
} satisfies Meta<typeof PageHeader>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "기본",
  render: (args) => (
    <Container width="wide">
      <PageHeader
        {...args}
        actions={
          <>
            <Button variant="secondary">초대 링크 복사</Button>
            <Button leadingIcon={<Icon name="user-plus" />}>구성원 초대</Button>
          </>
        }
      />
    </Container>
  ),
};

export const WithBreadcrumb: Story = {
  name: "경로와 본문",
  parameters: { controls: { disable: true } },
  render: () => (
    <Container width="wide">
      <Stack gap="section">
        <PageHeader
          title="청구서 상세"
          description="2026년 10월 사용량 기준이에요."
          breadcrumb={
            <Breadcrumb
              items={[
                { label: "결제", href: "#billing" },
                { label: "청구서", href: "#invoices" },
                { label: "2026-10" },
              ]}
            />
          }
          actions={<Button variant="secondary">PDF 내려받기</Button>}
        />
        <Card>
          <CardContent>
            <Text>
              본문은 PageHeader 아래에 Stack gap="section"으로 이어요.
            </Text>
          </CardContent>
        </Card>
      </Stack>
    </Container>
  ),
};
