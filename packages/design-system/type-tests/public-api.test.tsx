import { createRef } from "react";
import {
  Button,
  Badge,
  Icon,
  IconButton,
  Input,
  Stack,
  Grid,
  ThemeProvider,
  defineTheme,
  defaultTheme,
  Panel,
  Sidebar,
  Drawer,
  ListItem,
  Checkbox,
  Switch,
  RadioGroup,
  Select,
  Slider,
  Toggle,
  ToggleGroup,
  Tabs,
  Accordion,
  Collapsible,
  Tooltip,
  Progress,
  Table,
  TableCell,
  ScrollArea,
  AspectRatio,
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
      <ListItem
        ref={createRef<HTMLButtonElement>()}
        title="알림 설정"
        description="받을 알림을 선택해요."
        size="lg"
        trailing={<Badge tone="brand">3개</Badge>}
        onClick={(event) => event.currentTarget.focus()}
        aria-label="알림 설정 열기"
      />
      <Drawer
        title="프로젝트 선택"
        size="tall"
        header={<Input aria-label="프로젝트 검색" />}
        footer={<Button>선택 완료</Button>}
      >
        프로젝트 목록
      </Drawer>
    </Stack>
  </ThemeProvider>
);

// @ts-expect-error 화면에서 컴포넌트의 스타일을 덮어쓸 수 없다.
export const invalidClass = <Button className="bg-red-500">저장</Button>;
// @ts-expect-error ListItem은 sm·lg 두 크기만 제공한다.
export const invalidListItemSize = <ListItem title="설정" size="md" />;
export const invalidListItemStyle = (
  // @ts-expect-error ListItem의 외형을 인스턴스에서 바꾸지 않는다.
  <ListItem title="설정" style={{ padding: 30 }} />
);
// @ts-expect-error 실행 행에 선택·현재 위치를 뜻하는 selected prop을 넣지 않는다.
export const invalidListItemSelected = <ListItem title="설정" selected />;
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
// @ts-expect-error 열 수는 정해진 값에서 고른다.
export const invalidGridColumns = <Grid columns={5} />;
export const invalidGridStyle = (
  // @ts-expect-error 열 폭은 Grid가 정한다.
  <Grid style={{ gridTemplateColumns: "1fr 2fr" }} />
);
export const invalidTheme = defineTheme({
  ...defaultTheme,
  // @ts-expect-error brand는 스케일 이름이나 12단계 배열이다.
  brand: "#000",
});
export const invalidRadius = defineTheme({
  ...defaultTheme,
  // @ts-expect-error radius는 정해진 단계에서 고른다.
  radius: "0.75rem",
});
// @ts-expect-error 없앤 variant는 사용할 수 없다.
export const invalidVariant = <Button variant="outline">저장</Button>;
// @ts-expect-error Icon은 name 또는 source 중 하나를 받는다.
export const invalidIconName = <Icon name="unknown-icon" />;

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
export const invalidDrawerHeight = (
  // @ts-expect-error Drawer 높이는 정해진 size로 고른다.
  <Drawer title="설정" size="75vh">
    본문
  </Drawer>
);

// @ts-expect-error Checkbox에 primitive asChild를 열지 않는다.
export const invalidCheckbox = <Checkbox asChild />;
// @ts-expect-error Switch의 색은 theme으로 정한다.
export const invalidSwitch = <Switch color="red" />;
// @ts-expect-error RadioGroup은 임의 className을 받지 않는다.
export const invalidRadio = <RadioGroup options={[]} className="custom" />;
// @ts-expect-error Select는 옵션 배열 API를 사용한다.
export const invalidSelect = <Select options={[]} style={{ width: 100 }} />;
export const compactSelect = (
  <Select options={[]} inputSize="sm" aria-label="언어" />
);
// @ts-expect-error Select 크기는 Input과 같은 sm·md만 허용한다.
export const invalidSelectSize = <Select options={[]} inputSize="lg" />;
export const compactBadge = <Badge size="sm">상태</Badge>;
// @ts-expect-error Badge 크기는 sm·md·lg 중에서 고른다.
export const invalidBadgeSize = <Badge size="xl">상태</Badge>;
// @ts-expect-error Slider는 단일 숫자 값이다.
export const invalidSlider = <Slider value={[10, 20]} />;
// @ts-expect-error Toggle의 임의 style은 허용하지 않는다.
export const invalidToggle = <Toggle style={{ color: "red" }}>굵게</Toggle>;
export const invalidToggleGroup = (
  // @ts-expect-error multiple 모드는 문자열 배열을 받는다.
  <ToggleGroup type="multiple" value="bold" options={[]} aria-label="서식" />
);
// @ts-expect-error Tabs에는 임의 className이 없다.
export const invalidTabs = <Tabs label="설정" items={[]} className="custom" />;
export const invalidAccordion = (
  // @ts-expect-error single Accordion은 문자열 값이다.
  <Accordion type="single" value={[]} items={[]} />
);
export const invalidCollapsible = (
  // @ts-expect-error Collapsible의 트리거 외형은 패키지가 관리한다.
  <Collapsible label="설명" asChild>
    내용
  </Collapsible>
);
export const invalidTooltip = (
  // @ts-expect-error Tooltip 내용은 짧은 문자열이다.
  <Tooltip content={<Button>실행</Button>} trigger={<Button>도움말</Button>} />
);
// @ts-expect-error Progress에 접근 가능한 이름이 필요하다.
export const invalidProgress = <Progress value={20} />;
// @ts-expect-error 구식 HTML 크기 속성으로 Table 외형을 바꾸지 않는다.
export const invalidTable = <Table caption="표" width={100} />;
// @ts-expect-error 셀의 임의 정렬 속성은 허용하지 않는다.
export const invalidCell = <TableCell align="right">내용</TableCell>;
// @ts-expect-error ScrollArea 높이는 preset을 사용한다.
export const invalidScroll = <ScrollArea label="목록" height={100} />;
// @ts-expect-error AspectRatio 비율은 공개 preset을 사용한다.
export const invalidRatio = <AspectRatio ratio={2} />;
