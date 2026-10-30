---
name: aui
description: "@heogeon0/aui 디자인 시스템으로 React 화면을 만들 때 쓴다. 페이지·폼·목록·상세·모달·앱 셸을 짜거나 기존 화면을 AUI 컴포넌트로 옮길 때, 또는 Button·Field·Grid·PageHeader 같은 AUI 컴포넌트의 props와 선택 기준이 필요할 때 사용한다."
---

# AUI로 화면 만들기

## 먼저 읽을 것

1. `node_modules/@heogeon0/aui/ai/llms/guide.md`: 하지 않는 것, 화면을 만드는 순서, 어떤 컴포넌트를 쓸지.
2. 만들 화면과 가장 가까운 레시피: `node_modules/@heogeon0/aui/ai/llms/recipes/` 아래 `list-screen`·`settings-form`·`detail-screen`·`dialog-form`·`app-layout`.
3. 쓰려는 컴포넌트의 문서: `node_modules/@heogeon0/aui/ai/llms/<이름>.md`. props 표와 예제가 있다.

## 작업 순서

1. 레시피를 복사해 시작한다. 틀(`AppShell`·`Container`·`Stack`)과 제목(`PageHeader`)을 먼저 놓는다.
2. 내용은 `Grid`·`Inline`·`Stack`으로 배치하고 `Card`·`Panel`로 묶는다. HTML 요소에 `style`·`className`을 쓰지 않는다.
3. 입력은 `Field`로 감싸고 `name`을 적는다. 하단 저장 바는 `ActionBar`, 주요 행동 버튼은 하나만 `primary`.
4. 빈 상태·오류·로딩·알림·확인은 `EmptyState`·`ErrorState`·`LoadingState`·`useToast`·`ConfirmDialog`로 처리한다.
5. `pnpm lint`를 돌려 `@heogeon0/aui/eslint` 규칙을 통과시킨다.

## 막혔을 때

- 필요한 선택지가 없으면 비슷한 컴포넌트를 조합한다.
- 조합으로도 안 되면 화면에서 우회하지 말고, 어떤 prop이나 컴포넌트가 패키지에 필요한지 사용자에게 제안한다.
