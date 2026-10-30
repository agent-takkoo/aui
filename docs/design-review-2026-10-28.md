AUI의 디자인 원칙을 세우고 컴포넌트와 Storybook에 적용했다. 원칙은 [design-principles.md](design-principles.md)와 `Global/Principles`에서 같은 내용을 읽는다. 근거는 [수집한 스킬과 공식 가이드](design-review-references.md)에 있다.

## 확인한 문제와 변경

| 확인한 문제                                              | 사용에 미치는 영향                                      | 반영한 변경                                                                                                                                                        |
| -------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| primary 포커스가 배경과 같은 색으로 안쪽에 그려졌다.     | 키보드로 이동한 위치가 보이지 않았다.                   | Button·ButtonLink·IconButton에 Theme foreground 색으로 테두리와 이어지는 한 줄을 그린다. 사용자 의견에 따라 바깥쪽 간격을 없앴다.                                  |
| Input은 56px, Select는 44px이 기본이었다.                | 같은 폼에서 컨트롤의 높이가 달랐다.                     | Select에도 inputSize sm·md를 제공한다. 기본 md는 56px, sm은 44px이며 긴 선택지는 줄바꿈한다. 기존 높이가 필요하면 inputSize="sm"을 사용한다.                       |
| Select 등은 오류 설명이 있어도 경계가 바뀌지 않았다.     | 수정할 입력을 알아보기 어려웠다.                        | Select·Checkbox·RadioGroup은 오류 경계를, Switch·Slider는 오류 표시를 제공한다. 기존 Field의 접근 가능한 이름·설명 연결을 유지한다.                                |
| 입력의 경계가 투명하거나 장식용 border만큼 약했다.       | 입력면을 배경에서 구분하기 어려웠다.                    | input token을 장식용 border와 분리해 대비를 높였다. Input·Textarea·Select·Checkbox·RadioGroup이 같은 input 색을 사용한다.                                          |
| 크림 라이트의 오류 글자는 배경과 대비가 약 4.08:1이었다. | 일반 텍스트 기준 4.5:1에 못 미쳤다.                     | destructive의 밝기를 낮춰 약 4.82:1로 보정했다.                                                                                                                    |
| ToggleGroup 등의 선택 경계에 primary를 사용했다.         | 지속되는 선택과 주요 실행의 강조가 섞였다.              | Toggle·ToggleGroup·Tabs·Select·Sidebar·Pagination의 선택·현재 위치를 secondary 계열로 맞췄다. Toggle·Tabs는 input 경계를 사용하고, 선택 목록에는 체크 표시도 둔다. |
| 상태와 크기를 비교할 Story가 부족했다.                   | API 선택지를 놓치고 실제 사용 흐름을 검수하기 어려웠다. | 중요한 variant·크기·오류·로딩·비활성 비교를 복구했다. Badge에는 sm·md·lg를 추가하고 기본 md는 기존 크기를 유지한다.                                                |

## 입력과 실제 사용 흐름

Select는 768px 미만에서 하단 Drawer로 열린다. 제목·현재 선택·비활성 항목을 표시하고 항목을 고르면 바로 적용한 뒤 닫는다. 웹은 기존 Radix 드롭다운을 사용한다. 두 표시 방식의 선택 값·Field 연결·form 제출·reset·ref를 유지하며, 열린 상태에서 화면 폭이 바뀌면 목록을 닫고 값은 유지한다. 모바일의 긴 목록은 Drawer 본문 안에서 스크롤한다.

모바일 목록은 기존 DialogFrame과 Radix의 포커스·키보드 동작을 사용한다. native select가 form의 값과 required 검증을 연결한다. native reset은 React 상태 변경 후 다시 DOM 값을 바꿀 수 있어, 기본 동작이 끝난 뒤 화면과 제출 값을 맞춘다. 개발 watch에서 파일을 동시에 복사하며 CSS가 사라지는 오류도 발견해 복사를 순서대로 실행하도록 수정했다.

설정 폼은 입력·선택·동의를 함께 제출하고 기본값으로 되돌린다. Modal은 검증 후 저장, 취소 후 값 보존, 긴 본문과 고정 footer를 확인한다. Drawer는 설정 적용 후 다시 열어 값을 확인한다. Callout은 제목·설명 사이에 공통 spacing을 사용하고 긴 header는 줄바꿈한다.

## Storybook에서 검수할 곳

- `Global/Principles`에서 기준을 읽고 `Global/Theme/역할별 색 배치`에서 주요 행동·보조 행동·선택·켜짐·오류를 같은 Theme로 비교한다.
- `Base/Button`에서 7가지 variant, sm·md·lg, 로딩·비활성, 아이콘·링크·긴 문구를 비교한다. Input·Textarea·Checkbox·Switch·RadioGroup·Select·Toggle·ToggleGroup·Progress에도 필요한 상태 예제를 둔다.
- `Base/Badge`에서 variant와 크기, `Base/Select`에서 모바일 선택과 팝업 안의 긴 목록을 확인한다. `Component/Form`, `Modal`, `Layout/Drawer`에서는 실제 제출·취소·초기화 흐름을 조작한다.

