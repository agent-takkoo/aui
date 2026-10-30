import {
  Badge,
  Button,
  Callout,
  Card,
  Dialog,
  Field,
  Input,
  Popover,
  Select,
  Sidebar,
  Stack,
  Tabs,
  Text,
  ThemeProvider,
  Toggle,
  defaultTheme,
  defineTheme,
} from "@heogeon0/aui";
import type { ColorMode, ColorSteps } from "@heogeon0/aui";
import type { Meta, StoryObj } from "@storybook/react-vite";

// 브랜드 스케일을 눈에 띄는 보라 계열 custom 배열로 주입해 단계 연결을 확인한다.
const purpleLight: ColorSteps = [
  "#fefcff",
  "#fbf7fe",
  "#f7edfe",
  "#f2e2fc",
  "#ead5f9",
  "#e0c4f4",
  "#d1afec",
  "#be93e4",
  "#8e4ec6",
  "#8347b9",
  "#8145b5",
  "#402060",
];
const purpleDark: ColorSteps = [
  "#18111b",
  "#1e1523",
  "#301c3b",
  "#3d224e",
  "#48295c",
  "#54346b",
  "#664282",
  "#8457aa",
  "#8e4ec6",
  "#9a5cd0",
  "#d19dff",
  "#ecd9fa",
];
const customTheme = defineTheme({
  name: "surface-test",
  brand: { light: purpleLight, dark: purpleDark },
  neutral: "mauve",
  radius: "medium",
  fontFamily: defaultTheme.fontFamily,
});
const nestedTheme = defineTheme({
  name: "surface-nested",
  brand: "grass",
  neutral: "sage",
  radius: "none",
  fontFamily: defaultTheme.fontFamily,
});

const meta = {
  title: "Testing/ThemeColors",
  tags: ["!dev", "!autodocs", "!manifest"],
  args: { mode: "light" },
} satisfies Meta<{ mode: ColorMode }>;
export default meta;

export const Surfaces: StoryObj<{ mode: ColorMode }> = {
  render: ({ mode }) => (
    <ThemeProvider theme={customTheme} mode={mode}>
      <Stack>
        <Text>기본 본문</Text>
        <Button>주요 실행</Button>
        <Button variant="secondary">보조 실행</Button>
        <Badge tone="brand">브랜드 배지</Badge>
        <Badge tone="brand" variant="solid">
          채운 배지
        </Badge>
        <Toggle defaultPressed>선택된 서식</Toggle>
        <Tabs
          label="화면"
          items={[
            { value: "first", label: "첫 화면", content: <Text>첫 본문</Text> },
            {
              value: "second",
              label: "다음 화면",
              content: <Text>다음 본문</Text>,
            },
          ]}
        />
        <Sidebar
          label="설정"
          currentId="general"
          items={[
            { id: "general", label: "일반 설정", href: "#general" },
            { id: "members", label: "구성원", href: "#members" },
          ]}
        />
        <Card>
          <Text>카드 본문</Text>
        </Card>
        <Callout title="안내">
          <Text>안내 본문</Text>
        </Callout>
        <Field label="이름">
          <Input />
        </Field>
        <Field label="보기 방식">
          <Select
            defaultValue="all"
            options={[
              { value: "all", label: "전체 보기" },
              { value: "mine", label: "내 항목 보기" },
            ]}
          />
        </Field>
        <Dialog title="모달" trigger={<Button>모달 열기</Button>}>
          <Text>모달 본문</Text>
          <Button>모달 실행</Button>
        </Dialog>
        <Popover title="팝오버" trigger={<Button>팝오버 열기</Button>}>
          <Text>팝오버 본문</Text>
        </Popover>
        <ThemeProvider
          theme={nestedTheme}
          mode={mode === "light" ? "dark" : "light"}
        >
          <Stack>
            <Text>중첩 본문</Text>
            <Button>중첩 실행</Button>
            <Dialog
              title="중첩 모달"
              trigger={<Button variant="secondary">중첩 모달 열기</Button>}
            >
              <Text>중첩 모달 본문</Text>
              <Button>중첩 모달 실행</Button>
            </Dialog>
          </Stack>
        </ThemeProvider>
      </Stack>
    </ThemeProvider>
  ),
};
