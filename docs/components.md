소비 프로젝트는 공개 컴포넌트를 조합하고 프로젝트 theme을 주입해 화면을 만들어요.
시각적 선택지를 늘릴 때는 화면마다 스타일을 덮어쓰는 대신 반복 사례에 맞춰 패키지 API를 확장해요.

## Theme

```tsx
import { ThemeProvider, defineTheme, defaultTheme } from "@heogeon0/aui";
import { Link } from "react-router";

const projectTheme = defineTheme({
  name: "my-service",
  brand: "teal",
  neutral: "sage",
  radius: "large",
  scaling: "100%",
  fontFamily: defaultTheme.fontFamily,
});

<ThemeProvider theme={projectTheme} mode="system" linkComponent={Link}>
  <App />
</ThemeProvider>;
```

theme은 색 하나하나가 아니라 `brand`·`neutral` 스케일 이름, `radius` 단계, `scaling` 밀도, `fontFamily`로 정해요. `brand`는 Radix 색 이름(`indigo`, `teal`, `ruby` 등) 또는 `{ light, dark }` 12단계 배열이고 `neutral`은 `gray`, `mauve`, `slate`, `sage`, `olive`, `sand`예요. 컴포넌트는 brand·neutral·danger·success·warning·info 스케일의 단계를 역할에 맞게 쓰므로 브랜드가 바뀌어도 위계가 같아요. 채운 배경의 글자는 4.5:1을 만족하는 단계를 자동으로 골라요.

`mode`는 `light`, `dark`, `system`이에요. `linkComponent`를 넘기면 `ButtonLink`·`LinkRow`·`Sidebar`·`Breadcrumb`가 라우터 Link로 렌더링돼요. 중첩 provider와 Portal도 가까운 theme을 사용하고 theme 이름은 서로 달라야 해요. `ThemeProvider`는 문서 전체의 class나 색을 바꾸지 않아요.

theme을 생략하면 `defaultTheme`(indigo·slate·medium)을 사용해요. Storybook의 `Global/Theme` 문서에서 필드, 스케일 단계, 역할 변수의 실제 값을 확인할 수 있어요.

## 행동과 입력

- `Button`의 variant는 `primary`, `secondary`, `ghost`, `destructive` 네 가지예요. 화면의 주요 행동 하나만 primary이고 보조 행동은 secondary, 낮은 강조는 ghost예요. size는 `sm`, `md`, `lg`이고 기본은 `primary`·`md`예요.
- `Button`은 기본 `type="button"`이에요. form 제출에는 `type="submit"`을 적어요. `loading`이면 라벨을 유지하고 실행을 막아요. `fullWidth`로 전체 폭을 선택하고 아이콘은 `leadingIcon`·`trailingIcon`에 `Icon`을 넣어요.
- `IconButton`은 `icon`과 `label`이 필수예요. `ButtonLink`와 `LinkRow`는 `href`가 필수예요. `ThemeProvider`의 `linkComponent`가 있으면 그 Link로 렌더링돼요.
- `Icon`은 `name`을 `iconNames` 목록에서 고르고, 목록에 없는 아이콘은 `lucide-react`에서 import해 `source`로 넘겨요. SVG를 직접 그리지 않아요.
- `Input`의 `inputSize`는 `md` 56px와 `sm` 44px예요. `Textarea`는 네 줄이 기본이에요. `name`, `type`, `inputMode`, `autoComplete`, ref, 기본 이벤트와 ARIA 속성을 유지해요.

```tsx
<Field
  label="이름"
  description="함께 쓰는 사람에게 보여요."
  error={error}
  required
>
  <Input name="name" autoComplete="name" value={name} onChange={changeName} />
</Field>
```

`Field`는 하나의 입력을 감싸요. ID를 지정하려면 Field에 `id`를 넘겨요. 설명과 오류 ID는 자동으로 연결해요. Field 밖에서 Input을 사용하면 `Label htmlFor`나 `aria-label`로 이름을 제공해요.

## 폼의 선택과 범위 입력

`Checkbox`와 `Switch`는 `checked`·`defaultChecked`·`onCheckedChange`를 사용해요. Checkbox는 `"indeterminate"`도 표현할 수 있어요. 단독으로 쓸 때는 `label`을 주고, 설명·오류가 필요하면 Field의 label과 연결해요.

