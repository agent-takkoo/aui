import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  Field,
  Grid,
  Input,
  Select,
  Stack,
  Text,
} from "@heogeon0/aui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  id: "layout-grid",
  title: "Layout/Grid",
  component: Grid,
  parameters: {
    docs: {
      description: {
        component:
          "같은 폭의 열로 나누는 2차원 배치예요. columns는 1·2·3·4·auto, collapseBelow는 none·sm·md·lg예요. 기본은 2열이고 768px 미만에서 한 열로 쌓여요. 열 폭이 다른 배치에는 쓰지 않아요.",
      },
    },
  },
  args: { columns: 2, gap: "md", collapseBelow: "md" },
  argTypes: {
    columns: { control: "select", options: [1, 2, 3, 4, "auto"] },
    gap: { control: "select", options: ["none", "xs", "sm", "md", "section"] },
    collapseBelow: { control: "select", options: ["none", "sm", "md", "lg"] },
  },
} satisfies Meta<typeof Grid>;
export default meta;
type Story = StoryObj<typeof meta>;

function Tile({ index }: { index: number }) {
  return (
    <Card tone="muted">
      <CardHeader>
        <CardTitle>항목 {index}</CardTitle>
        <CardDescription>모든 칸이 같은 폭이에요.</CardDescription>
      </CardHeader>
    </Card>
  );
}

export const Default: Story = {
  name: "기본",
  render: (args) => (
    <Grid {...args}>
      {[1, 2, 3, 4].map((index) => (
        <Tile key={index} index={index} />
      ))}
    </Grid>
  ),
};

export const FormFields: Story = {
  name: "폼 입력 두 칸",
  render: () => (
    <Stack gap="section">
      <Grid columns={2}>
        <Field label="이름" required>
          <Input name="name" autoComplete="name" />
        </Field>
        <Field label="이메일" required>
          <Input name="email" type="email" autoComplete="email" />
        </Field>
        <Field label="표시 언어">
          <Select
            name="language"
            defaultValue="ko"
            options={[
              { value: "ko", label: "한국어" },
              { value: "en", label: "English" },
            ]}
          />
        </Field>
        <Field label="시간대">
          <Input name="timezone" defaultValue="Asia/Seoul" />
        </Field>
      </Grid>
      <Text tone="muted" size="sub">
        768px 미만에서는 한 열로 쌓여요.
      </Text>
    </Stack>
  ),
};

export const Columns: Story = {
  name: "열 수 비교",
  render: () => (
    <Stack gap="section">
      {([1, 2, 3, 4, "auto"] as const).map((columns) => (
        <Stack key={columns} gap="xs">
          <Text size="sub" tone="muted">
            columns={String(columns)}
          </Text>
          <Grid columns={columns} gap="sm">
            {[1, 2, 3, 4, 5].map((index) => (
              <Tile key={index} index={index} />
            ))}
          </Grid>
        </Stack>
      ))}
    </Stack>
  ),
};
