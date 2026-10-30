import { Slider } from "@heogeon0/aui";
import type { Meta, StoryObj } from "@storybook/react-vite";
const meta = {
  title: "Base/Slider",
  component: Slider,
  args: {
    disabled: false,
    "aria-label": "음량",
    name: "volume",
    defaultValue: 40,
    min: 0,
    max: 100,
    step: 10,
  },
} satisfies Meta<typeof Slider>;
export default meta;
export const Default: StoryObj<typeof meta> = {};
