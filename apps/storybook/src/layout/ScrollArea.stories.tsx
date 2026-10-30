import {
  ScrollArea,
  Stack,
  Text,
  Field,
  Textarea,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@heogeon0/aui";
import type { Meta, StoryObj } from "@storybook/react-vite";
const meta = {
  title: "Layout/ScrollArea",
  component: ScrollArea,
  parameters: {
    docs: {
      description: {
        component:
          "투명 track · 기본 3px thumb · hover/drag 4px. 색은 Theme의 scrollbarThumb·Hover·Active를 따라요.",
      },
    },
  },
  args: {
    label: "문서 목록",
    height: "sm",
    children: (
      <Stack>
        {Array.from({ length: 30 }, (_, index) => (
          <Text key={index}>문서 {index + 1}</Text>
        ))}
      </Stack>
    ),
  },
} satisfies Meta<typeof ScrollArea>;
export default meta;
export const Default: StoryObj<typeof meta> = {};
export const Native: StoryObj<typeof meta> = {
  name: "입력과 표",
  render: () => (
    <Stack>
      <Field label="긴 메모">
        <Textarea
          rows={4}
          defaultValue={Array.from(
            { length: 24 },
            (_, i) => `메모 ${i + 1}`,
          ).join("\n")}
        />
      </Field>
      <Table caption="월별 기록">
        <TableHeader>
          <TableRow>
            {Array.from({ length: 12 }, (_, i) => (
              <TableHead key={i}>{i + 1}월</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            {Array.from({ length: 12 }, (_, i) => (
              <TableCell key={i}>{(i + 1) * 1200}</TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </Stack>
  ),
};
