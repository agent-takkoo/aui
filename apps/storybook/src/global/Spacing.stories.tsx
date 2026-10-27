import type { Space } from "@ai-system/design-system";
import { Card, CardTitle, Stack, Text } from "@ai-system/design-system";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  id: "base-spacing",
  title: "Global/Spacing",
  parameters: {
    docs: {
      description: {
        component:
          "기존 서비스에서 추출한 간격 기준이에요. none 0px, xs 6px, sm 8px, md 16px, section 24px을 제공해요. 간격을 조작하는 예제는 Layout/Stack과 Layout/Inline에서 확인해요.",
      },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const spaces: { name: Space; pixels: number }[] = [
  { name: "none", pixels: 0 },
  { name: "xs", pixels: 6 },
  { name: "sm", pixels: 8 },
  { name: "md", pixels: 16 },
  { name: "section", pixels: 24 },
];

export const Default: Story = {
  name: "간격 기준",
  render: () => (
    <div className="docs-grid">
      {spaces.map(({ name, pixels }) => (
        <section className="docs-tile" key={name}>
          <h2>
            {name} · {pixels}px
          </h2>
          <Stack gap={name}>
            <Card tone="muted">
              <CardTitle>첫 번째 묶음</CardTitle>
            </Card>
            <Card tone="muted">
              <Text>두 번째 묶음</Text>
            </Card>
          </Stack>
        </section>
      ))}
    </div>
  ),
};
