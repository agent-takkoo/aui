import { ScrollArea, Stack, Text } from "@ai-system/design-system";
import type { Meta, StoryObj } from "@storybook/react-vite";
const meta = {
  title: "Layout/ScrollArea",
  component: ScrollArea,
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
