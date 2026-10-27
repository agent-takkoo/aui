import {
  Button,
  Dialog,
  Heading,
  Stack,
  Text,
  ThemeProvider,
  creamTheme,
  defaultTheme,
  defineTheme,
  Input,
} from "@ai-system/design-system";
import type { StoryObj } from "@storybook/react-vite";
import type { CSSProperties } from "react";

const meta = {
  id: "testing-theme",
  title: "Testing/Theme",
  tags: ["!dev", "!autodocs", "!manifest"],
};
export default meta;
type Story = StoryObj<typeof meta>;
export const Typography: Story = {
  render: () => (
    <ThemeProvider
      theme={defineTheme({
        ...defaultTheme,
        name: "typography-test",
        fontFamily: "serif",
        typography: {
          ...defaultTheme.typography,
          body: {
            size: "1.25rem",
            lineHeight: "2rem",
            weight: 450,
            letterSpacing: "0.02em",
          },
          input: { ...defaultTheme.typography.input, size: "0.5rem" },
        },
      })}
    >
      <Text>Theme 본문</Text>
      <Input aria-label="최소 글자 크기" />
    </ThemeProvider>
  ),
};
export const Nested: Story = {
  name: "중첩 theme과 팝업",
  render: () => (
    <ThemeProvider theme={defaultTheme} mode="dark">
      <div className="docs-theme-preview">
        <Stack>
          <Text>바깥은 기본 theme의 다크 모드예요.</Text>
          <ThemeProvider theme={creamTheme} mode="light">
            <div className="docs-theme-preview">
              <Stack>
                <Text>안쪽은 크림 라이트예요.</Text>
                <Dialog
                  title="안쪽 theme의 팝업"
                  description="Portal로 열린 팝업도 크림 라이트의 색을 사용해요."
                  trigger={<Button>안쪽 팝업 열기</Button>}
                >
                  <Text>이 팝업의 배경과 버튼은 같은 theme을 따라요.</Text>
                  <Button>확인</Button>
                </Dialog>
              </Stack>
            </div>
          </ThemeProvider>
        </Stack>
      </div>
    </ThemeProvider>
  ),
};

export const System: Story = {
  name: "시스템 색상 모드",
  render: () => (
    <ThemeProvider theme={defaultTheme} mode="system">
      <div className="docs-theme-preview">
        <Heading size="title">기기 설정을 따라요.</Heading>
        <Text>페이지를 다시 열지 않아도 모드 변경을 반영해요.</Text>
        <Button>계속</Button>
      </div>
    </ThemeProvider>
  ),
};

// 테마를 편집하는 화면에만 CSS 값을 직접 사용한다.
export const Scope: Story = {
  name: "theme 밖 스타일 보호",
  render: () => (
    <div
      style={
        {
          background: "#ffe4e6",
          color: "#881337",
          padding: "1rem",
        } as CSSProperties
      }
    >
      <p>패키지 밖의 스타일이에요.</p>
      <ThemeProvider>
        <div className="docs-theme-preview">
          <Button>범위 안의 버튼</Button>
        </div>
      </ThemeProvider>
    </div>
  ),
};
