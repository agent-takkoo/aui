import {
  Button,
  EmptyState,
  ErrorState,
  LoadingState,
  Text,
} from "@ai-system/design-system";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

const meta = {
  id: "components-feedback",
  title: "Component/Feedback",
  component: EmptyState,
  args: { title: "아직 항목이 없어요" },
  parameters: {
    docs: {
      description: {
        component:
          "빈 화면은 다음 행동을, 오류는 복구할 방법을 제공해요. 기다리는 자리의 작은 UI는 Base/Skeleton에서 확인해요.",
      },
    },
  },
} satisfies Meta<typeof EmptyState>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  name: "빈 화면",
  args: {
    title: "아직 추가한 항목이 없어요",
    description: "첫 항목을 만들어 시작해 보세요.",
    action: <Button size="sm">새 항목 만들기</Button>,
  },
};
function RetryDemo() {
  const [retried, setRetried] = useState(false);
  return retried ? (
    <Text role="status">다시 불러왔어요.</Text>
  ) : (
    <ErrorState
      title="목록을 가져오지 못했어요"
      description="연결을 확인한 뒤 다시 시도해 주세요."
      onRetry={() => setRetried(true)}
    />
  );
}
export const Error: Story = {
  name: "오류와 다시 시도",
  render: () => <RetryDemo />,
};
export const Loading: Story = {
  name: "불러오는 중",
  render: () => <LoadingState />,
};
