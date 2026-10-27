기존 서비스에서 다른 서비스에도 재사용할 수 있는 디자인을 추출한 React 디자인 시스템이에요.
버튼·입력·카드·목록·피드백·팝업의 외형과 크기 기준을 패키지로 제공하고, Storybook과 E2E로 확인해요.

## 시작하기

Node.js 22.13 이상과 pnpm 11을 사용해요.

```sh
pnpm install
pnpm storybook
```

Storybook은 `http://localhost:6006`에서 열려요. 툴바에서 `defaultTheme`·`creamTheme`과 라이트·다크 모드를 바꾸고 Theme 옆의 화면 선택에서 `웹 버전`·`모바일 버전`을 선택할 수 있어요. 기본은 사용 가능한 전체 폭의 웹 버전이고, 모바일 버전은 실제 미리보기 화면을 390×844px로 바꿔요. 선택은 Docs와 Story를 이동해도 유지돼요. Docs 본문은 그대로 두고 예제의 실제 화면 크기를 바꿔요.

카탈로그와 소스 폴더는 `Global`·`Base`·`Component`·`Layout`으로 나눠요. `Global`은 Theme·Typography·Spacing, `Base`는 Button·Input·Badge 같은 작은 UI, `Component`는 폼·카드·피드백처럼 조합해서 쓰는 UI, `Layout`은 Drawer·Panel·Sidebar 예제를 다뤄요.

`Global/Theme`의 MDX 문서에는 Theme 객체의 필드, 모든 색상 token의 역할과 라이트·다크 기본값, 전체 `defaultTheme` 객체와 주입 예제가 있어요. 표와 전체 객체는 패키지가 export하는 실제 값을 읽어서 보여줘요.

## 구조

```text
packages/design-system  @ai-system/design-system — ESM, 타입, CSS, theme, ESLint
apps/storybook          컴포넌트 카탈로그, 사용 예제, 조작 가능한 props
e2e                     Storybook을 대상으로 하는 Playwright 테스트
tests                   theme과 소비 코드용 ESLint 규칙 테스트
docs                    원본과의 대응, API 사용법, 모바일 검증 범위
```

기존 서비스에서 가져온 범위와 일반화한 부분은 [추출 기록](docs/extraction.md)에 정리했어요.
금액·지갑·거래 달력·API·로그인·크루 상태는 소비 프로젝트가 관리해요.

## 패키지 사용하기

```sh
pnpm pack:package
```

`artifacts/ai-system-design-system-0.1.0.tgz`를 소비 프로젝트에 설치해요.

```sh
pnpm add /path/to/ai-system/artifacts/ai-system-design-system-0.1.0.tgz
```

앱의 진입점에서 CSS를 한 번 불러오고 theme을 주입해요. Tailwind 설정은 필요하지 않아요.

```tsx
import "@ai-system/design-system/styles.css";
import {
  Button,
  Field,
  Input,
  Stack,
  ThemeProvider,
  defaultTheme,
} from "@ai-system/design-system";

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
