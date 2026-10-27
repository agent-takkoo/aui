기존 서비스의 현재 화면과 기존 UI 패키지에서 다른 서비스에도 재사용할 디자인을 추출했어요.
추출 기준은 원본 저장소의 commit `fe5e4ca`이며, 원본 코드는 수정하지 않았어요.

## 추출한 것

원본 경로는 `packages/ui/src`를 기준으로 해요.

| 원본                                               | 새 패키지                                        | 유지한 디자인과 조정한 API                                                                                                             |
| -------------------------------------------------- | ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| `ui/button.tsx`                                    | `Button`, `IconButton`, `ButtonLink`             | 채움·보조·soft·outline·ghost·destructive·quiet를 유지해요. `default`·`solid`를 `primary`로 합치고 아이콘과 링크를 별도 API로 제공해요. |
| `ui/input.tsx`, `ui/textarea.tsx`, `ui/label.tsx`  | `Input`, `Textarea`, `Label`, `Field`            | 연한 입력면과 포커스 경계, 56px·44px 높이를 유지해요. 서비스 화면에서 반복하던 라벨·설명·오류 연결은 `Field`로 묶었어요.               |
| `ui/card.tsx`                                      | `Card`와 Header·Title·Description·Content·Footer | 그림자와 테두리를 추가하지 않고 여백과 표면으로 묶어요. 제목에는 실제 heading을 사용해요.                                              |
| `ui/badge.tsx`                                     | `Badge`                                          | primary·secondary·outline·destructive 표면을 유지해요.                                                                                 |
| `ui/avatar.tsx`                                    | `Avatar`                                         | 16px·26px·34px 크기, 네 가지 색, 사진 실패 시 첫 글자 표시를 유지해요. 실패한 URL로 상태를 구분해 새 사진을 다시 시도해요.             |
| `ui/callout.tsx`                                   | `Callout`                                        | 행동색·위험색의 연한 면과 안쪽 ghost 버튼의 hover 표면을 유지해요.                                                                     |
| `ui/link-row.tsx`                                  | `LinkRow`                                        | card의 옅은 그림자, plain 설정 목록, 오른쪽 꺾쇠와 눌림 표현을 유지해요. 이동 동작은 `href`가 필수인 실제 링크로 바꿨어요.             |
| `ui/segmented-control.tsx`                         | `SegmentedControl`                               | 균등한 칸과 움직이는 선택 면을 유지해요. headless RadioGroup으로 방향키 조작을 지원하고 옵션별 className을 제거했어요.                 |
| `ui/filter-chip.tsx`                               | `FilterChip`                                     | 칩 전체로 조건을 해제하는 동작과 모양을 유지해요. 터치 환경에서는 높이를 44px로 늘려요.                                                |
| `ui/empty-state.tsx`                               | `EmptyState`                                     | 연한 블록, 굵은 제목, 설명과 다음 행동을 유지해요.                                                                                     |
| `ui/error-state.tsx`                               | `ErrorState`, `LoadingState`                     | 오류 설명과 인자 없는 재시도 콜백, 불러오는 중 표시를 유지해요.                                                                        |
| `ui/skeleton.tsx`                                  | `Skeleton`                                       | 연한 면과 pulse를 유지하고 크기는 line·title·avatar·card로 제한해요.                                                                   |
| `ui/dialog.tsx`, `ui/confirm-dialog.tsx`           | `Dialog`, `ConfirmDialog`                        | 가운데 판과 제목·설명·액션 배치, 취소 왼쪽·확인 오른쪽 구성을 유지해요. 삭제 확인은 AlertDialog를 사용하고 기본 포커스를 취소에 둬요.  |
| `ui/dropdown-menu.tsx`, `ui/popover.tsx`           | `DropdownMenu`, `Popover`                        | 메뉴 항목의 강조와 disabled 상태, 둥근 표면과 화면 경계 대응을 유지해요. 메뉴는 항목 배열로 받으며 primitive를 공개하지 않아요.        |
| `apps/web/src/shared/ui/drawer/Drawer.tsx`         | `Drawer`                                         | 모바일의 하단 시트와 데스크탑의 오른쪽 판, 스크롤 본문·고정 footer를 추출했어요. 드래그·경로 상태는 포함하지 않아요.                   |
| `ui/nav-icon.tsx`                                  | `Icon`                                           | 서비스 의미와 무관한 추가·닫기·뒤로·검색·확인·메뉴·삭제 아이콘을 가져왔어요.                                                           |
| `ui/section-label.tsx`, `shared/styles/tokens.css` | `Text`, `Heading`, `SectionLabel`                | display·title·heading·body·sub·caption의 크기와 굵기 기준을 유지해요.                                                                  |
| 화면에서 반복하는 `gap`, `px-gutter`, `p-card`     | `Stack`, `Inline`, `Container`                   | 원본의 간격·본문 폭·카드 안쪽 여백을 이름 있는 props로 제공해요.                                                                       |
| `shared/styles/themes/toss.css`, `cream.css`       | `defaultTheme`, `creamTheme`                     | 공통 역할색과 radius, 라이트·다크를 추출했어요. 금융·태그·거래 달력의 색은 제외했어요.                                                 |

