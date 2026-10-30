import { useState } from "react";
import { Button, Field, Inline, Select, Stack, Text } from "@heogeon0/aui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Testing/Select",
  tags: ["!dev", "!autodocs", "!manifest"],
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const options = [
  { value: "a", label: "Alpha" },
  { value: "b", label: "Beta" },
];

function RequiredManyForm() {
  const [result, setResult] = useState("");
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setResult(
          JSON.stringify(Object.fromEntries(new FormData(event.currentTarget))),
        );
      }}
    >
      <Stack>
        {(["언어", "지역", "권한"] as const).map((label, index) => (
          <Field key={label} label={label} required>
            <Select name={`field-${index}`} required options={options} />
          </Field>
        ))}
        <Button type="submit">제출</Button>
        <Text role="status">{result}</Text>
      </Stack>
    </form>
  );
}
export const RequiredMany: Story = {
  name: "빈 필수 Select 여러 개",
  render: () => <RequiredManyForm />,
};

function ResetWithParentForm() {
  const [picked, setPicked] = useState("a");
  const [resets, setResets] = useState(0);
  const [result, setResult] = useState("");
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setResult(
          JSON.stringify(Object.fromEntries(new FormData(event.currentTarget))),
        );
      }}
      onReset={() => setResets((count) => count + 1)}
    >
      <Stack>
        <Field label="글자">
          <Select
            name="letter"
            defaultValue="a"
            options={options}
            onValueChange={(value) => setPicked(value)}
          />
        </Field>
        <Text>
          부모 상태: {picked} · reset {resets}회
        </Text>
        <Inline>
          <Button type="reset" variant="secondary">
            초기화
          </Button>
          <Button type="submit">제출</Button>
        </Inline>
        <Text role="status">{result}</Text>
      </Stack>
    </form>
  );
}
export const ResetWithParent: Story = {
  name: "부모 리렌더링과 reset",
  render: () => <ResetWithParentForm />,
};
