## UI 작성 규칙 (@heogeon0/aui)

이 프로젝트의 화면은 `@heogeon0/aui` 컴포넌트만 조합해서 만든다.

- 화면 코드를 쓰기 전에 `node_modules/@heogeon0/aui/ai/llms.txt`를 읽고, 쓰려는 컴포넌트의 `node_modules/@heogeon0/aui/ai/llms/<이름>.md`를 읽는다. 화면 단위 예제는 `node_modules/@heogeon0/aui/ai/llms/recipes/`에 있다.
- HTML 요소에 `style`·`className`을 쓰지 않는다. 배치는 `Stack`·`Inline`·`Grid`·`Container`·`AppShell`·`PageHeader`·`ActionBar`, 표면은 `Card`·`Panel`, 글자는 `Text`·`Heading`을 쓴다.
- 같은 역할의 컴포넌트를 새로 만들지 않는다. 다른 UI 라이브러리, CSS 파일, 인라인 SVG를 추가하지 않는다. 아이콘은 `Icon`의 name 목록이나 `lucide-react`의 `source`로 쓴다.
- 색·글꼴·radius·간격 수치를 화면에 적지 않는다. 브랜드는 `defineTheme`에서 바꾼다.
- 입력은 `Field`로 감싸고 `name`을 적는다. 주요 행동 버튼은 화면에 하나만 `primary`다. 상태는 `Badge`·`Callout`의 tone으로 표현한다.
- 필요한 선택지가 없으면 조합으로 해결하고, 그래도 안 되면 화면에서 우회하지 말고 패키지에 추가할 prop·컴포넌트를 제안한다.
- 마치기 전에 `pnpm lint`를 통과시킨다. `@heogeon0/aui/eslint`의 recommended 설정이 위 규칙을 검사한다.