## 원본에서 보정한 값

`Badge`와 `DropdownMenu`는 원본 UI 패키지에 있지만 현재 앱 화면에서 직접 호출되지는 않아요. 기존 공통 디자인 중 재사용 가능한 작은 컴포넌트로 함께 추출했어요.

기본 theme의 라이트 모드에서 작은 글자의 대비를 확보하려고 primary를 `#3182f6`에서 `#246bd6`으로, destructive를 `#f04452`에서 원본의 글자용 위험색 `#ce2036`으로 바꿨어요. 보조 글자는 연한 입력면에서도 읽히도록 `#6b7684`에서 `#626d7b`로 조정했어요. radius·입력면·카드 여백·타이포 위계는 원본 기준을 유지해요.

원본의 “16px 굵은 글자면 큰 글자 대비 기준을 쓸 수 있다”는 주석은 그대로 적용하지 않았어요. 일반 텍스트의 대비를 E2E에서 확인해요. 소비 프로젝트가 새 theme을 만들 때도 같은 검사가 필요해요.

색 이름에는 `--ds-`를 붙이고 CSS는 `.ds-root`와 컴포넌트 class 안에 두었어요. 원본처럼 `html`·`body`·`:root`를 전역으로 바꾸지 않아 기존 프로젝트에 설치할 수 있어요. Tailwind utility는 같은 외형의 패키지 CSS로 옮겨 소비 프로젝트의 Tailwind 빌드 설정과 분리했어요.

공통 기본 theme의 공개 이름은 `defaultTheme`이에요. Storybook은 `Global`에 Theme·Typography·Spacing을, `Base`에 Button·Input·Badge 같은 작은 UI를, `Component`에 폼·카드·피드백을, `Layout`에 배치를 두어요. 원본을 어디서 가져왔는지는 이 문서에서 관리해요.

## 서비스에 남기는 것

`AmountField`, `MoneyText`, `HeroAmount`, `WalletRow`, `EntryRow`, `DayCell`, `CalendarGrid`, 거래 통계와 도넛 차트는 가계부 의미를 알아야 해요. 크루·멤버·초대에 묶인 `MenuSheet`, 거래 화면에 맞춘 `AppHeader`와 `Nav`도 공통 패키지에 넣지 않았어요.

`ScreenPanel`의 전역 패널 개수·경로와의 연결·가장자리 swipe, `Drawer`의 드래그 상태, 로그인 화면의 동전 애니메이션, Capacitor의 로그인·푸시·진동은 서비스 동작이어서 포함하지 않아요.

새로 필요한 컴포넌트는 실제 반복 사례를 확인해 추가해요. 범용 라이브러리에 흔하다는 이유만으로 Checkbox·Switch·표·날짜 달력을 채우지 않아요.

## 독립 패키지로 정리한 규칙

공개 Drawer는 모바일에서 아래에, 데스크탑에서 오른쪽에 열리는 보조 화면이에요. Panel은 화면 흐름 안의 이름 있는 section이고, Sidebar는 실제 링크와 현재 위치를 표시하는 탐색 영역이에요. 경로와 전역 열림 상태는 소비 프로젝트가 맡아요. Modal·ConfirmDialog·DropdownMenu·Popover는 파일과 Story를 각각 나눴어요.

