import { useState } from "react";
import {
  Button,
  Checkbox,
  Field,
  RadioGroup,
  Select,
  Slider,
  Stack,
  Switch,
  Text,
  ThemeProvider,
  creamTheme,
} from "@heogeon0/aui";
import type { Meta, StoryObj } from "@storybook/react-vite";
const meta = {
  title: "Testing/Controls",
  tags: ["!dev", "!autodocs", "!manifest"],
} satisfies Meta;
export default meta;
function FormDemo() {
  const [result, setResult] = useState("");
  return (
    <ThemeProvider theme={creamTheme} mode="dark">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setResult(
            JSON.stringify(
              Object.fromEntries(new FormData(event.currentTarget)),
            ),
          );
        }}
      >
        <Stack>
          <Checkbox name="terms" label="약관 동의" required />
          <Checkbox
            name="partial"
            label="일부 선택"
            defaultChecked="indeterminate"
          />
          <Switch name="notifications" label="알림 받기" defaultChecked />
          <Field label="알림 빈도" description="받을 주기를 골라 주세요.">
            <RadioGroup
              name="frequency"
              defaultValue="daily"
              options={[
                { value: "daily", label: "매일" },
                { value: "disabled", label: "매시간", disabled: true },
                { value: "weekly", label: "매주" },
              ]}
            />
          </Field>
          <Field
            label="표시 언어"
            description="메뉴에 사용할 언어예요."
            error="설정을 확인해 주세요."
          >
            <Select
              name="language"
              defaultValue="ko"
              options={[
                { value: "ko", label: "한국어" },
                { value: "en", label: "English" },
                { value: "ja", label: "日本語", disabled: true },
              ]}
            />
          </Field>
          <Field label="음량" description="0부터 100까지 조절해요.">
            <Slider name="volume" defaultValue={30} step={10} />
          </Field>
          <Button type="submit">제출</Button>
          <Button type="reset" variant="secondary">
            초기화
          </Button>
          <Text role="status">{result}</Text>
        </Stack>
      </form>
    </ThemeProvider>
  );
}
export const Form: StoryObj<typeof meta> = { render: () => <FormDemo /> };
