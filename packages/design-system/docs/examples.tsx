import { useState } from "react";
import type { ReactNode } from "react";
import { Sparkles } from "lucide-react";
import {
  PageHeader,
  ActionBar,
  AppShell,
  ThemeProvider,
  defineTheme,
  defaultTheme,
  Button,
  ButtonLink,
  IconButton,
  Input,
  Textarea,
  Field,
  Label,
  Text,
  Heading,
  SectionLabel,
  Stack,
  Inline,
  Grid,
  Container,
  Separator,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Badge,
  Avatar,
  Callout,
  LinkRow,
  ListItem,
  SegmentedControl,
  FilterChip,
  EmptyState,
  ErrorState,
  LoadingState,
  Skeleton,
  Dialog,
  Drawer,
  Panel,
  Sidebar,
  ConfirmDialog,
  Popover,
  DropdownMenu,
  Icon,
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
  ToastProvider,
  useToast,
  Progress,
  Breadcrumb,
  Pagination,
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  ScrollArea,
  AspectRatio,
} from "@heogeon0/aui";

export function ThemeExample() {
  const theme = defineTheme({
    name: "project",
    brand: "teal",
    neutral: "sage",
    radius: "large",
    scaling: "100%",
    fontFamily: defaultTheme.fontFamily,
  });
  return (
    <ThemeProvider theme={theme} mode="system">
      <Button>저장</Button>
    </ThemeProvider>
  );
}
export function ButtonsExample() {
  return (
    <Inline>
      <Button type="submit">저장</Button>
      <Button variant="secondary">취소</Button>
      <Button variant="ghost" leadingIcon={<Icon name="settings" />}>
        설정
      </Button>
      <ButtonLink href="/settings" variant="secondary">
        설정 페이지
      </ButtonLink>
      <IconButton icon={<Icon name="plus" />} label="항목 추가" />
    </Inline>
  );
}
export function InputExample() {
  return (
    <Field label="이메일" required>
      <Input name="email" type="email" autoComplete="email" />
    </Field>
  );
}
export function TextareaExample() {
  return (
    <Field label="메모">
      <Textarea name="memo" />
    </Field>
  );
}
export function FieldExample() {
  return (
    <Stack>
      <Field label="이름" error="이름을 입력해 주세요." required>
        <Input name="name" />
      </Field>
      <Label htmlFor="nickname">별명</Label>
      <Input id="nickname" name="nickname" />
    </Stack>
  );
}
export function TypographyExample() {
  return (
    <Stack>
      <Heading level={1} size="title">
        설정
      </Heading>
      <SectionLabel>계정</SectionLabel>
      <Text>프로필을 관리해요.</Text>
      <Text size="caption" tone="muted">
        저장 후 적용돼요.
      </Text>
    </Stack>
  );
}
export function LayoutExample() {
  return (
    <Container width="form">
      <Stack gap="section">
        <Heading>프로필</Heading>
        <Inline justify="end">
          <Button variant="secondary">취소</Button>
          <Button>저장</Button>
        </Inline>
      </Stack>
    </Container>
  );
}
export function GridExample() {
  return (
    <Grid columns={2} gap="md">
      <Field label="이름" required>
        <Input name="name" autoComplete="name" />
      </Field>
      <Field label="이메일" required>
        <Input name="email" type="email" autoComplete="email" />
      </Field>
    </Grid>
  );
}
export function PageHeaderExample() {
  return (
    <PageHeader
      title="구성원"
      description="공간에 참여한 사람과 권한을 관리해요."
      breadcrumb={
        <Breadcrumb
          items={[{ label: "설정", href: "/settings" }, { label: "구성원" }]}
        />
      }
      actions={
        <>
          <Button variant="secondary">초대 링크 복사</Button>
          <Button leadingIcon={<Icon name="user-plus" />}>구성원 초대</Button>
        </>
      }
    />
  );
}
export function ActionBarExample() {
  return (
    <ActionBar label="저장">
      <Button variant="ghost">취소</Button>
      <Button type="submit">변경 사항 저장</Button>
    </ActionBar>
  );
}
export function AppShellExample() {
  return (
    <AppShell
      header={
        <Heading level={1} size="heading">
          관리 콘솔
        </Heading>
      }
      sidebar={
        <Sidebar
          label="메뉴"
          currentId="members"
          items={[
            { id: "general", label: "일반", href: "/settings" },
            { id: "members", label: "구성원", href: "/settings/members" },
          ]}
        />
      }
    >
      <Container width="content">
        <Text>본문</Text>
      </Container>
    </AppShell>
  );
}
export function SeparatorExample() {
  return (
    <Stack>
      <Text>기본 설정</Text>
      <Separator />
      <Text>추가 설정</Text>
    </Stack>
  );
}
export function CardExample() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>프로필</CardTitle>
        <CardDescription>계정 정보를 관리해요.</CardDescription>
      </CardHeader>
      <CardContent>
        <Text>표시할 이름을 설정해 주세요.</Text>
      </CardContent>
      <CardFooter>
        <ButtonLink href="/profile">프로필 편집</ButtonLink>
      </CardFooter>
    </Card>
  );
}
export function BadgeExample() {
  return (
    <Inline gap="xs">
      <Badge tone="success">완료</Badge>
      <Badge tone="warning">검토 중</Badge>
      <Badge tone="neutral" variant="outline" size="sm">
        초안
      </Badge>
    </Inline>
  );
}
export function AvatarExample() {
  return <Avatar name="김하늘" size="md" />;
}
export function CalloutExample() {
  return (
    <Callout
      title="설정이 필요해요"
      tone="warning"
      action={
        <ButtonLink href="/settings" size="sm">
          설정
        </ButtonLink>
      }
    >
      <Text>알림을 받을 주소를 등록해 주세요.</Text>
    </Callout>
  );
}
export function LinkRowExample() {
  return (
    <LinkRow
      href="/settings"
      title="알림 설정"
      description="받을 알림을 선택해요."
    />
  );
}
export function ListItemExample() {
  return (
    <Drawer
      title="알림 설정"
      trigger={
        <ListItem
          title="알림 설정"
          description="받을 알림을 선택해요."
          size="sm"
        />
      }
    >
      <Text>이곳에서 알림 설정을 확인해요.</Text>
    </Drawer>
  );
}
export function SelectionExample() {
  const [value, setValue] = useState("all");
  return (
    <Stack>
      <SegmentedControl
        ariaLabel="표시 범위"
        value={value}
        onValueChange={setValue}
        options={[
          { value: "all", label: "전체" },
          { value: "done", label: "완료" },
        ]}
      />
      {value === "done" && (
        <FilterChip label="완료 필터 해제" onClear={() => setValue("all")}>
          완료
        </FilterChip>
      )}
    </Stack>
  );
}
export function FeedbackExample({ retry }: { retry: () => void }) {
  return (
    <Stack>
      <EmptyState
        title="항목이 없어요"
        action={<ButtonLink href="/new">첫 항목 만들기</ButtonLink>}
      />
      <ErrorState title="불러오지 못했어요" onRetry={retry} />
      <LoadingState />
    </Stack>
  );
}
export function SkeletonExample() {
  return (
    <Stack>
      <LoadingState />
      <Skeleton variant="title" />
      <Skeleton variant="line" />
    </Stack>
  );
}
export function DialogExample() {
  return (
    <Dialog title="안내" trigger={<Button>안내 열기</Button>}>
      <Text>변경 내용을 확인해 주세요.</Text>
    </Dialog>
  );
}
export function DrawerExample() {
  const [query, setQuery] = useState("");
  return (
    <Drawer
      title="프로젝트 찾기"
      trigger={<Button variant="secondary">프로젝트 찾기</Button>}
      size="tall"
      header={
        <Input
          type="search"
          aria-label="프로젝트 검색"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      }
    >
      <Stack>
        {["프로젝트 안내", "디자인 원칙", "개발 설정"]
          .filter((name) => name.includes(query))
          .map((name) => (
            <Text key={name}>{name}</Text>
          ))}
      </Stack>
    </Drawer>
  );
}
export function PanelExample() {
  return (
    <Panel
      title="미리보기"
      footer={<ButtonLink href="/details">자세히 보기</ButtonLink>}
    >
      <Text>선택한 항목의 내용이에요.</Text>
    </Panel>
  );
}
export function SidebarExample() {
  return (
    <Drawer
      title="메뉴"
      side="left"
      trigger={<IconButton label="메뉴 열기" icon={<Icon name="menu" />} />}
    >
      <Sidebar
        label="주 메뉴"
        currentId="home"
        items={[
          { id: "home", label: "홈", href: "/" },
          { id: "settings", label: "설정", href: "/settings" },
        ]}
      />
    </Drawer>
  );
}
export function ConfirmExample({ remove }: { remove: () => Promise<void> }) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);
  return (
    <Stack>
      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        busy={busy}
        title="항목을 삭제할까요?"
        description="삭제한 항목은 되돌릴 수 없어요."
        trigger={<Button variant="destructive">삭제</Button>}
        onConfirm={async () => {
          setBusy(true);
          setFailed(false);
          try {
            await remove();
            setOpen(false);
          } catch {
            setFailed(true);
            setOpen(false);
          } finally {
            setBusy(false);
          }
        }}
      />
      {failed && (
        <ErrorState title="삭제하지 못했어요" onRetry={() => setOpen(true)} />
      )}
    </Stack>
  );
}
export function PopoverExample() {
  return (
    <Popover
      title="보기 설정"
      trigger={<Button variant="secondary">보기 설정</Button>}
    >
      <Switch label="설명 표시" defaultChecked />
    </Popover>
  );
}
export function MenuExample({ duplicate }: { duplicate: () => void }) {
  return (
    <DropdownMenu
      label="항목 작업"
      trigger={
        <IconButton label="항목 작업" icon={<Icon name="more-horizontal" />} />
      }
      items={[{ id: "copy", label: "복제", onSelect: duplicate }]}
    />
  );
}
export function IconExample() {
  return (
    <Inline>
      <Button leadingIcon={<Icon name="plus" />}>추가</Button>
      <Icon name="calendar" />
      <Icon source={Sparkles} size="sm" />
    </Inline>
  );
}
export function CheckboxExample() {
  return <Checkbox label="이용 조건에 동의해요" name="terms" required />;
}
export function SwitchExample() {
  return <Switch label="알림 받기" name="notifications" defaultChecked />;
}
export function RadioExample() {
  return (
    <Field label="공개 범위">
      <RadioGroup
        name="visibility"
        defaultValue="private"
        options={[
          { value: "private", label: "나만" },
          { value: "team", label: "팀" },
        ]}
      />
    </Field>
  );
}
export function SelectExample() {
  return (
    <Field label="언어" required>
      <Select
        name="language"
        placeholder="언어를 선택해 주세요…"
        options={[
          { value: "ko", label: "한국어" },
          { value: "en", label: "English" },
        ]}
      />
    </Field>
  );
}
export function SliderExample() {
  return (
    <Field label="음량">
      <Slider name="volume" defaultValue={30} min={0} max={100} step={5} />
    </Field>
  );
}
export function ToggleExample() {
  return (
    <Toggle aria-label="굵게" defaultPressed>
      굵게
    </Toggle>
  );
}
export function ToggleGroupExample() {
  return (
    <ToggleGroup
      aria-label="텍스트 서식"
      type="multiple"
      defaultValue={["bold"]}
      options={[
        { value: "bold", label: "굵게" },
        { value: "italic", label: "기울임" },
      ]}
    />
  );
}
export function TabsExample() {
  return (
    <Tabs
      label="계정 설정"
      items={[
        {
          value: "profile",
          label: "프로필",
          content: <Text>프로필 설정</Text>,
        },
        { value: "security", label: "보안", content: <Text>보안 설정</Text> },
      ]}
    />
  );
}
export function AccordionExample() {
  return (
    <Accordion
      items={[
        {
          value: "cancel",
          title: "취소할 수 있나요?",
          content: <Text>완료 전까지 취소할 수 있어요.</Text>,
        },
      ]}
    />
  );
}
export function CollapsibleExample() {
  return (
    <Collapsible label="추가 정보">
      <Text>선택 항목에 대한 설명이에요.</Text>
    </Collapsible>
  );
}
export function TooltipExample() {
  return (
    <Tooltip
      content="보관한 항목은 다시 확인할 수 있어요."
      trigger={<Button variant="ghost">보관 안내</Button>}
    />
  );
}
function NoticeButton() {
  const { toast } = useToast();
  return (
    <Button onClick={() => toast({ title: "알림 예제" })}>알림 보기</Button>
  );
}
export function ToastExample() {
  return (
    <ToastProvider>
      <NoticeButton />
    </ToastProvider>
  );
}
export function ProgressExample() {
  return <Progress label="파일 업로드" value={40} />;
}
export function BreadcrumbExample() {
  return <Breadcrumb items={[{ label: "홈", href: "/" }, { label: "설정" }]} />;
}
export function PaginationExample() {
  const [page, setPage] = useState(1);
  return <Pagination page={page} pageCount={10} onPageChange={setPage} />;
}
export function TableExample() {
  return (
    <Table caption="팀 구성원">
      <TableHeader>
        <TableRow>
          <TableHead>이름</TableHead>
          <TableHead>역할</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>김하늘</TableCell>
          <TableCell>관리자</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>총 1명</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
export function ScrollExample() {
  return (
    <ScrollArea label="이용 안내" height="sm">
      <Stack>
        {Array.from({ length: 10 }, (_, i) => (
          <Text key={i}>안내 항목 {i + 1}</Text>
        ))}
      </Stack>
    </ScrollArea>
  );
}
export function AspectExample() {
  return (
    <AspectRatio ratio="16:9">
      <img src="/cover.jpg" alt="게시물 표지" />
    </AspectRatio>
  );
}

export function ListScreenRecipe({
  documents,
  page,
  pageCount,
  onPageChange,
}: {
  documents: {
    id: string;
    title: string;
    owner: string;
    status: "done" | "review";
  }[];
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}) {
  const [status, setStatus] = useState("all");
  const [query, setQuery] = useState("");
  return (
    <Container width="wide">
      <Stack gap="section">
        <PageHeader
          title="문서"
          description="공간의 문서를 찾고 상태를 확인해요."
          actions={<Button leadingIcon={<Icon name="plus" />}>새 문서</Button>}
        />
        <Inline justify="between">
          <SegmentedControl
            ariaLabel="상태 필터"
            value={status}
            onValueChange={setStatus}
            options={[
              { value: "all", label: "전체" },
              { value: "review", label: "검토 중" },
              { value: "done", label: "게시됨" },
            ]}
          />
          <Field label="검색">
            <Input
              inputSize="sm"
              type="search"
              name="query"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </Field>
        </Inline>
        {documents.length === 0 ? (
          <EmptyState
            title="문서가 없어요"
            description="첫 문서를 만들어 보세요."
            action={<Button variant="secondary">새 문서</Button>}
          />
        ) : (
          <Table caption="문서 목록">
            <TableHeader>
              <TableRow>
                <TableHead>제목</TableHead>
                <TableHead>담당자</TableHead>
                <TableHead>상태</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((document) => (
                <TableRow key={document.id}>
                  <TableCell>{document.title}</TableCell>
                  <TableCell>{document.owner}</TableCell>
                  <TableCell>
                    <Badge
                      tone={document.status === "done" ? "success" : "warning"}
                    >
                      {document.status === "done" ? "게시됨" : "검토 중"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        <Inline justify="center">
          <Pagination
            page={page}
            pageCount={pageCount}
            onPageChange={onPageChange}
          />
        </Inline>
      </Stack>
    </Container>
  );
}
export function SettingsFormRecipe({
  onSubmit,
  error,
}: {
  onSubmit: (data: FormData) => void;
  error?: string;
}) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(new FormData(event.currentTarget));
      }}
    >
      <Container width="content">
        <Stack gap="section">
          <PageHeader
            title="공간 설정"
            description="이름과 공개 범위를 관리해요."
          />
          <Grid columns={2}>
            <Field label="공간 이름" required error={error}>
              <Input name="name" autoComplete="organization" />
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
          </Grid>
          <Field label="소개">
            <Textarea name="description" />
          </Field>
          <Field label="공개 범위" description="새 문서의 기본 공개 범위예요.">
            <RadioGroup
              name="visibility"
              defaultValue="private"
              options={[
                { value: "private", label: "나만 보기" },
                { value: "team", label: "팀에 공개" },
              ]}
            />
          </Field>
          <Checkbox
            name="digest"
            label="활동 요약을 이메일로 받기"
            defaultChecked
          />
        </Stack>
      </Container>
      <ActionBar label="저장">
        <Button variant="ghost" type="reset">
          기본값으로
        </Button>
        <Button type="submit">설정 저장</Button>
      </ActionBar>
    </form>
  );
}
export function DetailScreenRecipe({
  onDelete,
}: {
  onDelete: () => Promise<void>;
}) {
  const [confirming, setConfirming] = useState(false);
  const [busy, setBusy] = useState(false);
  return (
    <Container width="content">
      <Stack gap="section">
        <PageHeader
          title="2026년 10월 청구서"
          description="사용량 기준으로 계산했어요."
          breadcrumb={
            <Breadcrumb
              items={[{ label: "결제", href: "/billing" }, { label: "청구서" }]}
            />
          }
          actions={
            <>
              <ButtonLink
                href="/billing/invoices/2026-10/pdf"
                variant="secondary"
              >
                PDF 내려받기
              </ButtonLink>
              <DropdownMenu
                label="청구서 작업"
                trigger={
                  <IconButton
                    label="청구서 작업"
                    icon={<Icon name="more-horizontal" />}
                  />
                }
                items={[
                  { id: "resend", label: "다시 보내기", onSelect: () => {} },
                  {
                    id: "delete",
                    label: "삭제",
                    destructive: true,
                    onSelect: () => setConfirming(true),
                  },
                ]}
              />
            </>
          }
        />
        <Grid columns={2}>
          <Card>
            <CardHeader>
              <CardTitle>청구 금액</CardTitle>
              <CardDescription>부가세 포함</CardDescription>
            </CardHeader>
            <CardContent>
              <Heading level={3} size="display">
                ₩128,000
              </Heading>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>상태</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge tone="warning">결제 대기</Badge>
            </CardContent>
          </Card>
        </Grid>
        <Callout title="결제 수단이 곧 만료돼요." tone="warning">
          <Text size="sub">만료되면 자동 결제가 중단돼요.</Text>
        </Callout>
        <ConfirmDialog
          open={confirming}
          onOpenChange={setConfirming}
          title="청구서를 삭제할까요?"
          description="삭제한 청구서는 복구할 수 없어요."
          busy={busy}
          onConfirm={async () => {
            setBusy(true);
            await onDelete();
            setBusy(false);
            setConfirming(false);
          }}
        />
      </Stack>
    </Container>
  );
}
export function DialogFormRecipe({
  onSave,
}: {
  onSave: (name: string) => Promise<void>;
}) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [pending, setPending] = useState(false);
  const { toast } = useToast();
  return (
    <Dialog
      title="공간 이름 바꾸기"
      description="구성원에게 보이는 이름이에요."
      open={open}
      onOpenChange={setOpen}
      trigger={<Button variant="secondary">이름 바꾸기</Button>}
      footer={
        <>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            취소
          </Button>
          <Button type="submit" form="rename-form" loading={pending}>
            저장
          </Button>
        </>
      }
    >
      <form
        id="rename-form"
        onSubmit={async (event) => {
          event.preventDefault();
          setPending(true);
          await onSave(name);
          setPending(false);
          setOpen(false);
          toast({ title: "이름을 바꿨어요" });
        }}
      >
        <Field label="새 이름" required>
          <Input
            name="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </Field>
      </form>
    </Dialog>
  );
}
export function AppLayoutRecipe({ children }: { children: ReactNode }) {
  const items = [
    { id: "overview", label: "개요", href: "/" },
    { id: "members", label: "구성원", href: "/members" },
    { id: "billing", label: "결제", href: "/billing" },
  ];
  return (
    <AppShell
      header={
        <Inline justify="between" wrap={false}>
          <Inline gap="sm">
            <Drawer
              side="left"
              title="메뉴"
              trigger={
                <IconButton label="메뉴 열기" icon={<Icon name="menu" />} />
              }
            >
              <Sidebar label="메뉴" currentId="members" items={items} />
            </Drawer>
            <Heading level={1} size="heading">
              관리 콘솔
            </Heading>
          </Inline>
          <Avatar name="김하늘" />
        </Inline>
      }
      sidebar={<Sidebar label="메뉴" currentId="members" items={items} />}
    >
      {children}
    </AppShell>
  );
}
