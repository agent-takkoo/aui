import {
  Avatar,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Inline,
  Text,
} from "@heogeon0/aui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Example, ExampleGrid } from "../examples";

const meta = {
  id: "components-card",
  title: "Component/Card",
  component: Card,
  args: { tone: "muted" },
  argTypes: { tone: { control: "inline-radio", options: ["plain", "muted"] } },
  parameters: {
    docs: {
      description: {
        component:
          "제목·설명·본문·액션을 조합하는 카드예요. 선과 그림자 대신 여백과 표면으로 정보를 묶어요.",
      },
    },
  },
} satisfies Meta<typeof Card>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  name: "카드 조합",
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>함께 쓰는 프로젝트</CardTitle>
        <CardDescription>
          색과 여백으로 한 덩어리라는 것을 알려 줘요.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Inline>
          <Avatar name="지수" />
          <Text>지수가 초대했어요.</Text>
          <Badge tone="brand">새 소식</Badge>
        </Inline>
      </CardContent>
      <CardFooter>
        <Button size="sm">참여하기</Button>
        <Button size="sm" variant="ghost">
          나중에
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const Tones: Story = {
  name: "표면 비교",
  parameters: { controls: { disable: true } },
  render: () => (
    <ExampleGrid>
      {(["plain", "muted"] as const).map((tone) => (
        <Example title={tone} key={tone}>
          <Card tone={tone}>
            <CardHeader>
              <CardTitle>프로젝트 안내</CardTitle>
              <CardDescription>
                제목·설명·본문의 위계를 비교해요.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Text>
                같은 내용이 서로 다른 배경에 어떻게 보이는지 확인하세요.
              </Text>
            </CardContent>
          </Card>
        </Example>
      ))}
    </ExampleGrid>
  ),
};
