import {
  Avatar,
  Badge,
  Button,
  Callout,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  EmptyState,
  Field,
  Heading,
  Icon,
  Inline,
  Input,
  SectionLabel,
  Separator,
  Stack,
  Text,
} from "@ai-system/design-system";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  tags: ["!dev", "!autodocs", "!manifest"],
  id: "testing-catalog",
  title: "Testing/Catalog",
  parameters: {
    docs: {
      description: {
        component:
          "기존 서비스의 공통 디자인을 추출한 패키지예요. 카드의 여백, 입력면, 버튼의 크기와 상태, 타이포 위계를 유지하고 가계부 데이터는 포함하지 않아요.",
      },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "모아 보기",
  render: () => (
    <div className="docs-page">
      <header className="docs-intro">
        <p className="docs-eyebrow">DESIGN SYSTEM · SHARED DESIGN</p>
        <h1>
          기존 서비스에서 가져온
          <br />
          익숙한 UI의 기준.
        </h1>
        <p>
          흰 바탕과 연한 입력면, 넉넉한 터치 영역, 굵기와 여백으로 나누는 위계.
          여러 서비스에서 함께 쓸 디자인만 모았어요.
        </p>
      </header>
      <div className="docs-grid">
        <section className="docs-tile">
          <h2>주요 행동과 보조 행동</h2>
          <p className="docs-origin">원본 · ui/button.tsx</p>
          <Stack>
            <Inline>
              <Button>
                <Icon name="plus" />
                새로 만들기
              </Button>
              <Button variant="secondary">돌아가기</Button>
            </Inline>
            <Inline>
              <Button variant="soft" size="sm">
                함께 보기
              </Button>
              <Button variant="ghost" size="sm">
                나중에
              </Button>
              <Button variant="destructive" size="sm">
                삭제
              </Button>
            </Inline>
          </Stack>
        </section>
        <section className="docs-tile">
          <h2>입력면과 라벨</h2>
          <p className="docs-origin">원본 · ui/input.tsx · ui/label.tsx</p>
          <Field
            label="프로젝트 이름"
            description="화면에서 사용할 이름을 적어 주세요."
          >
            <Input defaultValue="우리의 다음 프로젝트" autoComplete="off" />
          </Field>
        </section>
        <section className="docs-tile">
          <h2>선보다 여백으로 묶기</h2>
          <p className="docs-origin">원본 · ui/card.tsx · ui/avatar.tsx</p>
          <Card tone="muted">
            <CardHeader>
              <Inline justify="between">
                <CardTitle>함께 쓰는 공간</CardTitle>
                <Badge variant="secondary">공유 중</Badge>
              </Inline>
              <CardDescription>
                본문과 제목의 굵기로 정보를 구분해요.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Inline>
                <Avatar name="지수" toneIndex={0} />
                <Avatar name="민준" toneIndex={1} />
                <Text size="sub" tone="muted">
                  두 명이 함께하고 있어요.
                </Text>
              </Inline>
            </CardContent>
          </Card>
        </section>
        <section className="docs-tile">
          <h2>다음 행동이 있는 빈 화면</h2>
          <p className="docs-origin">원본 · ui/empty-state.tsx</p>
          <EmptyState
            title="아직 추가한 항목이 없어요"
            description="첫 항목을 만들면 여기에 보여 드릴게요."
            action={<Button size="sm">첫 항목 만들기</Button>}
          />
        </section>
      </div>
      <Stack gap="section">
        <Separator />
        <Callout title="Theme을 바꾸면 같은 컴포넌트의 색과 radius가 함께 바뀌어요." />
        <div className="docs-grid">
          <Stack gap="sm">
            <SectionLabel>유지한 디자인</SectionLabel>
            <Heading size="heading">
              큰 터치 영역, 절제된 표면, 명확한 위계
            </Heading>
            <Text size="sub" tone="muted">
              48px 기본 버튼, 56px 입력, 20px 카드 여백을 기존 서비스에서
              가져왔어요.
            </Text>
          </Stack>
          <Stack gap="sm">
            <SectionLabel>패키지의 경계</SectionLabel>
            <Text size="sub" tone="muted">
              금액, 지갑, 기록, 거래 달력, 크루 상태와 API 호출은 서비스를
              만드는 프로젝트가 맡아요.
            </Text>
          </Stack>
        </div>
      </Stack>
    </div>
  ),
};
