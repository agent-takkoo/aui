import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
} from "@heogeon0/aui";
import type { Meta, StoryObj } from "@storybook/react-vite";
const meta = {
  title: "Component/Table",
  component: Table,
  args: { caption: "문서 현황" },
  argTypes: {
    caption: {
      description: "스크린리더용 표 이름이에요. 화면에는 표시하지 않아요.",
    },
  },
} satisfies Meta<typeof Table>;
export default meta;
export const Default: StoryObj<typeof meta> = {
  render: (args) => (
    <Table {...args}>
      <TableHeader>
        <TableRow>
          <TableHead>문서</TableHead>
          <TableHead>담당자</TableHead>
          <TableHead>상태</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableHead scope="row">사용 안내</TableHead>
          <TableCell>지수</TableCell>
          <TableCell>게시됨</TableCell>
        </TableRow>
        <TableRow>
          <TableHead scope="row">설정 안내</TableHead>
          <TableCell>민준</TableCell>
          <TableCell>검토 중</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>문서 2개</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
};
