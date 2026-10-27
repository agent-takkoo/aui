기존 서비스에서 추출한 공통 React UI예요. 버튼, 입력, 카드, 선택, 피드백, 팝업을 제공해요.
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

기본 글꼴은 Pretendard를 우선하는 시스템 글꼴이에요. 원본과 같은 글꼴이 필요하면 소비 프로젝트에서 Pretendard를 설치하고 CSS를 불러와 주세요. 패키지가 폰트를 자동으로 다운로드하지는 않아요.

`className`, `style`, `color` 대신 정해진 `variant`, `size`를 선택하고, 프로젝트 색상은 `ThemeProvider`에 주입해요. Portal로 열린 팝업도 가까운 provider의 theme을 유지해요.

이 패키지는 기존 서비스의 API·금융 계산·Capacitor 플러그인·라우터에 의존하지 않아요.
