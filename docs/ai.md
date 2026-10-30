AI 문서는 공개 타입·기본값·예제에서 생성한다. 설명은 선택 기준과 주의사항만 적는다.

- `packages/design-system/docs/catalog.mjs`: 공개 API의 역할·제약·Storybook 연결.
- `packages/design-system/docs/examples.tsx`: 타입 검사하는 사용 예제.
- `packages/design-system/docs/guide.md`: 공통 설정.

`pnpm docs:generate`로 생성하고 `pnpm docs:check`로 최신 여부를 확인한다. build·prepack에서도 생성한다. 공개 API 누락이나 예제 타입 오류가 있으면 실패한다. 생성된 `packages/design-system/ai`는 직접 수정하지 않는다.

`docs/catalog.mjs`의 `recipes`는 화면 단위 예제다. 목록·설정 폼·상세·모달 폼·앱 레이아웃 다섯 개를 `ai/llms/recipes/`에 생성하고 `llms.txt`의 "화면 레시피"에 싣는다. AI는 컴포넌트 문서보다 레시피를 먼저 복사한다.

`docs/guide.md`는 하지 않는 것·화면을 만드는 순서·컴포넌트 선택 기준을 담은 공통 규칙이다. `docs/agents.md`는 소비 프로젝트 AGENTS.md에 붙여 넣는 규칙이고 `docs/skill/SKILL.md`는 Claude Code 스킬이다. 셋 다 `ai/`로 복사되어 `@heogeon0/aui/agents.md`, `@heogeon0/aui/skill/SKILL.md`로 배포된다.

Storybook의 **AI 문서**에서 개별 문서를 복사하거나 열 수 있다. `/llms.txt`는 목록, `/llms-full.txt`는 전체 문서다. 다음 npm 배포부터 `@heogeon0/aui/llms.txt`, `@heogeon0/aui/llms/Button.md` 등으로 경로를 찾는다. 런타임 import용 모듈은 아니다.

[hiworks-ui-components](https://gitlab.gabia.com/ui/hiworks-ui-components/-/tree/d01eeaad8d6e6f7ee211582f426127f664cfdc91)의 타입·예제 기반 생성과 Storybook 복사 흐름을 참고했다. AUI는 공개 export 누락 검사, 예제 타입 검사, npm 문서 포함을 함께 적용한다. 목록 형식은 [llms.txt 제안](https://llmstxt.org/)을 따른다.
