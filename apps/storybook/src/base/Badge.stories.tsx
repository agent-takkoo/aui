import { Badge, Inline, Stack, Text } from "@heogeon0/aui";
import type { Tone } from "@heogeon0/aui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const tones = [
  "neutral",
  "brand",
  "success",
  "warning",
  "danger",
  "info",
] satisfies Tone[];
const meta = {
  id: "base-badge",
  title: "Base/Badge",
  component: Badge,
  args: { children: "상태", tone: "neutral", variant: "soft", size: "md" },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    tone: { control: "select", options: tones },
    variant: { control: "inline-radio", options: ["soft", "solid", "outline"] },
  },
  parameters: {
    docs: {
      description: {
        component:
          "짧은 상태와 메타 정보를 표시해요. tone은 의미(중립·브랜드·완료·주의·실패·안내), variant는 강조 방식(soft·solid·outline), size는 sm·md·lg예요.",
      },
    },
  },
} satisfies Meta<typeof Badge>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { name: "기본" };
export const Tones: Story = {
  name: "의미와 강조",
  parameters: { controls: { disable: true } },
  render: () => (
    <Stack gap="md">
      {(["soft", "solid", "outline"] as const).map((variant) => (
        <Stack key={variant} gap="xs">
          <Text size="caption" tone="muted">
            {variant}
          </Text>
          <Inline gap="sm">
            {tones.map((tone) => (
              <Badge key={tone} tone={tone} variant={variant}>
                {tone}
              </Badge>
            ))}
          </Inline>
        </Stack>
      ))}
    </Stack>
  ),
};
export const Sizes: Story = {
  name: "크기 비교",
  parameters: { controls: { exclude: ["size"] } },
  render: (args) => (
    <Inline align="center" gap="section">
      {(["sm", "md", "lg"] as const).map((size) => (
        <Stack gap="xs" key={size}>
          <Text size="caption" tone="muted">
            {size}
          </Text>
          <Badge {...args} size={size} />
        </Stack>
      ))}
    </Inline>
  ),
};
