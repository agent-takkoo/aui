import { ToggleGroup } from "@heogeon0/aui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Example, ExampleGrid } from "../examples";
const meta = {
  title: "Base/ToggleGroup",
  component: ToggleGroup,
  args: {
    disabled: false,
    "aria-label": "글자 서식",
    type: "multiple",
    defaultValue: ["bold"],
    options: [
      { value: "bold", label: "굵게" },
      { value: "italic", label: "기울임" },
      { value: "underline", label: "밑줄" },
    ],
  },
} satisfies Meta<typeof ToggleGroup>;
export default meta;
export const Default: StoryObj<typeof meta> = {};
export const States: StoryObj<typeof meta> = {
  name: "단일·복수·비활성 선택",
  parameters: { controls: { disable: true } },
  render: () => (
    <ExampleGrid>
      <Example title="단일 선택">
        <ToggleGroup
          aria-label="보기 방식"
          defaultValue="list"
          options={[
            { value: "list", label: "목록" },
            { value: "grid", label: "카드" },
          ]}
        />
      </Example>
      <Example title="복수 선택">
        <ToggleGroup
          type="multiple"
          aria-label="글자 서식 비교"
          defaultValue={["bold", "italic"]}
          options={meta.args.options}
        />
      </Example>
      <Example title="비활성">
        <ToggleGroup
          aria-label="고정된 보기 방식"
          defaultValue="list"
          disabled
          options={[
            { value: "list", label: "목록" },
            { value: "grid", label: "카드" },
          ]}
        />
      </Example>
    </ExampleGrid>
  ),
};