Docs에서 기본 예제를 중복 렌더링하지 않으며, 모든 예제는 기존 Theme·라이트/다크·웹/모바일 전역 옵션을 따른다. 예제의 설명 영역도 Theme radius를 사용한다.

## 검증 범위

공통 포커스와 색상 연결 수정을 포함한 `pnpm release:check`와 `pnpm format:check`가 통과했다. 단위 테스트 16개와 E2E 152개를 통과했고 Storybook manager와 마우스 hover 전용 검사 4개는 모바일에서 제외했다. 패키지의 독립 설치·소비 코드 타입·ESM·CSS·ESLint·서버 렌더링과 npm 배포 dry-run도 확인했다.

자동 검사는 데스크탑 Chromium·Android 크기의 Chromium·iOS 크기의 WebKit에서 실행한다. 기본 Theme 두 종류의 라이트·다크에서 텍스트·오류·입력 경계·포커스 대비, 역할별 색과 설정 폼의 axe 검사를 추가했다. 주요 상태의 접근 가능한 이름, Input·Select 높이, 좁은 화면의 긴 선택지, form 제출·reset, 모바일 선택·스크롤·포커스 복귀, 화면 크기 전환, Badge 크기를 확인한다.

시각 검토는 Chromium에서 버튼과 설정 폼의 네 Theme 조합, 320·390px의 Input·Select·Button 긴 문구·RadioGroup·Callout과 긴 Modal을 대상으로 했다. 확인한 좁은 화면 예제에서 문서 전체의 가로 넘침은 없었다. 대표 화면과 자동 검사의 범위를 전체 사용자 흐름의 수동 검수와 같게 보지 않는다.

실제 Capacitor 기기, VoiceOver·TalkBack, 브라우저 글자 확대를 사용한 별도 수동 검사는 이번 작업에 포함하지 않았다. 공통 입력 크기와 색을 바꿨으므로 소비 프로젝트에서 사용자 정의 Theme와 폼 배치를 확인해야 한다.

## 공통 포커스 수정

버튼만 예외 처리해 Input·Textarea·Select 등에는 기존 테두리와 2px 떨어진 포커스 선이 남아 있었다. 공통 포커스 선을 기존 경계 안쪽에 겹치도록 바꾸고 Accordion의 별도 간격도 제거했다. Checkbox·RadioGroup·Switch·Slider는 클릭 영역에 별도 선을 그리지 않고 표시 부분의 테두리를 강조한다. ScrollArea는 viewport 대신 바깥 경계에 한 줄을 그린다. 클릭 영역과 배치 크기는 유지한다.

두 Theme의 라이트·다크에서 Textarea의 실제 화면을 확인했다. 세 브라우저의 회귀 테스트는 입력·선택·탭·펼치기·스크롤의 포커스 간격, 작은 컨트롤의 표시 위치, 배치 크기와 오류 색 유지를 검사한다.

## 색상 token 연결 점검

패키지의 컴포넌트·CSS·아이콘에는 preset 밖의 고정 색상값이 없었다. 배경·글자·테두리·그림자·overlay는 Theme 변수 또는 그 변수에서 계산한 색을 사용하고, 아이콘은 currentColor를 따른다. 다만 기본 preset의 foreground·cardForeground·popoverForeground 값이 같아 잘못 연결한 역할이 드러나지 않았다.

모달·Drawer·outline 버튼·LinkRow 카드·Toggle·Tabs·Accordion·입력의 포커스에는 cardForeground를 연결했다. Popover는 popover와 popoverForeground를 함께 사용한다. Callout은 바탕이 되는 card의 전경색을 쓰고, 기본 Text·ghost 버튼·outline 배지·배경 없는 링크는 부모 표면의 글자색을 물려받는다. muted 카드와 빈 영역의 주된 글자는 foreground를 사용한다. FilterChip의 secondaryForeground와 맞도록 배경도 secondary로 바꿨다.

보조 컨트롤의 hover에는 accent 쌍을 적용한다. Toggle·Tabs의 hover 선택자가 선택된 배경을 덮지 않도록 했고, Select도 선택된 항목의 포커스에서 secondary와 체크 표시를 유지한다. soft·Callout의 혼합 비율, 주요 버튼의 hover 밝기, 비활성 투명도는 공통 컴포넌트 규칙으로 남긴다.

숨겨진 `Testing/ThemeColors`에서는 기본 화면·카드·팝오버의 배경과 전경을 의도적으로 다르게 주입한다. 라이트·다크에서 중첩 Theme, Portal, 내부 Text, 입력 포커스와 선택·hover를 검사했다. Chromium에서 카드·패널·Popover의 실제 화면도 확인했다. 기본 두 Theme의 네 조합은 card·popover·accent의 글자 대비 검사도 추가했다. 커스텀 Theme의 모든 색 조합에 대한 대비를 자동으로 보장하는 기능은 없다.
