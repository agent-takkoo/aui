초기 기본 컴포넌트의 외형은 기존 서비스 `packages/ui`에서 일반화했어요.
초기 추출 기준은 원본 저장소의 commit `fe5e4ca`예요. 이후 범용 입력·탐색·피드백·데이터 표시로 확장해요.

[shadcn/ui](https://ui.shadcn.com/docs/components)의 컴포넌트 구성과 [Radix Themes](https://www.radix-ui.com/themes/docs/overview/getting-started)의 Theme 기반 선택지를 참고하고, [Radix Primitives](https://www.radix-ui.com/primitives/docs/overview/introduction)를 사용해요.
외부 라이브러리는 각각의 라이선스를 따라요. Radix와 class-variance-authority는 번들에 복제하지 않고 dependency로 참조해요.

원본의 가계부 의미색과 API, 금융 데이터 타입, 이미지와 로고는 포함하지 않아요.
