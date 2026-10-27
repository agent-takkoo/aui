import {
  Avatar,
  Badge,
  Button,
  Callout,
  Card,
  Dialog,
  Drawer,
  DropdownMenu,
  EmptyState,
  ErrorState,
  FilterChip,
  Input,
  LinkRow,
  LoadingState,
  Panel,
  Popover,
  SegmentedControl,
  Sidebar,
  Skeleton,
  Stack,
  Text,
  ThemeProvider,
  defaultTheme,
  defineTheme,
} from "@ai-system/design-system";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Testing/Radius",
  tags: ["!dev", "!autodocs", "!manifest"],
  args: { radius: "0px" },
  render: ({ radius }) => (
    <ThemeProvider
      theme={defineTheme({ ...defaultTheme, name: "radius-test", radius })}
    >
      <Stack>
        <Button>기본 버튼</Button>
        <Button size="sm">작은 버튼</Button>
        <Button loading>로딩 버튼</Button>
        <Input aria-label="입력" />
        <Card>
          <Text>카드</Text>
        </Card>
        <Badge>배지</Badge>
        <Callout title="안내" />
        <LinkRow href="#details" title="상세 정보" />
        <Panel title="패널">
          <Text>패널 본문</Text>
        </Panel>
        <Sidebar
          label="탐색"
          items={[{ id: "home", label: "홈", href: "#home" }]}
        />
        <SegmentedControl
          ariaLabel="보기"
          value="all"
          options={[
            { value: "all", label: "전체" },
            { value: "mine", label: "내 항목" },
          ]}
          onValueChange={() => {}}
        />
        <EmptyState title="비어 있어요" />
        <ErrorState title="오류가 있어요" />
        <LoadingState />
        <Skeleton />
        <Skeleton variant="avatar" />
        <Avatar name="사용자" />
        <FilterChip label="조건 해제" onClear={() => {}}>
          조건
        </FilterChip>
        <Dialog title="모달" trigger={<Button>모달 열기</Button>}>
          <Text>모달 본문</Text>
        </Dialog>
        <Popover title="안내 팝오버" trigger={<Button>팝오버 열기</Button>}>
          <Text>설명</Text>
        </Popover>
        <DropdownMenu
          label="메뉴"
          trigger={<Button>메뉴 열기</Button>}
          items={[{ id: "edit", label: "편집", onSelect: () => {} }]}
        />
        <Drawer title="Drawer" trigger={<Button>Drawer 열기</Button>}>
          <Text>본문</Text>
        </Drawer>
      </Stack>
    </ThemeProvider>
  ),
} satisfies Meta<{ radius: string }>;
export default meta;
export const Default: StoryObj<typeof meta> = {};
