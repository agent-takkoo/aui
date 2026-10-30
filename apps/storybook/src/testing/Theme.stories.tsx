import {
  Breadcrumb,
  Button,
  ButtonLink,
  Checkbox,
  Dialog,
  Heading,
  Icon,
  IconButton,
  Inline,
  LinkRow,
  Sidebar,
  Stack,
  Switch,
  Text,
  ThemeProvider,
  creamTheme,
  defaultTheme,
  defineTheme,
  Input,
} from "@heogeon0/aui";
import type { LinkProps } from "@heogeon0/aui";
import type { StoryObj } from "@storybook/react-vite";
import type { CSSProperties } from "react";
import { useState } from "react";
import { Link, MemoryRouter, Route, Routes, useLocation } from "react-router";

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

function SwapDemo() {
  const [brand, setBrand] = useState<"indigo" | "ruby">("indigo");
  const theme = defineTheme({
    name: "swap-test",
    brand,
    neutral: "slate",
    radius: "medium",
    fontFamily: defaultTheme.fontFamily,
  });
  return (
    <ThemeProvider theme={theme}>
      <Stack>
        <Text role="status">현재 브랜드: {brand}</Text>
        <Button
          onClick={() => setBrand(brand === "indigo" ? "ruby" : "indigo")}
        >
          브랜드 바꾸기
        </Button>
      </Stack>
    </ThemeProvider>
  );
}
export const Swap: Story = {
  name: "같은 이름의 theme 교체",
  render: () => <SwapDemo />,
};

export const Dense: Story = {
  name: "축소 밀도",
  render: () => (
    <ThemeProvider
      theme={defineTheme({
        name: "dense-test",
        brand: "indigo",
        neutral: "slate",
        radius: "medium",
        scaling: "90%",
        fontFamily: defaultTheme.fontFamily,
      })}
    >
      <Stack>
        <Inline>
          <Button size="sm">작은 버튼</Button>
          <Button>기본 버튼</Button>
          <IconButton label="추가" icon={<Icon name="plus" />} />
        </Inline>
        <Checkbox label="동의" />
        <Switch label="알림" />
        <Input aria-label="이름" inputSize="sm" />
      </Stack>
    </ThemeProvider>
  ),
};

function RouterLink({ href, ...props }: LinkProps) {
  return <Link to={href} {...props} />;
}
function RouterDemo() {
  const location = useLocation();
  return (
    <Stack>
      <Text role="status">현재 경로: {location.pathname}</Text>
      <Routes>
        <Route path="/start" element={<Text>시작 화면</Text>} />
        <Route path="/destination" element={<Text>도착 화면</Text>} />
        <Route path="/settings" element={<Text>설정 화면</Text>} />
        <Route path="/docs" element={<Text>문서 화면</Text>} />
      </Routes>
      <Inline>
        <ButtonLink href="/destination">도착으로 이동</ButtonLink>
        <ButtonLink href="/start" variant="secondary">
          시작으로 이동
        </ButtonLink>
      </Inline>
      <LinkRow
        href="/settings"
        title="설정"
        description="LinkRow로 이동해요."
      />
      <Breadcrumb
        items={[{ label: "문서", href: "/docs" }, { label: "현재 페이지" }]}
      />
      <Sidebar
        label="메뉴"
        currentId={location.pathname.slice(1)}
        items={[
          { id: "start", label: "시작", href: "/start" },
          { id: "docs", label: "문서", href: "/docs" },
        ]}
      />
    </Stack>
  );
}
export const Router: Story = {
  name: "라우터 Link 연결",
  render: () => (
    <MemoryRouter initialEntries={["/start"]}>
      <ThemeProvider linkComponent={RouterLink}>
        <RouterDemo />
      </ThemeProvider>
    </MemoryRouter>
  ),
};
