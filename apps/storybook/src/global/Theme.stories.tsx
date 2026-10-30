import {
  Button,
  Badge,
  Callout,
  Checkbox,
  Card,
  CardDescription,
  CardTitle,
  Field,
  Inline,
  Select,
  Stack,
  Switch,
  Tabs,
  Text,
  ToggleGroup,
  ThemeProvider,
  defaultTheme,
  defineTheme,
  colorScaleNames,
  radiusNames,
} from "@heogeon0/aui";
import type { ColorScaleName, ThemeRadius } from "@heogeon0/aui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Example, ExampleGrid } from "../examples";

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
  const [brand, setBrand] = useState<ColorScaleName>("teal");
  const [radius, setRadius] = useState<ThemeRadius>("large");
  const theme = defineTheme({
    name: `custom-${brand}-${radius}`,
    brand,
    neutral: "sage",
    radius,
    scaling: "100%",
    fontFamily: defaultTheme.fontFamily,
  });
  return (
    <Stack gap="section">
      <Inline align="start" gap="md">
        <Field
          label="브랜드 스케일"
          description="색 하나가 아니라 12단계 스케일 이름을 골라요."
        >
          <Select
            value={brand}
            onValueChange={(value) => setBrand(value as ColorScaleName)}
            options={colorScaleNames.map((name) => ({
              value: name,
              label: name,
            }))}
          />
        </Field>
        <Field
          label="radius"
          description="버튼·입력·카드·팝업이 함께 바뀌어요."
        >
          <Select
            value={radius}
            onValueChange={(value) => setRadius(value as ThemeRadius)}
            options={radiusNames.map((name) => ({ value: name, label: name }))}
          />
        </Field>
      </Inline>
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
export const StateColors: Story = {
  name: "역할별 색 배치",
  parameters: { docs: { story: { height: "760px" } } },
  render: () => (
    <ExampleGrid>
      <Example title="주요 행동 · primary">
        <Button>변경 사항 저장</Button>
        <Badge>주요 상태</Badge>
      </Example>
      <Example title="보조 행동 · secondary">
        <Button variant="secondary">취소</Button>
        <Badge tone="neutral">일반 상태</Badge>
      </Example>
      <Example title="지속되는 선택 · secondary">
        <ToggleGroup
          type="multiple"
          aria-label="서식"
          defaultValue={["bold"]}
          options={[
            { value: "bold", label: "굵게" },
            { value: "italic", label: "기울임" },
          ]}
        />
        <Tabs
          label="설정"
          items={[
            {
              value: "general",
              label: "일반",
              content: <Text>일반 설정</Text>,
            },
            {
              value: "privacy",
              label: "공개 범위",
              content: <Text>공개 범위 설정</Text>,
            },
          ]}
        />
      </Example>
      <Example title="켜짐 상태 · primary">
        <Checkbox label="알림 받기" defaultChecked />
        <Switch label="자동 저장" defaultChecked />
      </Example>
      <Example title="오류와 위험 · destructive">
        <Button variant="destructive">항목 삭제</Button>
        <Callout tone="danger" title="저장하지 못했어요.">
          <Text size="sub">입력한 내용은 유지돼요.</Text>
        </Callout>
      </Example>
    </ExampleGrid>
  ),
};
