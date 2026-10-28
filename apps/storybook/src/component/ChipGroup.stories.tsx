import {
  ChipGroup,
  ChipInput,
  Container,
  Stack,
  Text,
} from "@ai-system/design-system";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

const meta = {
  id: "components-chip-group",
  title: "Component/ChipGroup",
  parameters: {
    docs: {
      description: {
        component:
          "줄바꿈되는 칩 여러 개 중 하나를 고르는 단일 선택이에요. 선택지가 넷 이상이라 SegmentedControl에 안 들어갈 때 사용해요. RadioGroup으로 구성해 방향키로 옮기고, ChipInput을 끝에 붙여 직접 입력 값을 받을 수 있어요.",
      },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const stopOptions = [
  { value: "0", label: "도착하면" },
  { value: "1", label: "1정거장 전" },
  { value: "2", label: "2정거장 전" },
  { value: "3", label: "3정거장 전" },
] as const;

function ChipDemo() {
  const [value, setValue] = useState<"0" | "1" | "2" | "3">("1");
  return (
    <Container width="form">
      <Stack gap="section">
        <ChipGroup
          ariaLabel="몇 정거장 전"
          options={stopOptions}
          value={value}
          onValueChange={setValue}
        />
        <Text role="status">
          선택: {stopOptions.find((option) => option.value === value)?.label}
        </Text>
      </Stack>
    </Container>
  );
}
export const Default: Story = {
  name: "단일 선택",
  render: () => <ChipDemo />,
};

const meterOptions = [
  { value: "300", label: "300m" },
  { value: "500", label: "500m" },
  { value: "1000", label: "1000m" },
] as const;

function ChipInputDemo() {
  const [value, setValue] = useState<string | null>("500");
  const [custom, setCustom] = useState("");
  return (
    <Container width="form">
      <Stack gap="section">
        <ChipGroup
          ariaLabel="몇 미터 전"
          options={meterOptions}
          value={value as "300" | "500" | "1000" | null}
          onValueChange={(next) => {
            setCustom("");
            setValue(next);
          }}
          trailing={
            <ChipInput
              label="직접"
              unit="m"
              placeholder="800"
              value={custom}
              onChange={setCustom}
              onCommit={(raw) => {
                if (raw.trim()) setValue(null);
              }}
            />
          }
        />
        <Text role="status">
          선택: {value ? `${value}m` : custom ? `${custom}m (직접)` : "없음"}
        </Text>
      </Stack>
    </Container>
  );
}
export const WithInput: Story = {
  name: "직접 입력 칩",
  render: () => <ChipInputDemo />,
};