```tsx
<Checkbox name="terms" label="이용 조건에 동의해요" required />
<Switch name="notifications" label="알림 받기" defaultChecked />
```

`RadioGroup`과 `Select`의 `options`는 `{ value, label, disabled? }` 배열이에요. `value`·`defaultValue`·`onValueChange`로 선택을 다뤄요. option의 value는 중복되지 않는 비어 있지 않은 문자열로 정해요. Select는 선택 전 문구를 `placeholder`로 받아요. `inputSize`는 Input과 같은 `md`(기본 56px)·`sm`(44px)이고 긴 선택지는 줄바꿈해 높이가 늘어나요. Field의 오류는 설명과 컨트롤 경계에 함께 표시해요.

Select는 768px 미만에서 하단 Drawer로 열리고, 넓은 화면에서는 드롭다운으로 열려요. 모바일에서 항목을 고르면 바로 값을 반영하고 닫으며 트리거로 포커스가 돌아와요. 닫기·Escape는 값을 바꾸지 않아요. Drawer 제목은 `Field`의 label, `aria-label`, “항목 선택” 순서로 정하고 `selectionTitle`로 지정할 수도 있어요. 화면 크기가 바뀌면 열린 목록을 닫고 선택한 값은 유지해요. 두 표시 방식 모두 form 제출·reset·required·disabled를 지원해요.

```tsx
<Field label="보기 방식" description="목록에 표시할 범위예요.">
  <RadioGroup
    name="visibility"
    defaultValue="all"
    options={[
      { value: "all", label: "전체" },
      { value: "mine", label: "내 항목" },
    ]}
  />
</Field>

<Field label="언어" required>
  <Select
    name="language"
    placeholder="언어를 선택해 주세요…"
    options={[
      { value: "ko", label: "한국어" },
      { value: "en", label: "English" },
    ]}
  />
</Field>
```

`Slider`는 단일 숫자 값에 사용해요. `min`·`max`·`step`으로 범위를 정하고, `value`·`defaultValue`·`onValueChange`·`onValueCommit`을 사용해요. `onValueCommit`은 조작을 마쳤을 때의 값을 다룰 때 사용해요.

```tsx
<Field label="음량">
  <Slider name="volume" min={0} max={100} step={5} defaultValue={30} />
</Field>
```

폼에 제출할 컨트롤에는 `name`을 적어요. `defaultChecked`·`defaultValue`는 컴포넌트가 초기 상태를 관리하고, `checked`·`value`를 지정하면 소비 코드가 상태를 관리해요. 제어하는 값은 form의 `onReset`에서도 소비 코드가 초기화해요. 그룹의 이름과 각 옵션의 label은 별도로 제공해요.

## 표시와 배치

- `Text`는 `body`, `sub`, `caption` 크기와 `default`, `muted`, `primary`, `destructive` 색을 제공해요. `Heading`의 `level`은 문서 구조, `size`는 `display`, `title`, `heading` 외형을 정해요.
- `Text`의 default는 부모 표면의 글자색을 물려받아요. Card에서는 cardForeground, Popover에서는 popoverForeground, primary 버튼 안에서는 primaryForeground를 유지해요.
- `Stack`과 `Inline`의 gap은 `none`, `xs`, `sm`, `md`, `section`이에요. `Stack`의 align은 `stretch`, `start`, `center`, `end`이고 `Inline`의 justify는 `start`, `center`, `between`, `end`예요. `Inline`은 기본으로 줄바꿈해요. `Container`는 `form`, `content`, `wide` 폭을 제공해요.
- `PageHeader`는 화면마다 하나만 두는 제목 영역이에요. `title`은 h1이고 `description`, `breadcrumb`, `actions`를 받아요. `ActionBar`는 하단에 고정되는 저장·취소 바이고 `justify`는 `end`, `start`, `between`, `stretch`예요. `AppShell`은 `header`, `sidebar`, 본문 틀이고 사이드바는 1024px 이상에서만 보여요.
- `Grid`는 같은 폭의 열로 나눠요. `columns`는 `1`, `2`, `3`, `4`, `auto`이고 기본 2예요. `collapseBelow`는 `none`, `sm`, `md`, `lg`이며 기본 `md`라 768px 미만에서 한 열로 쌓여요. 열 폭이 서로 다른 배치에는 쓰지 않아요.
- `Card`는 `plain`과 `muted`를 제공해요. plain은 1px 경계로 배경과 구분되고 muted는 연한 면이에요. Header·Title·Description·Content·Footer를 조합하고 `CardTitle`의 `level`은 2·3·4예요. 정적인 카드에 클릭 동작을 추가하지 않아요.
- `Badge`의 tone은 `neutral`(기본), `brand`, `success`, `warning`, `danger`, `info`이고 variant는 `soft`(기본), `solid`, `outline`, size는 `sm`, `md`, `lg`예요. 완료는 success, 진행 중·주의는 warning, 실패는 danger로 표시해요. 클릭하는 컨트롤이 아니에요. `Avatar`는 `name`, `size`, `avatarUrl`을 받고 배경색은 이름으로 정해져요. `toneIndex`를 주면 그 값으로 골라요.
- `Callout`은 `title`과 선택적인 `action`, `children`을 받아요. tone은 `info`(기본), `success`, `warning`, `danger`예요.