글꼴뿐 아니라 역할별 size·lineHeight·weight·letterSpacing을 Theme의 typography로 옮겼어요. 작은 아바타 글자는 micro 역할을 사용해요. 버튼·라벨의 강조 굵기는 typography.weights를 사용하고, 입력은 어느 theme에서도 최소 16px을 유지해요. 가림막과 그림자 기준색도 light·dark의 overlay·shadow로 옮겼어요. 그림자의 위치·퍼짐·투명도와 컴포넌트 치수는 패키지가 관리해요.

Storybook은 기본 Story와 Controls를 중심으로 정리했어요. 행동 검증만을 위한 예제는 testing 폴더에서 !dev·!autodocs·!manifest 태그로 숨기고 E2E에서 직접 열어요. Theme 옆의 전역 화면 선택에서 웹 버전(전체 폭)과 모바일 버전(390×844px)을 고를 수 있어요. Story와 Docs 예제 모두 실제 iframe 크기를 바꿔 CSS media query를 적용해요. Docs 본문 폭은 유지해요. 독립 iframe의 예제 decorator에 같은 origin 이벤트로 theme·mode와 Controls 변경분을 전달해요. 한글을 포함한 문구도 유지하며 iframe을 재로드하지 않아요.

확인창의 두 fullWidth 버튼이 각각 본문 전체 폭을 차지하던 문제를 수정했어요. 액션 영역은 gap을 제외한 공간을 같은 크기의 grid 두 열로 나눠요. 단독 fullWidth 버튼의 API는 유지하고, 일반 팝업 footer는 여러 버튼이 들어오면 줄바꿈해요. 320·390·745·1440px에서 기본 문구와 긴 문구의 경계를 검사해요.

Drawer의 side는 responsive(기본)·left·right로 제한해요. Panel 예제는 오른쪽, Sidebar 예제는 왼쪽 Drawer로 내용을 열고 닫아요. 내부 DialogFrame의 포커스·Escape·Portal 동작을 공유하며 Panel·Sidebar의 내용 API는 유지해요.

열림과 닫힘은 Radix의 data-state와 Presence를 따라요. Panel은 오른쪽, Sidebar는 왼쪽, 모바일 Drawer는 아래로 빠져나가요. 배경과 내용의 닫힘 시간을 220ms로 맞춰 배경이 먼저 사라져 내용의 애니메이션이 잘리지 않게 했어요. 움직임 줄이기 설정에서는 기존 최소 지속 시간을 적용해요.

## Radius와 표면 규칙 확인

theme.radius가 0이어도 작은 버튼·배지·메뉴 항목·Skeleton은 최소 4px로 둥글던 규칙을 고쳤어요. 내부 CSS 변수 radius-sm은 max(0px, radius − 2px), radius-xs는 max(0px, radius − 4px)이에요. SegmentedControl 바깥 radius-lg는 radius + min(radius, 4px)로 계산해 기준 0에서도 각지게 표시해요. 기본 theme의 16px과 크림 theme의 8px에서는 기존 값을 유지해요. 추가 Theme 필드나 컴포넌트의 임의 radius prop은 만들지 않았어요.

원형은 radius-circle(50%), pill은 radius-pill(999px)로 의미를 구분했어요. 아바타·spinner·아바타 Skeleton과 FilterChip의 형태를 유지하고, 화면 가장자리에 붙는 Drawer의 모서리 0도 유지해요. 0px·2px·32px을 주입해 일반 표면과 작은 표면, Portal의 모달·팝오버·메뉴, Drawer의 모서리를 검사해요.

배치 간격은 xs·sm·md·section과 gutter·card/row padding의 기존 패키지 기준을 유지해요. 버튼 안쪽·아이콘·테두리 같은 치수는 각 컴포넌트가 정해요. 그림자는 링크 카드·모달·메뉴·팝오버의 역할에 맞는 크기와 투명도를 유지하며 모든 그림자 색은 theme.shadow를 사용해요. 색·글꼴·typography·radius는 theme, 화면별 임의 스타일은 제한한다는 범위를 그대로 지켜요.
