import {
  Accordion,
  Checkbox,
  Container,
  Field,
  Input,
  RadioGroup,
  ScrollArea,
  Select,
  Slider,
  Stack,
  Switch,
  Tabs,
  Text,
  Textarea,
  ToggleGroup,
} from "@heogeon0/aui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Testing/Focus",
  tags: ["!dev", "!autodocs", "!manifest"],
  args: { invalid: false },
} satisfies Meta<{ invalid: boolean }>;
export default meta;

export const Controls: StoryObj<{ invalid: boolean }> = {
  render: ({ invalid }) => (
    <Container width="form">
      <Stack>
        <Field
          label="이름"
          error={invalid ? "이름을 확인해 주세요." : undefined}
        >
          <Input />
        </Field>
        <Field
          label="메모"
          error={invalid ? "메모를 확인해 주세요." : undefined}
        >
          <Textarea />
        </Field>
        <Field
          label="언어"
          error={invalid ? "언어를 확인해 주세요." : undefined}
        >
          <Select
            defaultValue="ko"
            options={[
              { value: "ko", label: "한국어" },
              { value: "en", label: "English" },
            ]}
          />
        </Field>
        <Field
          label="이용 조건"
          error={invalid ? "이용 조건을 확인해 주세요." : undefined}
        >
          <Checkbox defaultChecked />
        </Field>
        <Field
          label="공유 범위"
          error={invalid ? "공유 범위를 확인해 주세요." : undefined}
        >
          <RadioGroup
            defaultValue="self"
            options={[
              { value: "self", label: "나만 보기" },
              { value: "team", label: "팀에 공개" },
            ]}
          />
        </Field>
        <Field
          label="알림"
          error={invalid ? "알림 설정을 확인해 주세요." : undefined}
        >
          <Switch defaultChecked />
        </Field>
        <Field
          label="음량"
          error={invalid ? "음량을 확인해 주세요." : undefined}
        >
          <Slider defaultValue={40} />
        </Field>
        <ToggleGroup
          aria-label="보기 방식"
          defaultValue="list"
          options={[
            { value: "list", label: "목록" },
            { value: "grid", label: "카드" },
          ]}
        />
        <Tabs
          label="설정"
          items={[
            {
              value: "general",
              label: "일반",
              content: <Text>일반 설정</Text>,
            },
            {
              value: "privacy",
              label: "공개",
              content: <Text>공개 설정</Text>,
            },
          ]}
        />
        <Accordion
          items={[
            { value: "help", title: "도움말", content: <Text>안내 내용</Text> },
          ]}
        />
        <ScrollArea label="문서 목록" height="sm">
          <Stack>
            {Array.from({ length: 20 }, (_, index) => (
              <Text key={index}>문서 {index + 1}</Text>
            ))}
          </Stack>
        </ScrollArea>
      </Stack>
    </Container>
  ),
};
