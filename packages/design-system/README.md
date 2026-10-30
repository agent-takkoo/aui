AUI는 Theme를 주입해 여러 웹 서비스와 Capacitor 앱에서 사용하는 공통 React UI예요. 입력, 선택, 탐색, 데이터 표시, 피드백, 팝업을 제공해요.
React 19와 React DOM 19를 peer dependency로 사용해요.

## 설치

```sh
npm install @heogeon0/aui@0.0.1 react@^19 react-dom@^19
```

ESM 패키지이며 TypeScript 타입과 CSS를 함께 제공해요. Tailwind 설정은 필요하지 않아요.

```tsx
import "@heogeon0/aui/styles.css";
import { Button, ThemeProvider, defaultTheme } from "@heogeon0/aui";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Button>저장</Button>
    </ThemeProvider>
  );
}
```

- `@heogeon0/aui`에서 공개 컴포넌트와 타입을 가져와요.
- `@heogeon0/aui/theme`에서 theme 정의와 preset을 가져올 수 있어요.
- `@heogeon0/aui/styles.css`를 앱의 진입점에서 한 번 불러와요.
- `@heogeon0/aui/eslint`는 소비 코드의 스타일 우회, div에 style·className 사용, 다른 UI 라이브러리와 CSS 파일 import를 검사해요.
- `@heogeon0/aui/llms.txt`는 AI 코딩 도구용 문서 목록이고 `@heogeon0/aui/agents.md`는 소비 프로젝트 AGENTS.md에 붙여 넣는 규칙이에요.

기본 글꼴은 Pretendard를 우선하는 시스템 글꼴이에요. Pretendard를 사용하려면 소비 프로젝트에서 설치하고 CSS를 불러와 주세요. 패키지가 폰트를 자동으로 다운로드하지는 않아요.

`className`, `style`, `color` 대신 정해진 `variant`, `size`를 선택하고, 프로젝트 색상은 `ThemeProvider`에 주입해요. Portal로 열린 팝업도 가까운 provider의 theme을 유지해요.

API 호출, 업무 규칙, Capacitor 플러그인과 라우팅은 소비 프로젝트가 담당해요. 접근성·키보드 동작은 Radix와 HTML의 기본 동작을 사용하고, 색·글꼴·라운드는 Theme에서 받아요.

## Theme 바꾸기

```tsx
import { defineTheme, defaultTheme } from "@heogeon0/aui/theme";

export const projectTheme = defineTheme({
  name: "my-service",
  brand: "teal",
  neutral: "sage",
  radius: "large",
  scaling: "100%",
  fontFamily: defaultTheme.fontFamily,
});
```

`<ThemeProvider theme={projectTheme} mode="system" linkComponent={RouterLink}>`로 적용해요. `RouterLink`는 `href`를 라우터 Link의 `to`로 넘기는 adapter예요. 색은 Radix 12단계 스케일 이름으로 고르고 라이트·다크는 스케일이 알아서 바뀌어요. 브랜드 색이 목록에 없으면 `{ light, dark }` 12단계 배열을 넘겨요. radius·scaling·typography도 Theme에서 설정해요.

이 패키지는 [MIT 라이선스](LICENSE)로 제공해요. 저작권·허가 고지를 유지하면 상업적 사용·수정·재배포가 가능해요. 외부 dependency는 각 라이선스를 따라요.

## AI 문서

다음 배포부터 `ai/llms.txt`에 컴포넌트 문서를 포함해요. `@heogeon0/aui/llms.txt`와 `@heogeon0/aui/llms/Button.md`로도 경로를 찾을 수 있어요. props·기본값·예제는 코드에서 생성해요. 이미 배포한 0.0.1에는 포함되지 않아요.
