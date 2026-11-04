import {
  BottomBar,
  Button,
  Container,
  Inline,
  Stack,
  Text,
} from "@heogeon0/aui";
import type { BottomBarProps } from "@heogeon0/aui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

const meta = {
  id: "layout-bottom-bar",
  title: "Layout/BottomBar",
  component: BottomBar,
  args: { children: null, label: "문서 저장", justify: "stretch" },
  argTypes: {
    justify: {
      control: "inline-radio",
      options: ["start", "end", "between", "stretch"],
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "화면 하단에 항상 보이는 실행 바예요. 페이지 본문 뒤에 두면 실제 높이만큼 여백을 확보하고 safe area를 포함해요. 폼 영역 안에서만 붙는 바는 ActionBar를 사용해요.",
      },
    },
  },
} satisfies Meta<typeof BottomBar>;
export default meta;
type Story = StoryObj<typeof meta>;

function Demo(args: BottomBarProps) {
  const [expanded, setExpanded] = useState(false);
  const [saved, setSaved] = useState(false);
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setSaved(true);
      }}
    >
      <Container>
        <Stack>
          {Array.from({ length: 60 }, (_, index) => (
            <Text key={index}>문서 내용 {index + 1}</Text>
          ))}
          <Text data-testid="last-content">문서의 마지막 내용이에요.</Text>
          <Text role="status">
            {saved ? "저장했어요." : "변경 사항이 있어요."}
          </Text>
        </Stack>
      </Container>
      <BottomBar {...args}>
        <Stack>
          {expanded ? (
            <Text>
              저장한 문서는 팀원에게 공유돼요. 내용을 확인한 뒤 저장해 주세요.
            </Text>
          ) : null}
          <Inline justify="between">
            <Button variant="ghost" onClick={() => setExpanded(!expanded)}>
              안내 {expanded ? "접기" : "펼치기"}
            </Button>
            <Button type="submit">저장</Button>
          </Inline>
        </Stack>
      </BottomBar>
    </form>
  );
}
export const Default: Story = {
  name: "긴 본문과 하단 실행",
  render: (args) => <Demo {...args} />,
};
