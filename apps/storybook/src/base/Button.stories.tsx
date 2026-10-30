import {
  Button,
  ButtonLink,
  Icon,
  IconButton,
  Inline,
  Stack,
  Text,
} from "@heogeon0/aui";
import type { ButtonVariant } from "@heogeon0/aui";
import { Example, ExampleGrid } from "../examples";
import type { Meta, StoryObj } from "@storybook/react-vite";

const variants = [
  "primary",
  "secondary",
  "ghost",
  "destructive",
] satisfies ButtonVariant[];

const meta = {
  id: "components-button",
  title: "Base/Button",
  component: Button,
  args: { children: "변경 사항 저장", variant: "primary", size: "md" },
  argTypes: {
    variant: {
      control: "select",
      options: variants,
      description:
        "화면의 주요 행동 하나만 primary, 보조 행동은 secondary, 낮은 강조는 ghost, 위험한 행동은 destructive를 사용해요.",
    },
    size: {
      control: "inline-radio",
      options: ["sm", "md", "lg"],
      description: "기본 48px, 크게 56px예요. sm은 마우스 36px, 터치 44px예요.",
    },
    loading: {
      control: "boolean",
      description: "라벨을 유지하며 중복 실행을 막아요.",
    },
    fullWidth: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  parameters: {
    docs: {
      description: {
        component:
          "행동의 중요도에 맞춰 variant와 size를 선택해요. 링크 이동에는 ButtonLink를, 아이콘 하나에는 label이 필수인 IconButton을 사용해요.",
      },
    },
  },
} satisfies Meta<typeof Button>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { name: "기본" };

export const Variants: Story = {
  name: "Variants",
  argTypes: { variant: { control: false, table: { disable: true } } },
  parameters: {
    docs: {
      description: {
        story:
          "네 가지 variant를 함께 비교해요. Theme와 모드를 바꾸면 모든 버튼에 적용돼요. 기본 예제의 Controls에서는 variant를 하나씩 선택할 수 있어요.",
      },
      story: { height: "320px" },
    },
  },
  render: (args) => (
    <Inline align="start" gap="md" aria-label="버튼 variant 비교">
      {variants.map((variant) => (
        <Stack key={variant} gap="xs">
          <Text size="caption" tone="muted">
            {variant}
          </Text>
          <Button {...args} variant={variant} />
        </Stack>
      ))}
    </Inline>
  ),
};

export const Sizes: Story = {
  name: "크기 비교",
  parameters: { controls: { exclude: ["size", "fullWidth"] } },
  render: (args) => (
    <Inline align="end" gap="section">
      {(["sm", "md", "lg"] as const).map((size) => (
        <Stack key={size} gap="xs">
          <Text size="caption" tone="muted">
            {size}
          </Text>
          <Button {...args} size={size} fullWidth={false} />
        </Stack>
      ))}
    </Inline>
  ),
};

export const States: Story = {
  name: "기본·로딩·비활성",
  parameters: {
    controls: { disable: true },
    docs: { story: { height: "560px" } },
  },
  render: () => (
    <ExampleGrid>
      <Example
        title="기본"
        description="Tab으로 포커스하고 Enter 또는 Space로 실행해 보세요."
      >
        <Button>변경 사항 저장</Button>
      </Example>
      <Example
        title="로딩"
        description="실행 중에도 라벨을 유지하고 중복 실행을 막아요."
      >
        <Button loading>변경 사항 저장</Button>
      </Example>
      <Example title="비활성" description="동작할 수 없는 상태를 나타내요.">
        <Button disabled>변경 사항 저장</Button>
      </Example>
    </ExampleGrid>
  ),
};

export const Usage: Story = {
  name: "아이콘·링크·긴 문구",
  parameters: { controls: { disable: true } },
  render: () => (
    <Stack gap="section">
      <Inline>
        <Button leadingIcon={<Icon name="plus" />}>새 항목 만들기</Button>
        <Button
          variant="secondary"
          trailingIcon={<Icon name="chevron-right" />}
        >
          다음 단계
        </Button>
        <IconButton label="검색" icon={<Icon name="search" />} />
        <ButtonLink
          variant="secondary"
          href="https://github.com/heogeon0/aui"
          trailingIcon={<Icon name="external-link" size="sm" />}
        >
          저장소 보기
        </ButtonLink>
      </Inline>
      <Button fullWidth variant="secondary">
        선택한 항목의 변경 사항을 확인하고 모두 저장하기
      </Button>
    </Stack>
  ),
};
