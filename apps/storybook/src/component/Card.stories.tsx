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
} from "@ai-system/design-system";
import type { Meta, StoryObj } from "@storybook/react-vite";

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
          <Badge variant="secondary">새 소식</Badge>
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
