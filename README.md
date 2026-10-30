AUI는 Theme를 주입하고 정해진 props로 조합하는 범용 React 디자인 시스템이에요.
입력·선택·탐색·데이터 표시·피드백·팝업을 패키지로 제공하고, Storybook과 E2E로 확인해요. shadcn/ui의 컴포넌트 구성과 Radix의 상호작용·접근성 패턴을 참고해요.

## 시작하기

Node.js 22.13 이상과 pnpm 11을 사용해요.

```sh
pnpm install
pnpm storybook
```

Storybook은 `http://localhost:6006`에서 열려요. 툴바에서 `defaultTheme`·`creamTheme`과 라이트·다크 모드를 바꾸고 Theme 옆의 화면 선택에서 `웹 버전`·`모바일 버전`을 선택할 수 있어요. 기본은 사용 가능한 전체 폭의 웹 버전이고, 모바일 버전은 실제 미리보기 화면을 390×844px로 바꿔요. 선택은 Docs와 Story를 이동해도 유지돼요. Docs 본문은 그대로 두고 예제의 실제 화면 크기를 바꿔요.

카탈로그와 소스 폴더는 `Global`·`Base`·`Component`·`Layout`으로 나눠요. `Global`은 Principles·Theme·Typography·Spacing, `Base`는 Button·Input·Checkbox 같은 작은 UI, `Component`는 폼·카드·Tabs·Table처럼 조합해서 쓰는 UI, `Layout`은 AppShell·PageHeader·ActionBar·Grid와 Drawer·Panel·Sidebar·ScrollArea·AspectRatio 예제를 다뤄요.

`Global/Theme`의 MDX 문서에는 Theme 객체의 필드, brand·neutral 스케일의 12단계 값, 역할 변수가 어느 단계를 쓰는지, 전체 `defaultTheme` 객체와 주입 예제가 있어요. 표와 전체 객체는 패키지가 export하는 실제 값을 읽어서 보여줘요. Theme는 색 하나하나가 아니라 brand·neutral 스케일 이름, radius 단계, scaling 밀도, 글꼴로 정해요.

## 구조

```text
packages/design-system  @heogeon0/aui — ESM, 타입, CSS, theme, ESLint
apps/storybook          컴포넌트 카탈로그, 사용 예제, 조작 가능한 props
e2e                     Storybook을 대상으로 하는 Playwright 테스트
tests                   theme과 소비 코드용 ESLint 규칙 테스트
docs                    컴포넌트 설계 기준, API 사용법, 초기 추출 기록, 모바일 검증 범위
```

컴포넌트의 역할과 확장 기준은 [컴포넌트 설계 기준](docs/extension.md)에, 초기 디자인을 가져와 일반화한 부분은 [추출 기록](docs/extraction.md)에 정리했어요.
디자인 검수에 참고할 공개 스킬·공식 가이드와 중요한 Story를 남기는 기준은 [디자인 검수 자료](docs/design-review-references.md)에 모았어요.
이를 적용한 [AUI 디자인 원칙](docs/design-principles.md)은 Storybook `Global/Principles`에서도 읽을 수 있어요. 기본 예제 외에도 variant·크기·상태와 실제 저장·취소 흐름을 비교해요.
[개선 기록](docs/design-review-2026-10-28.md)에 확인한 문제, 모바일 Select·선택 상태 색·Badge 크기 변경과 검증 범위를 남겼어요.
API 호출, 라우팅, 업무 규칙과 서비스 상태는 소비 프로젝트가 관리해요.

## 패키지 사용하기

공개 npm 패키지를 설치해요. React 19와 React DOM 19가 필요해요.

```sh
npm install @heogeon0/aui
```

로컬 변경을 배포 전에 확인하려면 tarball을 만들어 설치해요.

```sh
pnpm pack:package
```

`artifacts/heogeon0-aui-0.0.1.tgz`를 소비 프로젝트에 설치해요.

```sh
pnpm add /path/to/ai-system/artifacts/heogeon0-aui-0.0.1.tgz
```

앱의 진입점에서 CSS를 한 번 불러오고 theme을 주입해요. Tailwind 설정은 필요하지 않아요.

```tsx
import "@heogeon0/aui/styles.css";
import {
  Button,
  Field,
  Input,
  Stack,
  ThemeProvider,
  defaultTheme,
} from "@heogeon0/aui";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <form>
        <Stack gap="section">
          <Field label="이름" required>
            <Input name="name" autoComplete="name" />
          </Field>
          <Button type="submit">저장</Button>
        </Stack>
      </form>
    </ThemeProvider>
  );
}
```

자세한 예제는 [컴포넌트 사용법](docs/components.md)을 참고해 주세요.

AI 코딩 도구(Claude Code·Codex)로 화면을 만들 때는 소비 프로젝트 AGENTS.md에 `node_modules/@heogeon0/aui/ai/agents.md` 내용을 붙여 넣고, ESLint에 `@heogeon0/aui/eslint`의 recommended 설정을 추가해요. 패키지의 `ai/llms.txt`가 문서 목록, `ai/llms/recipes/`가 화면 레시피, `ai/skill/SKILL.md`가 Claude Code 스킬이에요.

[npm에 `@heogeon0/aui@0.0.1`을 MIT 라이선스로 공개했어요](https://www.npmjs.com/package/@heogeon0/aui). `pnpm release:check`는 전체 검사와 배포 dry-run까지 수행해요. 실제 등록 절차와 검증 결과는 [배포 안내](docs/release.md)에 정리해요.

## 검증하기

브라우저 설치는 처음 한 번 실행해요.

```sh
pnpm exec playwright install chromium webkit
pnpm check
```

`check`는 lint, 타입, theme·ESLint 테스트, 패키지·Storybook 빌드, E2E, 실제 tarball 설치 검증을 실행해요.
E2E는 데스크탑 Chromium·Android 크기의 Chromium·iPhone 크기의 WebKit에서 동작해요.
기본 화면과 팝업은 두 theme의 라이트·다크 조합으로 axe 접근성 검사도 실행해요.

필요한 검사만 실행할 수도 있어요.

```sh
pnpm typecheck
pnpm test:unit
pnpm test:e2e
pnpm test:package
pnpm exec playwright show-report
```

브라우저 테스트와 실제 Capacitor 앱 검증의 차이는 [모바일 대응](docs/mobile.md)에 정리했어요.

## 라이선스

[MIT 라이선스](LICENSE)로 제공해요. npm 패키지에도 같은 LICENSE 파일을 포함하며, 외부 dependency는 각각의 라이선스를 따라요.
