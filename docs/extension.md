AUI는 특정 서비스의 화면을 복제하는 라이브러리에서, 여러 서비스가 같은 규칙으로 UI를 만드는 공통 패키지로 확장해요. 초기 디자인의 출처는 [추출 기록](extraction.md)에 보존하고, 새 컴포넌트는 아래 기준으로 추가해요.

## 참고하는 기준

[shadcn/ui](https://ui.shadcn.com/docs/components)는 앱에서 반복해서 쓰는 UI의 구성과 조합을 참고해요. [Radix Primitives](https://www.radix-ui.com/primitives/docs/overview/introduction)는 외형과 상호작용을 분리하고 키보드·포커스·ARIA를 처리하는 기준으로 사용해요. [Radix Themes](https://www.radix-ui.com/themes/docs/overview/getting-started)는 제한된 선택지와 공통 Theme로 외형을 일관되게 구성하는 방식을 참고해요.

AUI의 공개 컴포넌트는 패키지 안의 Radix primitive를 감싸요. 소비 프로젝트는 AUI의 props와 Theme를 사용하며, 서비스마다 primitive나 CSS를 복제하지 않아요. Table·Breadcrumb처럼 HTML이 의미와 동작을 제공하는 곳에서는 해당 요소를 그대로 사용해요.

## 기본 구성요소

| 영역          | 추가하는 컴포넌트                            | 용도                                                                                             |
| ------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| 입력과 선택   | Checkbox, Switch, RadioGroup, Select, Slider | 폼 값, 설정과 조건을 입력해요. label·오류·제출·reset·키보드 동작을 함께 다뤄요.                  |
| 눌림 상태     | Toggle, ToggleGroup                          | 버튼의 켜짐 상태나 여러 선택을 표현해요.                                                         |
| 내용 전환     | Tabs, Accordion, Collapsible                 | 탭 패널과 접을 수 있는 콘텐츠를 구분해요.                                                        |
| 안내와 진행   | Tooltip, Toast, Progress                     | 짧은 보충 설명, 작업 결과, 진행 상태를 보여줘요.                                                 |
| 탐색          | Breadcrumb, Pagination                       | 현재 위치와 페이지 이동을 표현해요.                                                              |
| 데이터와 영역 | Table, ScrollArea, AspectRatio               | 표의 의미, 스크롤 범위, 미디어의 비율을 유지해요.                                                |
| 배치          | Grid                                         | 같은 폭의 열로 나누고 좁은 화면에서 한 열로 쌓아요. Stack·Inline이 다루지 못하는 2차원 배치예요. |

기존 Button·Input·Card·Dialog·Drawer 등과 함께 사용해요. `SegmentedControl`은 조건을 고르는 단일 선택이고, `Tabs`는 연결된 콘텐츠 패널을 전환해요. `Tooltip`의 설명은 필수 안내를 대신하지 않으며, 사용자 동작이 필요한 내용에는 Popover나 Dialog를 사용해요.

## 비슷한 컴포넌트를 고를 때

| 필요한 동작                              | 사용하는 컴포넌트                                                   |
| ---------------------------------------- | ------------------------------------------------------------------- |
| 동의 여부나 개별 항목을 폼 값으로 고르기 | Checkbox를 사용해요. 일부 선택 상태는 indeterminate로 표시해요.     |
| 설정의 켜짐·꺼짐 상태를 바로 바꾸기      | Switch를 사용해요.                                                  |
| 보이는 여러 선택지 중 폼 값 하나 고르기  | RadioGroup을 사용해요.                                              |
| 공간을 줄여 단일 선택지 목록을 열기      | Select를 사용해요.                                                  |
| 적은 수의 필터 조건 하나 고르기          | SegmentedControl을 사용해요.                                        |
| 버튼의 눌림 상태나 서식 선택을 유지하기  | Toggle 또는 ToggleGroup을 사용해요.                                 |
| 선택한 제목에 연결된 콘텐츠를 보여주기   | Tabs를 사용해요.                                                    |
| 짧은 추가 설명을 hover·focus로 보여주기  | Tooltip을 사용해요. 중요한 안내는 본문이나 Field 설명에도 제공해요. |
| 버튼 근처에서 작은 입력·선택 UI 열기     | Popover를 사용해요.                                                 |
| 사용자의 명시적 확인 받기                | ConfirmDialog를 사용해요. 작업 결과 알림에는 Toast를 사용해요.      |

상태가 비슷해 보여도 의미가 다르면 서로 대체하지 않아요. 예를 들어 ToggleGroup의 눌림 상태를 form의 RadioGroup 역할로 바꾸거나, Tooltip 안에 입력 폼을 넣지 않아요.

## API를 정하는 방법

- 외형은 정해진 size·variant와 Theme로 표현해요. 개별 컴포넌트에 className·style·color·임의 radius를 노출하지 않아요.
- 입력값을 소비 코드가 제어하거나 컴포넌트에 맡길 수 있게 해요. checked/defaultChecked, value/defaultValue처럼 React에서 익숙한 이름을 사용해요.
- 폼 컨트롤은 이름과 값이 실제 제출 데이터에 반영돼야 해요. Field 안에서는 label·설명·오류를 연결하고, 단독 사용에도 접근 가능한 이름을 제공해요.
- 데이터를 표현하는 컴포넌트가 업무 상태를 소유하지 않아요. Table의 정렬·검색·서버 페이지 조회와 실제 경로는 소비 프로젝트가 맡아요.
- 팝업과 Toast는 가까운 Theme 범위에 속해요. 모듈 전역의 단일 저장소를 사용해 서로 다른 화면의 Theme나 상태가 섞이지 않도록 주의해요.

## 외형과 확인할 동작

설계와 검수에는 [AUI 디자인 원칙](design-principles.md)을 적용해요. 행동의 위계, 상태, Theme 일관성, 긴 콘텐츠와 입력 방식에 따른 확인 기준을 함께 지켜요.

색·글꼴·typography·radius는 Theme를 따르고, 간격과 치수는 패키지의 역할별 기준을 사용해요. 원형·pill과 화면 가장자리에 붙는 직각 모서리는 형태상 필요한 예외예요. 새로운 컴포넌트에도 작은 Theme radius와 라이트·다크를 적용해 확인해요.

Table은 로컬 `hiworks-ui-components/src/components/Table`의 모서리와 경계선 구성을 참고해 바깥 radius를 최대 4px로 제한해요. Theme의 radius가 더 작으면 그 값을 사용해요.

Storybook에는 기본 사용 예제와 Controls를 둬요. variant·크기·주요 상태·사용 흐름을 비교하는 데 필요한 Story는 남기고, 같은 목적의 반복 예제만 묶어요. 컴포넌트마다 개수를 일률적으로 제한하지 않아요. 모든 예제가 전역 Theme·모드·웹/모바일 선택을 따르게 해요. 테스트 장치가 있는 화면은 숨기되, 실제 사용에 필요한 오류·로딩·비활성 상태는 공개 예제에서도 확인할 수 있어야 해요. 자세한 기준은 [디자인 검수 자료](design-review-references.md)에 정리했어요.

검사는 렌더링 성공에 그치지 않아요. 키보드·포커스·폼 제출·reset·disabled와 실제 경계 안에 들어오는지를 확인해요. 작은 화면에서는 터치 영역과 가로 넘침을, 움직임 줄이기 설정에서는 애니메이션을 검사해요.

복잡한 날짜 선택기, 검색 엔진이 붙은 Combobox, 차트와 고급 DataTable은 별도의 상호작용과 데이터 요구가 있어요. 이번 기본 구성요소 위에 필요한 API와 검증 범위를 정해 확장해요.