## 선택과 피드백

`ListItem`은 행 전체를 누르는 버튼이에요. `title`은 필수이고 `description`·`leading`·`trailing`을 추가할 수 있어요. 기본 `sm`은 제목·설명을 가로 한 줄에 놓는 44px 행이며 긴 문구를 말줄임해요. `lg`는 제목 아래에 설명을 두고, 최소 64px에서 긴 내용에 맞춰 늘어나요. 기본 type은 button이고 ref·이벤트·ARIA·disabled를 유지해요. 페이지 이동에는 LinkRow를 사용해요.

trailing이 없으면 오른쪽 화살표를 표시하고 `chevron`으로 표시 여부를 바꿔요. 앞뒤 슬롯에는 아이콘·텍스트·Badge처럼 표시할 내용을 넣고, 버튼·링크·입력을 중첩하지 않아요. 별도의 selected prop은 제공하지 않아요.

`SegmentedControl`은 `value`, `options`, `onValueChange`, `ariaLabel`을 받아요. 옵션에는 `value`, `label`, 선택적인 `disabled`가 있어요. 화면을 전환하는 탭이 아닌 단일 조건 선택에 사용해요.

`FilterChip`의 `label`에는 “이번 달 조건 해제”처럼 대상과 행동을 함께 적고 `onClear`로 해제해요. `EmptyState`는 다음 행동을 `action`으로 받아요. `ErrorState`의 `onRetry`는 인자 없이 호출돼요. `LoadingState`는 `role="status"`, `Skeleton`은 `aria-hidden`으로 콘텐츠를 기다려요.

`Toggle`은 `pressed`·`defaultPressed`·`onPressedChange`로 버튼의 눌림 상태를 다뤄요. `ToggleGroup`은 `options`와 `aria-label`을 받으며, 기본 `type="single"`은 문자열 값을, `type="multiple"`은 문자열 배열을 사용해요. 폼의 단일 선택에는 RadioGroup을 사용해요.

Toggle·ToggleGroup·Tabs·Select·Sidebar·Pagination의 선택·현재 위치는 secondary 계열을 사용해요. Toggle과 Tabs의 경계는 input 색으로 구분하고, Checkbox·RadioGroup·Switch의 켜짐은 primary를 사용해요. `Global/Theme/역할별 색 배치`에서 같은 Theme를 적용해 비교할 수 있어요.

```tsx
<Toggle aria-label="굵게">굵게</Toggle>
<ToggleGroup
  type="multiple"
  aria-label="글자 서식"
  defaultValue={["bold"]}
  options={[
    { value: "bold", label: "굵게" },
    { value: "italic", label: "기울임" },
  ]}
/>
```

`Progress`는 `label`이 필수이고 `value`와 `max`로 진행량을 표시해요. value를 생략하거나 null로 주면 진행량을 알 수 없는 상태예요. 기본 max는 100이고, 유효한 숫자 값은 0부터 max 사이에 표시돼요.

## 콘텐츠 전환과 펼치기

`Tabs`는 접근 가능한 이름인 `label`과 `{ value, label, content, disabled? }` 항목을 받아요. `value`·`defaultValue`·`onValueChange`로 전환하고, `activationMode`는 `automatic` 또는 `manual`이에요. 각 제목과 콘텐츠의 ARIA 연결은 내부에서 처리해요.

```tsx
<Tabs
  label="프로젝트 정보"
  items={[
    { value: "overview", label: "개요", content: <Text>기본 정보예요.</Text> },
    {
      value: "activity",
      label: "활동",
      content: <Text>최근 활동이에요.</Text>,
    },
  ]}
/>
```

