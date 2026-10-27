기존 서비스 `packages/ui`의 공통 디자인과 컴포넌트 구성을 바탕으로 만들었어요.
추출 기준은 원본 저장소의 commit `fe5e4ca`예요.

shadcn/ui의 컴포넌트 구성 방식을 참고하고 Radix의 headless primitive를 사용해요.
외부 라이브러리는 각각의 라이선스를 따라요. Radix와 class-variance-authority는 번들에 복제하지 않고 dependency로 참조해요.

원본의 가계부 의미색과 API, 금융 데이터 타입, 이미지와 로고는 포함하지 않아요.
