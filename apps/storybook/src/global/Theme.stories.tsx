import {
  Button,
  Card,
  CardDescription,
  CardTitle,
  Field,
  Input,
  Stack,
  ThemeProvider,
  defaultTheme,
  defineTheme,
} from "@ai-system/design-system";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

const meta = {
  id: "global-theme",
  title: "Global/Theme",
  tags: ["!autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "프로젝트의 역할색·글꼴·typography·radius를 ThemeProvider에 주입해요. light·dark를 모두 정의하고, 중첩한 Theme와 팝업도 가까운 provider의 값을 따라요.",
      },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

function CustomThemeDemo() {
  const [primary, setPrimary] = useState("#135a45");
  const theme = defineTheme({
    ...defaultTheme,
    name: "custom",
    light: { ...defaultTheme.light, primary, ring: primary },
    radius: "0.75rem",
  });
  return (
    <Stack gap="section">
      <Field
        label="프로젝트의 primary 색상"
        description="이 입력은 theme 편집 예제예요. 화면별로 색을 지정하는 props는 제공하지 않아요."
      >
        <Input
          type="color"
          value={primary}
          onChange={(event) => setPrimary(event.target.value)}
        />
      </Field>
      <ThemeProvider theme={theme}>
        <div className="docs-theme-preview">
          <Card tone="muted">
            <CardTitle>같은 카드, 다른 프로젝트</CardTitle>
            <CardDescription>
              공개 props와 레이아웃은 그대로 유지해요.
            </CardDescription>
            <Button>설정 저장</Button>
          </Card>
        </div>
      </ThemeProvider>
    </Stack>
  );
}
export const Custom: Story = {
  name: "프로젝트 theme 주입",
  render: () => <CustomThemeDemo />,
};
