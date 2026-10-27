import {
  Container,
  EmptyState,
  FilterChip,
  Inline,
  SegmentedControl,
  Stack,
  Text,
} from "@ai-system/design-system";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

const meta = {
  id: "components-selection",
  title: "Component/Selection",
  parameters: {
    docs: {
      description: {
        component:
          "기존 서비스 segmented-control.tsx의 움직이는 선택 면과 filter-chip.tsx의 해제 버튼을 추출했어요. 세그먼트는 단일 선택을 나타내는 RadioGroup으로 구성해서 방향키·Home·End를 지원해요. 옵션마다 className을 받는 API는 제거했어요.",
      },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
const options = [
  { value: "all", label: "전체" },
  { value: "active", label: "진행 중" },
  { value: "done", label: "완료" },
] as const;
function SelectionDemo() {
  const [value, setValue] = useState<"all" | "active" | "done">("all");
  const [filters, setFilters] = useState(["내 항목", "이번 달"]);
  return (
    <Container width="form">
      <Stack gap="section">
        <SegmentedControl
          options={options}
          value={value}
          onValueChange={setValue}
          ariaLabel="항목 상태"
        />
        <Text role="status">
          선택: {options.find((option) => option.value === value)?.label}
        </Text>
        <Inline>
          {filters.map((filter) => (
            <FilterChip
              key={filter}
              label={`${filter} 조건 해제`}
              onClear={() =>
                setFilters((current) =>
                  current.filter((item) => item !== filter),
                )
              }
            >
              {filter}
            </FilterChip>
          ))}
        </Inline>
        {filters.length === 0 ? (
          <EmptyState title="모든 조건을 해제했어요" />
        ) : null}
      </Stack>
    </Container>
  );
}
export const Default: Story = {
  name: "선택과 조건 해제",
  render: () => <SelectionDemo />,
};
