import { useState } from "react";
import { Pagination, Stack, Text } from "@heogeon0/aui";
import type { Meta, StoryObj } from "@storybook/react-vite";
const meta = {
  title: "Component/Pagination",
  component: Pagination,
  args: { pageCount: 12 },
} satisfies Meta<typeof Pagination>;
export default meta;
function Demo({ pageCount }: { pageCount: number }) {
  const [page, setPage] = useState(1);
  return (
    <Stack>
      <Pagination page={page} pageCount={pageCount} onPageChange={setPage} />
      <Text role="status">현재 {page}페이지</Text>
    </Stack>
  );
}
export const Default: StoryObj<typeof meta> = {
  args: { page: 1, onPageChange: () => {} },
  render: ({ pageCount }) => <Demo pageCount={pageCount} />,
};
