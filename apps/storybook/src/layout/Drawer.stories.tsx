import { Button, Drawer, Field, Input, Stack, Text } from "@heogeon0/aui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { DrawerProps } from "@heogeon0/aui";
import { useId, useState } from "react";

const meta = {
  id: "layout-drawer",
  title: "Layout/Drawer",
  component: Drawer,
  args: {
    children: null,
    title: "보기 설정",
    description: "필요한 항목을 골라 확인해 보세요.",
    trigger: <Button>시트 열기</Button>,
    size: "auto",
    side: "responsive",
  },
  argTypes: {
    title: { description: "기본 헤더의 제목이에요." },
    description: { description: "기본 헤더의 설명이에요." },
    children: { control: false },
    trigger: { control: false },
    footer: { control: false },
    header: {
      control: false,
      description: "제목·설명 아래에 고정할 검색창·필터 영역이에요.",
    },
    size: { control: "select", options: ["auto", "half", "tall", "full"] },
    onOpenChange: { control: false },
    open: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component:
          "모바일 아래·데스크탑 오른쪽에서 열려요. title·description은 기본 헤더이고, header는 그 아래에 고정할 검색창·필터 영역이에요. 본문만 스크롤하며, size로 하단 높이를 골라요.",
      },
    },
  },
} satisfies Meta<typeof Drawer>;
export default meta;
type Story = StoryObj<typeof meta>;

function DrawerDemo(args: DrawerProps) {
  const formId = useId();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [saved, setSaved] = useState("");
  const [applied, setApplied] = useState(false);
  return (
    <Stack>
      <Drawer
        {...args}
        open={open}
        onOpenChange={(next) => {
          if (next) setDraft(saved);
          setOpen(next);
        }}
        footer={
          <Button fullWidth type="submit" form={formId}>
            설정 적용
          </Button>
        }
      >
        <form
          id={formId}
          onSubmit={(event) => {
            event.preventDefault();
            setSaved(draft.trim());
            setApplied(true);
            setOpen(false);
          }}
        >
          <Stack>
            <Field label="검색어">
              <Input
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder="찾을 내용을 입력해 주세요…"
              />
            </Field>
            {Array.from({ length: 8 }, (_, index) => (
              <Text key={index}>설정 항목 {index + 1}</Text>
            ))}
          </Stack>
        </form>
      </Drawer>
      {applied && (
        <Text role="status">
          {saved ? `검색어 “${saved}”를 적용했어요.` : "모든 항목을 표시해요."}
        </Text>
      )}
    </Stack>
  );
}
export const Default: Story = {
  name: "모바일 시트와 데스크탑 옆판",
  render: (args) => <DrawerDemo {...args} />,
};

const projects = Array.from(
  { length: 30 },
  (_, index) => `프로젝트 ${String(index + 1).padStart(2, "0")}`,
);

function SearchDrawer(args: DrawerProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [draft, setDraft] = useState("");
  const [selected, setSelected] = useState("");
  const results = projects.filter((project) => project.includes(query.trim()));
  return (
    <Stack>
      <Drawer
        {...args}
        open={open}
        onOpenChange={(next) => {
          if (next) {
            setQuery("");
            setDraft(selected);
          }
          setOpen(next);
        }}
        header={
          <Input
            type="search"
            inputSize="sm"
            aria-label="프로젝트 검색"
            placeholder="프로젝트 이름을 입력해 주세요…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        }
        footer={
          <Button
            fullWidth
            disabled={!draft}
            onClick={() => {
              setSelected(draft);
              setOpen(false);
            }}
          >
            선택 완료
          </Button>
        }
      >
        <Stack gap="xs">
          {results.map((project) => (
            <Button
              key={project}
              variant={draft === project ? "secondary" : "ghost"}
              aria-pressed={draft === project}
              fullWidth
              onClick={() => setDraft(project)}
            >
              {project}
            </Button>
          ))}
          {results.length === 0 && (
            <Text tone="muted" role="status">
              검색 결과가 없어요.
            </Text>
          )}
        </Stack>
      </Drawer>
      {selected && <Text role="status">선택한 프로젝트: {selected}</Text>}
    </Stack>
  );
}

export const Search: Story = {
  name: "검색창 고정과 목록 선택",
  args: {
    title: "프로젝트 선택",
    description: "작업할 프로젝트를 골라 주세요.",
    trigger: <Button>프로젝트 선택 열기</Button>,
    size: "tall",
  },
  render: (args) => <SearchDrawer {...args} />,
};
