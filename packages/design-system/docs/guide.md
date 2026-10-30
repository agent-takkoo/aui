# AUI

`@heogeon0/aui`는 Theme를 주입하고 정해진 props로 조합하는 React 디자인 시스템이다. 화면 코드는 이 패키지의 공개 컴포넌트만 조합한다.

```tsx
import "@heogeon0/aui/styles.css";
import { Button, ThemeProvider } from "@heogeon0/aui";

export function App() {
  return (
    <ThemeProvider>
      <Button>저장</Button>
    </ThemeProvider>
  );
}
```

## 하지 않는 것

- `div`·`span`·`section` 같은 HTML 요소에 `style`이나 `className`을 쓰지 않는다. 배치는 `Stack`·`Inline`·`Grid`·`Container`, 표면은 `Card`·`Panel`, 글자는 `Text`·`Heading`이 맡는다.
- AUI 컴포넌트에 `className`·`style`·`color`·`asChild`를 넘기지 않는다. 타입과 ESLint가 막는다.
- 같은 역할의 컴포넌트를 새로 만들지 않는다. `components/ui/Button.tsx` 같은 파일을 만들지 않고, MUI·Chakra·Headless UI·Radix Themes·styled-components·Tailwind 유틸리티를 쓰지 않는다.
- CSS 파일을 화면 코드에서 import하지 않는다. 앱 진입점에서 `@heogeon0/aui/styles.css` 하나만 불러온다.
- SVG 아이콘을 직접 그리지 않는다. `Icon`의 `name` 목록에서 고르고, 없으면 `lucide-react`에서 import해 `source`로 넘긴다.
- 색·글꼴·radius·간격 수치를 화면에 적지 않는다. 브랜드를 바꾸려면 `defineTheme`의 brand·neutral·radius·scaling을 바꾼다.

필요한 선택지가 없으면 비슷한 컴포넌트를 조합해서 해결하고, 그래도 안 되면 화면에서 우회하지 말고 패키지에 prop이나 컴포넌트를 추가해 달라고 요청한다.

## 화면을 만드는 순서

1. 틀: 앱 전체는 `AppShell`(header·sidebar·본문), 페이지 본문은 `Container`로 폭을 정하고 `Stack gap="section"`으로 영역을 나눈다.
2. 제목: 페이지마다 `PageHeader` 하나. 제목은 h1이고 주요 행동은 `actions`에 Button 최대 두 개, primary는 하나다.
3. 내용: 2열 이상은 `Grid`, 가로 나열은 `Inline`, 세로 쌓기는 `Stack`. 묶음은 `Card`, 이름 있는 영역은 `Panel`.
4. 입력: 모든 입력은 `Field`로 감싸고 `name`을 적는다. 제출 버튼은 `type="submit"`, 하단 고정 저장 바는 `ActionBar`.
5. 상태: 비어 있으면 `EmptyState`, 실패는 `ErrorState`, 기다림은 `LoadingState`·`Skeleton`, 결과 알림은 `useToast`, 확인은 `ConfirmDialog`.
6. 마무리: `pnpm lint`로 `@heogeon0/aui/eslint` 규칙을 통과시킨다.

## 어떤 컴포넌트를 쓸지

| 필요한 동작                              | 사용                               |
| ---------------------------------------- | ---------------------------------- |
| 동의·개별 항목을 폼 값으로 고르기        | `Checkbox`                         |
| 설정을 바로 켜고 끄기                    | `Switch`                           |
| 보이는 선택지 중 하나를 폼 값으로 고르기 | `RadioGroup`                       |
| 목록을 열어 하나 고르기                  | `Select`                           |
| 적은 수의 필터 조건 하나 고르기          | `SegmentedControl`                 |
| 적용된 필터를 표시하고 해제하기          | `FilterChip`                       |
| 버튼의 눌림 상태·서식 선택               | `Toggle`, `ToggleGroup`            |
| 제목에 연결된 콘텐츠 패널 전환           | `Tabs`                             |
| 여러 제목 아래 내용을 접고 펼치기        | `Accordion` (하나면 `Collapsible`) |
| 짧은 보충 설명을 hover·focus로           | `Tooltip`                          |
| 버튼 근처의 작은 입력·보조 작업          | `Popover`                          |
| 실행할 행동 목록                         | `DropdownMenu`                     |
| 집중해야 하는 작업·폼                    | `Dialog`                           |
| 화면 가장자리의 작업 영역·모바일 시트    | `Drawer`                           |
| 되돌릴 수 없는 행동의 확인               | `ConfirmDialog`                    |
| 작업 결과 알림                           | `useToast`                         |
| 행 전체를 눌러 동작 실행                 | `ListItem`                         |
| 행 전체로 페이지 이동                    | `LinkRow`                          |
| 페이지 이동 버튼                         | `ButtonLink`                       |
| 상태 표시                                | `Badge` (tone으로 의미 구분)       |
| 영역 안의 안내·경고                      | `Callout`                          |
| 데이터 표                                | `Table` 계열                       |
| 현재 위치·페이지 이동                    | `Breadcrumb`, `Pagination`         |

의미가 다르면 서로 대체하지 않는다. ToggleGroup을 RadioGroup 대신 쓰거나 Tooltip 안에 입력을 넣지 않는다.

## 색과 의미

- 주요 행동 하나만 `primary`. 나머지 버튼은 `secondary`, 낮은 강조는 `ghost`, 삭제는 `destructive`.
- 상태는 `Badge`·`Callout`의 tone으로 표현한다. 완료는 `success`, 진행 중·주의는 `warning`, 실패는 `danger`, 안내는 `info`, 그 외는 `neutral`.
- 글자 색은 `Text`의 tone(`default`·`muted`·`primary`·`destructive`)으로만 바꾼다.

## 공통 규칙

- 입력은 Field로 감싸고 제출할 값에 name을 지정한다. Button으로 제출하려면 type="submit"을 적는다.
- value·checked를 제어하면 변경 콜백과 form reset도 함께 처리한다.
- trigger에는 ref와 이벤트를 DOM에 전달하는 요소 하나를 넣는다.
- 팝업·Toast는 ThemeProvider 안에서만 열리고, 서버 렌더링 첫 화면에서는 열린 상태로 그릴 수 없다.
- 라우터 Link를 쓰려면 ThemeProvider에 linkComponent를 넘긴다. LinkComponent는 href를 받으므로 React Router처럼 to를 쓰는 Link에는 `({ href, ...props }) => <Link to={href} {...props} />` adapter를 넘긴다. ButtonLink·LinkRow·Sidebar·Breadcrumb가 그 컴포넌트를 쓴다.
- 일반 DOM props는 대표 항목만 표시한다. 전체 허용 범위는 패키지의 `.d.ts`를 따른다.
