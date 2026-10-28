Theme를 주입해 여러 서비스에서 사용하는 공통 React UI예요. 입력, 선택, 탐색, 데이터 표시, 피드백, 팝업을 제공해요.
React 19와 React DOM 19를 peer dependency로 사용해요.

```tsx
import "@ai-system/design-system/styles.css";
import { Button, ThemeProvider, defaultTheme } from "@ai-system/design-system";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Button>저장</Button>
    </ThemeProvider>
  );
}
```

- `@ai-system/design-system`에서 공개 컴포넌트와 타입을 가져와요.
- `@ai-system/design-system/theme`에서 theme 정의와 preset을 가져올 수 있어요.
- `@ai-system/design-system/styles.css`를 앱의 진입점에서 한 번 불러와요.
- `@ai-system/design-system/eslint`는 소비 코드의 스타일 우회와 primitive 직접 import를 검사해요.

기본 글꼴은 Pretendard를 우선하는 시스템 글꼴이에요. Pretendard를 사용하려면 소비 프로젝트에서 설치하고 CSS를 불러와 주세요. 패키지가 폰트를 자동으로 다운로드하지는 않아요.

`className`, `style`, `color` 대신 정해진 `variant`, `size`를 선택하고, 프로젝트 색상은 `ThemeProvider`에 주입해요. Portal로 열린 팝업도 가까운 provider의 theme을 유지해요.

API 호출, 업무 규칙, Capacitor 플러그인과 라우팅은 소비 프로젝트가 담당해요. 접근성·키보드 동작은 Radix와 HTML의 기본 동작을 사용하고, 색·글꼴·라운드는 Theme에서 받아요.
