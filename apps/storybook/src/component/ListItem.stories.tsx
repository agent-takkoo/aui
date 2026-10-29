import {
  Badge,
  Container,
  ListItem,
  PickerRow,
  Stack,
  Text,
} from "@ai-system/design-system";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

const meta = {
  id: "components-list-item",
  title: "Component/ListItem",
  component: ListItem,
  args: {
    title: "이수역",
    description: "서울특별시 · 버스 29개",
    selected: false,
    disabled: false,
  },
  argTypes: {
    selected: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  parameters: {
    docs: {
      description: {
        component:
          "누르면 동작하는 목록 행이에요. 검색 결과·최근 항목·설정 목록처럼 제목과 보조 설명을 가진 행을 버튼 시맨틱으로 그려요. 링크 이동은 LinkRow를 사용해요. PickerRow는 라벨과 고른 값을 가로로 놓고 선택 화면을 여는 행이에요.",
      },
    },
  },
} satisfies Meta<typeof ListItem>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { name: "목록 행" };

const stops = [
  { name: "이수역", region: "서울특별시", count: 29 },
  { name: "이수역5번출구", region: "서울특별시", count: 7 },
  { name: "이수역(중)", region: "안양시 · 용인시", count: 3 },
];

function ListDemo() {
  const [picked, setPicked] = useState<string | null>(null);
  return (
    <Container width="form">
      <Stack gap="section">
        <Stack gap="none">
          {stops.map((stop, index) => (
            <ListItem
              key={stop.name}
              leading={index + 1}
              title={stop.name}
              description={`${stop.region} · 버스 ${stop.count}개`}
              selected={picked === stop.name}
              onClick={() => setPicked(stop.name)}
            />
          ))}
          <ListItem
            title="지난 승차"
            description="오늘 08:12 · 540 · 1정거장 전"
            trailing={<Badge>울렸다</Badge>}
            onClick={() => setPicked("지난 승차")}
          />
        </Stack>
        <Text role="status">선택: {picked ?? "없음"}</Text>
      </Stack>
    </Container>
  );
}

export const List: Story = {
  name: "선택과 배지",
  render: () => <ListDemo />,
};

function PickerDemo() {
  const [bus, setBus] = useState<string | null>("540 군포공영차고지 → 고속터미널");
  const [stop, setStop] = useState<string | null>(null);
  return (
    <Container width="form">
      <Stack gap="none">
        <PickerRow
          label="탈 버스"
          value={bus ?? undefined}
          placeholder="몰라도 된다"
          onClear={() => setBus(null)}
          onClick={() => setBus("4212 남태령역 → 용마산빌라")}
        />
        <PickerRow
          label="내릴 정류장"
          value={stop ?? undefined}
          placeholder="정류장 이름"
          onClear={() => setStop(null)}
          onClick={() => setStop("이수역")}
        />
      </Stack>
    </Container>
  );
}

export const Picker: Story = {
  name: "선택 행",
  render: () => <PickerDemo />,
};
