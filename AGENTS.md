여러 웹 서비스와 Capacitor 앱에서 재사용하는 범용 React 디자인 시스템이다.
작업 전에 [컴포넌트 설계 기준](docs/extension.md)과 [컴포넌트 사용법](docs/components.md)을 읽는다. 초기 디자인의 출처는 [추출 기록](docs/extraction.md)에 남긴다.

## 작업 범위

- `packages/design-system`은 React 디자인 시스템 패키지다. shadcn/ui와 Radix의 공통 UI 패턴을 참고하며, 특정 서비스에 있었는지와 관계없이 범용 입력·탐색·피드백·데이터 표시를 제공한다.
- `apps/storybook`은 패키지를 설명하고 조작하는 공간이다. 사용 예제의 상태와 서비스 문구는 여기에 둔다.
- Storybook의 `Global`에는 Theme·Typography·Spacing, `Base`에는 Button·Input 같은 작은 UI, `Component`에는 조합한 UI, `Layout`에는 Drawer·Panel·Sidebar와 ScrollArea·AspectRatio 같은 영역 구성 예제를 둔다. 소스 폴더도 같은 기준으로 나눈다.
- `e2e`는 빌드한 패키지를 사용하는 Storybook을 Playwright로 검사한다.
- 기존 서비스 원본, API, 금융 계산, 로그인, Capacitor 네이티브 프로젝트는 이 저장소에서 수정하지 않는다.

## 디자인과 코드

- 컴포넌트를 직접 만들기 전에 `packages/design-system/src/index.ts`의 공개 목록을 확인한다.
- 화면 코드에서는 `@ai-system/design-system`과 공개 subpath만 import한다. Radix는 패키지 내부에서 사용한다.
- 동작과 접근성은 headless primitive가 맡고, 패키지의 CSS가 외형을 정한다. 소비 프로젝트는 `ThemeProvider`에 프로젝트 theme을 주입한다.
- 색과 radius, 글꼴·typography를 바꾸려면 theme을 수정한다. 컴포넌트 인스턴스의 `className`, `style`, `color`는 공개하지 않는다.
- 공통 기본 theme의 공개 이름은 `defaultTheme`이다. `Global/Theme` 문서의 필드·token 설명과 실제 값 표를 함께 관리한다.
- 화면의 간격과 배치는 `Stack`, `Inline`, `Container`의 정해진 props를 사용한다. 필요한 선택지가 없으면 실제 반복 사례를 확인해 컴포넌트 API를 확장한다.
- 기본 이벤트, form 속성, ref, ARIA 속성은 유지한다. 링크 이동에는 `ButtonLink`나 `LinkRow`를 사용한다.
- 금액·지갑·기록·거래 달력처럼 서비스 의미가 있는 타입이나 색을 패키지에 넣지 않는다.
- `Field`가 label·설명·오류를 연결한다. 입력마다 접근 가능한 이름을 제공한다.
- 터치 영역은 최소 44px, 터치 기기의 입력 글자는 최소 16px을 유지한다. 키보드 조작과 움직임 줄이기를 지원한다.
- 새로운 공개 API는 `src/index.ts`에서 명시적으로 export한다. 내부 recipe와 primitive는 export하지 않는다.
- 새 컴포넌트의 역할과 API는 `docs/components.md`에 기록한다. 원본에서 가져온 디자인을 바꾼 이유는 `docs/extraction.md`에, 범용 컴포넌트의 선택 기준과 참고 자료는 `docs/extension.md`에 기록한다.
- 폼 컨트롤은 label·오류 연결, name·value, 키보드, disabled·required, 제출·reset을 함께 고려한다. 동작이 겹치는 새 이름을 추가하기 전에 기존 API와 역할을 비교한다.
- 새 컴포넌트는 대표 Story 하나와 Controls를 기본으로 제공한다. 상태별 반복 Story는 추가하지 않고, 검증 전용 예제는 testing 폴더에서 숨긴다.

## 검증

컴포넌트를 추가하거나 동작을 바꾸면 Story와 해당 행동을 검증하는 E2E를 함께 작성한다.
API 제한을 바꾸면 `type-tests`와 ESLint 규칙 테스트를 함께 확인한다.

```sh
pnpm check
```

답변과 문서는 한국어로 작성하고, 결과와 실제 검증 범위를 먼저 설명한다.
