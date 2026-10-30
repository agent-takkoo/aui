import type { ButtonProps } from "@heogeon0/aui";
import {
  Button,
  ButtonLink,
  Icon,
  IconButton,
  Inline,
  Stack,
  Text,
} from "@heogeon0/aui";
import type { StoryObj } from "@storybook/react-vite";
import { useState } from "react";

const meta = {
  id: "testing-button",
  title: "Testing/Button",
  tags: ["!dev", "!autodocs", "!manifest"],
};
export default meta;
type Story = StoryObj<typeof meta>;
export const Sizes: Story = {
  name: "크기와 아이콘",
  render: () => (
    <Stack>
      <Inline>
        <Button size="sm">작게</Button>
        <Button>기본</Button>
        <Button size="lg">크게</Button>
        <IconButton label="추가" icon={<Icon name="plus" />} />
      </Inline>
      <Button fullWidth>
        <Icon name="plus" />
        새로 만들기
      </Button>
      <ButtonLink href="#details" variant="secondary">
        상세 화면으로 이동
      </ButtonLink>
    </Stack>
  ),
};
function InteractionDemo() {
  const [count, setCount] = useState(0);
  return (
    <Stack>
      <Inline>
        <Button onClick={() => setCount((value) => value + 1)}>실행</Button>
        <Button disabled onClick={() => setCount((value) => value + 1)}>
          비활성 실행
        </Button>
        <Button loading onClick={() => setCount((value) => value + 1)}>
          진행 중 실행
        </Button>
      </Inline>
      <Text role="status">실행 횟수: {count}</Text>
    </Stack>
  );
}
export const Interaction: Story = {
  name: "중복 실행 방지",
  render: () => <InteractionDemo />,
};

function BoundaryDemo() {
  const [count, setCount] = useState(0);
  const untypedProps = {
    className: "rogue-class",
    style: { background: "red", padding: 0 },
    color: "red",
  } as unknown as ButtonProps;
  return (
    <Stack>
      <Button {...untypedProps} onClick={() => setCount((value) => value + 1)}>
        보호된 버튼
      </Button>
      <Text role="status">실행 횟수: {count}</Text>
    </Stack>
  );
}
export const RuntimeBoundary: Story = {
  name: "JavaScript props 경계",
  render: () => <BoundaryDemo />,
  parameters: {
    docs: {
      description: {
        story:
          "타입 검사를 우회한 props도 내부 DOM에 그대로 전달하지 않아요. 외부 CSS의 하위 선택자까지 막는 보안 경계는 아니에요.",
      },
    },
  },
};
