열린 이슈의 실제 사용 조건에 맞춰 사이드바·아이콘 버튼·모바일 화면 구성요소를 확인했다. 기준은 [AUI 디자인 원칙](design-principles.md)이며, 새로운 외부 디자인을 추출하지 않았다.

- `Layout/AppShell/긴 문서와 사이드바`: Chromium 1440px 화면에서 본문을 600px 스크롤해도 메뉴가 헤더 아래에 남는 모습을 확인했다. 헤더 높이를 측정하고 사이드바에는 남은 화면 높이와 별도 스크롤을 적용했다. 자동 검사에서는 헤더 확대·헤더 없음·화면 높이 변경·`sidebarSticky=false`·모바일 숨김을 확인한다.
- `Base/IconButton/크기 비교`: Chromium 390px 화면에서 sm·md·lg 아이콘과 버튼의 균형을 확인했다. sm은 기존 작은 Button의 크기·radius를 쓰고 아이콘은 16px 기준이다. 터치 환경과 scaling 90%에서 44px 하한, 이름·키보드·loading·disabled는 자동 검사로 확인한다.
- `Component/ChipGroup/선택과 폼 제출`: 320px 크림 다크 화면에서 칩이 줄바꿈되고 선택·비활성 상태가 구분되는 모습을 확인했다. 기존 radio의 의미와 Field 연결을 사용한다. 방향키·필수값 검증·제출·reset을 자동 검사한다.
- `Component/Stat/두 열과 긴 값`: 320px 기본 라이트 화면에서 큰 값과 보조 설명이 타일 안에서 줄바꿈되는 모습을 확인했다. 타일은 Theme의 표면·typography를 따르고, 열 배치는 기존 Grid가 맡는다.
- `Layout/BottomBar/긴 본문과 하단 실행`: 320px 크림 다크 화면에서 실행 버튼이 화면 아래에 남는 모습을 확인했다. 본문 끝 여백을 실제 바 높이와 맞추고, 내용 변경·줄바꿈 뒤에도 마지막 본문을 가리지 않는지 자동 검사한다.

동작과 axe 접근성 검사는 `e2e/open-issues.spec.ts`에 있다. 추가 컴포넌트는 default·cream의 라이트·다크 조합과 320px 경계를 검사한다. ThemeProvider의 문서 배경 적용·모드와 theme 변경·옵션 해제·언마운트 복구도 같은 파일에서 검사한다. 기존 `e2e/theme-review.spec.ts`의 터치 하한 검사에는 작은 IconButton을 포함했다.

직접 본 화면은 Chromium의 위 조건에 한정한다. Playwright의 Android 크기 Chromium·iPhone 크기 WebKit은 브라우저 검사이며, 실제 Capacitor 기기와 스크린 리더를 확인한 것은 아니다.