`Accordion`은 `{ value, title, content, disabled? }` 항목을 받아요. 기본 single 모드는 한 항목을 열고 문자열 값으로 관리해요. `type="multiple"`은 여러 항목을 열며 값이 문자열 배열이에요. 두 모드 모두 value·defaultValue·onValueChange를 제공해요.

`Collapsible`은 하나의 영역에 사용해요. `label`이 열기 버튼의 이름이고 children이 펼쳐지는 내용이에요. `open`·`defaultOpen`·`onOpenChange`로 상태를 관리해요. Accordion과 Collapsible은 열림·닫힘과 움직임 줄이기 설정을 지원해요.

## 위치와 페이지 이동

`Breadcrumb`의 items는 `{ label, href? }` 배열이에요. 마지막 항목을 현재 위치로 표시하고, 앞선 항목에 href를 주면 링크로 만들어요. label로 nav 이름을 바꿀 수 있어요.

`Pagination`은 `page`·`pageCount`·`onPageChange`를 받아요. 페이지 번호는 1부터 시작해요. 첫 페이지의 이전 버튼과 마지막 페이지의 다음 버튼은 비활성 상태이고, 많은 페이지는 중간을 생략해 표시해요. `disabled`는 전체 조작을 막아요. 실제 데이터 조회와 URL 변경은 onPageChange에서 소비 코드가 처리해요.

## 팝업

```tsx
<Dialog
  title="이름 바꾸기"
  description="변경한 이름은 함께 쓰는 사람에게도 보여요."
  trigger={<Button>이름 바꾸기</Button>}
  footer={
    <Button type="submit" form="name-form">
      저장
    </Button>
  }
>
  <form id="name-form" onSubmit={save}>
    <Field label="이름">
      <Input name="name" />
    </Field>
  </form>
</Dialog>
```

`Dialog`는 가운데 팝업, `Drawer`는 모바일 하단·데스크탑 오른쪽 판이에요. `open`·`onOpenChange`로 상태를 관리하거나 `trigger`로 열 수 있어요. trigger에는 `Button`처럼 이벤트와 ref를 전달하는 컴포넌트를 사용해요.

`ConfirmDialog`는 `open`, `onOpenChange`, `title`, `description`, `onConfirm`을 받아요. 실제 저장·삭제 상태는 소비 프로젝트가 관리하고 완료 후 `open`을 false로 바꿔요. 진행 중에는 `busy`를 true로 두어 취소·Escape·중복 확인을 막아요. 기본 tone은 `destructive`예요.

`DropdownMenu`의 `items`는 `{ id, label, onSelect, disabled?, destructive? }` 배열이에요. `Popover`는 `title`, `trigger`, `children`을 받아요. Portal과 위치·포커스 관리는 내부에서 처리해요.

`Tooltip`은 짧은 문자열인 `content`와 이벤트·ref를 전달하는 `trigger`를 받아요. side는 top·bottom·left·right 중 하나이고 기본은 top이에요. hover와 키보드 focus로 설명을 보여주며 Escape로 닫을 수 있어요. 필수 안내나 클릭할 액션은 Tooltip에만 넣지 않아요.

```tsx
<Tooltip
  content="파일은 보관함에서 다시 확인할 수 있어요."
  trigger={<Button variant="ghost">보관 안내</Button>}
/>
```

## 작업 결과 알림

`ToastProvider`를 ThemeProvider 안에 놓고, 그 아래에서 `useToast()`의 `toast`와 `dismiss`를 사용해요. toast는 알림 id를 반환해요. 알림은 title, 선택적인 description, default·destructive tone, action을 받아요. action에는 label·altText·onClick이 필요해요.

```tsx
function SaveNotice() {
  const { toast } = useToast();
  return (
    <Button
      onClick={() =>
        toast({ title: "저장했어요", description: "변경한 설정을 적용했어요." })
      }
    >
      저장
    </Button>
  );
}

<ThemeProvider>
  <ToastProvider>
    <SaveNotice />
  </ToastProvider>
</ThemeProvider>;
```

duration은 provider에서 정해요. 알림의 개수와 표시는 각 provider가 관리하므로 서로 다른 화면의 상태와 Theme가 섞이지 않아요. 실제 저장 요청과 오류 판단은 소비 코드가 맡아요.

