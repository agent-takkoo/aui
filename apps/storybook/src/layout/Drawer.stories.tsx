import {
  Button,
  Drawer,
  Field,
  Input,
  Stack,
  Text,
} from "@ai-system/design-system";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  id: "layout-drawer",
  title: "Layout/Drawer",
  component: Drawer,
  args: {
    title: "보기 설정",
    description: "필요한 항목을 골라 확인해 보세요.",
    trigger: <Button>시트 열기</Button>,
    footer: <Button fullWidth>설정 적용</Button>,
    children: (
      <Stack>
        <Field label="검색어">
          <Input placeholder="찾을 내용을 입력해 주세요…" />
        </Field>
        {Array.from({ length: 8 }, (_, index) => (
          <Text key={index}>설정 항목 {index + 1}</Text>
        ))}
      </Stack>
    ),
  },
  argTypes: {
    children: { control: false },
    trigger: { control: false },
    footer: { control: false },
    onOpenChange: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component:
          "기존 서비스 Drawer의 화면 배치를 추출했어요. 모바일에서는 아래에, 데스크탑에서는 오른쪽에 열려요. 스크롤 본문과 고정 footer를 나눠요. 화면별 경로·금융 데이터·드래그 상태는 소비 프로젝트가 맡아요.",
      },
    },
  },
} satisfies Meta<typeof Drawer>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { name: "모바일 시트와 데스크탑 옆판" };
