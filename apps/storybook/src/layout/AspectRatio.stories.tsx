import { AspectRatio, Text } from "@heogeon0/aui";
import type { Meta, StoryObj } from "@storybook/react-vite";
const meta = {
  title: "Layout/AspectRatio",
  component: AspectRatio,
  args: { ratio: "16:9", children: <Text>미디어가 들어갈 영역이에요.</Text> },
} satisfies Meta<typeof AspectRatio>;
export default meta;
export const Default: StoryObj<typeof meta> = {};
