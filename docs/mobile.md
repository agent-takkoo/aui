웹과 Capacitor 앱이 같은 React UI를 사용한다는 전제로 디자인을 추출했어요.
패키지는 네이티브 플러그인을 import하지 않고 브라우저에서 동작하는 UI와 접근성을 제공해요.

## 패키지가 처리하는 것

- 터치 환경의 작은 버튼과 필터는 최소 44px, 입력 글자는 최소 16px을 사용해요.
- Drawer는 좁은 화면에서 아래에, 1024px 이상에서 오른쪽에 열려요. 입력은 theme의 input 역할을 사용하며 최소 16px을 유지해요.
- 팝업은 `visualViewport`의 크기와 offset을 구독해 실제 보이는 범위 안에 놓아요. 안전 영역은 CSS `env(safe-area-inset-*)`로 처리해요.
- 본문 스크롤과 고정 footer를 나누고 화면 키보드가 차지한 영역만큼 footer의 안전 영역 여백을 보정해요.
- 키보드 포커스, Escape, 팝업을 닫은 뒤의 포커스 복귀와 `prefers-reduced-motion`을 지원해요.

소비 앱의 viewport에는 `width=device-width, initial-scale=1, viewport-fit=cover`를 설정해요. 확대를 막는 `maximum-scale=1`은 사용하지 않아요.

## 테스트 범위

Playwright는 데스크탑 Chromium, Pixel 7 크기의 Chromium, iPhone 13 크기의 WebKit을 사용해요. 입력·선택·검증·취소·저장·포커스와 화면 폭별 overflow를 확인해요. 두 theme의 라이트·다크 기본 화면과 팝업은 axe로 검사해요.

E2E는 6007 포트에서 빌드한 Storybook을 실행해요. 6006 포트의 개발 서버와 분리해 개발 중에도 같은 배포 파일을 검사해요.

이 검사는 브라우저에서 동작해요. 실제 Capacitor의 WKWebView·Android WebView, 키보드 애니메이션, native back, 진동, 알림 권한은 실행하지 않아요. 시트·기본 화면 스크린샷은 Playwright 리포트에 첨부해요.

## 소비 앱에서 확인할 것

실제 앱에서는 노치·홈 인디케이터, 화면 키보드 열기·닫기, 입력으로 스크롤 이동하기, 회전하기를 확인해요. Android 뒤로 가기는 소비 앱의 Capacitor App 플러그인과 라우터가 열린 팝업을 먼저 닫도록 연결해요. 네이티브 동작을 추가할 때 패키지에 플랫폼 조건을 흩어 넣지 않아요.
