import { createRef } from "react";
import {
  Button,
  Icon,
  IconButton,
  Input,
  Stack,
  ThemeProvider,
  defineTheme,
  defaultTheme,
  Panel,
  Sidebar,
  Drawer,
} from "../src/index.js";

export const valid = (
  <ThemeProvider>
    <Stack gap="section">
      <Button
        type="submit"
        variant="primary"
        size="sm"
        aria-label="저장"
        onClick={(event) => event.currentTarget.focus()}
      >
        저장
      </Button>
      <Input
        ref={createRef<HTMLInputElement>()}
        inputMode="decimal"
        autoComplete="off"
        onChange={(event) => event.currentTarget.select()}
      />
      <IconButton label="추가" icon={<Icon name="plus" />} />
    </Stack>
  </ThemeProvider>
);

// @ts-expect-error 화면에서 컴포넌트의 스타일을 덮어쓸 수 없다.
export const invalidClass = <Button className="bg-red-500">저장</Button>;
// @ts-expect-error inline style은 theme과 컴포넌트 내부에서 관리한다.
export const invalidStyle = <Input style={{ padding: 1 }} />;
// @ts-expect-error 임의 색상은 공개 API에 없다.
export const invalidColor = <Button color="red">저장</Button>;
// @ts-expect-error 없는 크기는 사용할 수 없다.
export const invalidSize = <Button size="xl">저장</Button>;
export const invalidAsChild = (
  // @ts-expect-error asChild로 임의 디자인을 주입하지 않는다.
  <Button asChild>
    <a href="/">이동</a>
  </Button>
);
// @ts-expect-error 아이콘 버튼의 접근 가능한 이름은 필수다.
export const invalidIcon = <IconButton icon={<Icon name="plus" />} />;
// @ts-expect-error 간격은 정해진 값에서 고른다.
export const invalidSpace = <Stack gap={13} />;
export const invalidTheme = defineTheme({
  ...defaultTheme,
  // @ts-expect-error light의 token을 일부만 제공할 수 없다.
  light: { primary: "#000" },
});

export const invalidPanel = (
  // @ts-expect-error Panel에도 임의 스타일을 전달하지 않는다.
  <Panel title="정보" style={{ color: "red" }}>
    본문
  </Panel>
);
// @ts-expect-error Sidebar의 색은 theme이 맡는다.
export const invalidSidebar = <Sidebar label="탐색" items={[]} color="red" />;
export const invalidDrawer = (
  // @ts-expect-error Drawer의 외형을 덮어쓰지 않는다.
  <Drawer title="설정" className="custom">
    본문
  </Drawer>
);