## 소비 코드 검사

```js
import designSystem from "@heogeon0/aui/eslint";

export default [
  { files: ["src/**/*.{ts,tsx}"], ...designSystem.configs.recommended },
];
```

권장 ESLint 설정은 공개 컴포넌트에 직접 전달하는 `className`, `style`, `color`와 Radix·패키지 내부 경로 import를 검사해요. TypeScript는 허용하지 않은 props를 검사하고, DOM으로 전달할 때도 스타일 props를 제거해요. props spread를 모두 정적으로 해석하거나 외부 CSS의 하위 선택자를 차단하는 기능은 아니에요.

## 화면 구조

`Drawer`는 열고 닫는 보조 화면이며 Dialog와 같은 제목·설명·trigger·footer를 받아요. side 기본값인 responsive는 모바일 아래·데스크탑 오른쪽에서 열리고, left·right는 화면 크기와 관계없이 해당 방향에서 열려요. `Panel`은 title·description·children·footer로 독립 영역을 구성해요. `Sidebar`는 label·items·currentId·footer를 받아요. items는 `{ id, label, href }` 배열이며 현재 항목에 aria-current를 표시해요. Storybook에서는 각각 오른쪽·왼쪽 Drawer와 조합해 열고 닫는 모습을 보여줘요. 내용 컴포넌트는 직접 focus trap을 만들지 않고 Drawer가 담당해요. 실제 경로와 활성 항목은 소비 프로젝트가 관리해요.

Drawer의 `header`에 검색창·필터를 두면 제목 아래에 고정되고, header·footer 사이의 본문만 스크롤돼요. `size`는 `auto`(기본·내용만큼), `half`(50%), `tall`(85%), `full`(전체 높이)이에요. 하단에서 열릴 때만 적용하고 옆에서 열리면 화면 높이를 채워요. `full`은 상단 safe area 여백을 포함해요. 높이를 정하면 검색 결과가 줄어도 높이와 footer 위치를 유지하고, 고정 영역과 목록 한 줄이 들어갈 최소 높이는 확보해요.

`Theme.typography`의 각 역할은 size·lineHeight·weight·letterSpacing을 제공해요. 역할은 display·title·heading·body·sub·caption·input·micro로 제한해요. `Text`에서 weight를 생략하면 해당 역할의 굵기를 쓰고, 지정하면 typography.weights의 regular·semibold·bold를 사용해요. 입력의 글자 크기는 최소 16px이에요.

## 표와 스크롤·미디어 영역

Table의 바깥 모서리는 Theme radius의 3단계를 따라요. radius가 none이면 각진 모양을 유지해요.

`Table`의 caption은 스크린리더용 표 이름이며 화면에는 숨겨요. TableHeader·TableBody·TableFooter·TableRow·TableHead·TableCell을 조합하며 실제 table 요소를 사용해요. TableHead의 기본 scope는 col이고 행 제목에는 row를 지정할 수 있어요. 넓은 표는 자신이 가진 영역 안에서 가로 스크롤해요.

```tsx
<Table caption="문서 목록">
  <TableHeader>
    <TableRow>
      <TableHead>문서</TableHead>
      <TableHead>상태</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>프로젝트 안내</TableCell>
      <TableCell>공개</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

정렬·검색·행 선택과 서버 데이터 처리는 별도 상태로 조합해요. 단순한 표를 위해 서비스 데이터 타입이나 표 엔진을 패키지에 넣지 않아요.

`ScrollArea`는 접근 가능한 이름인 label과 sm·md·lg의 height를 받아요. 스크롤 영역에 focus한 뒤 키보드로도 이동할 수 있어요. `AspectRatio`의 ratio는 16:9·4:3·1:1 중 하나이고 기본은 16:9예요. 이미지의 alt나 영상의 접근 가능한 이름은 콘텐츠를 넣는 소비 코드가 제공해요.

## 스크롤과 AI 문서

스크롤바는 투명한 track과 3px thumb를 사용해요. hover·drag 때 4px로 넓어지고, 색은 Theme의 `scrollbarThumb`·`scrollbarThumbHover`·`scrollbarThumbActive`를 따라요. ScrollArea와 ThemeProvider 안의 네이티브 스크롤에 적용해요.

컴포넌트별 props·기본값·예제는 [AI 문서](ai.md)에서도 확인할 수 있어요.
