import { Toggle } from "@heogeon0/aui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Example, ExampleGrid } from "../examples";
const meta = {
  title: "Base/Toggle",
  component: Toggle,
  args: {
    disabled: false,
    children: "굵게",
    "aria-label": "굵게",
    defaultPressed: false,
  },
} satisfies Meta<typeof Toggle>;
export default meta;
export const Default: StoryObj<typeof meta> = {};

export const States: StoryObj<typeof meta> = {
  name: "눌림과 비활성",
  parameters: { controls: { disable: true } },
  render: () => (
    <ExampleGrid>
      <Example title="꺼짐">
        <Toggle>굵게</Toggle>
      </Example>
      <Example title="켜짐">
        <Toggle defaultPressed>기울임</Toggle>
      </Example>
      <Example title="비활성">
        <Toggle disabled defaultPressed>
          밑줄
        </Toggle>
      </Example>
    </ExampleGrid>
  ),
};
