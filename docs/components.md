소비 프로젝트는 공개 컴포넌트를 조합하고 프로젝트 theme을 주입해 화면을 만들어요.
시각적 선택지를 늘릴 때는 화면마다 스타일을 덮어쓰는 대신 반복 사례에 맞춰 패키지 API를 확장해요.

## Theme

```tsx
import {
  ThemeProvider,
  defineTheme,
  defaultTheme,
} from "@ai-system/design-system";

const projectTheme = defineTheme({
  ...defaultTheme,
  name: "my-service",
  radius: "0.75rem",
  light: { ...defaultTheme.light, primary: "#135a45", ring: "#135a45" },
});

<ThemeProvider theme={projectTheme} mode="system">
  <App />
</ThemeProvider>;
```

`light`·`dark`의 공통 색을 모두 정의하고 배경·전경을 짝으로 유지해요. `mode`는 `light`, `dark`, `system`이에요. 중첩 provider와 Portal도 가까운 theme을 사용해요. `ThemeProvider`는 문서 전체의 class나 색을 바꾸지 않아요.

theme을 생략하면 공통 기본값 `defaultTheme`을 사용해요. Storybook의 `Global/Theme` 문서에서 여섯 필드와 모든 색상 token의 실제 기본값을 확인할 수 있어요.

## 행동과 입력

- `Button`의 variant는 `primary`, `secondary`, `soft`, `outline`, `ghost`, `destructive`, `quiet`예요. size는 `sm`, `md`, `lg`이고 기본은 `primary`·`md`예요.
- `Button`은 기본 `type="button"`이에요. form 제출에는 `type="submit"`을 적어요. `loading`이면 라벨을 유지하고 실행을 막아요. `fullWidth`로 전체 폭을 선택해요.
- `IconButton`은 `icon`과 `label`이 필수예요. `ButtonLink`와 `LinkRow`는 `href`가 필수예요. 라우터 전용 이동 연결은 소비 프로젝트가 맡아요.
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

## 표시와 배치

- `Text`는 `body`, `sub`, `caption` 크기와 `default`, `muted`, `primary`, `destructive` 색을 제공해요. `Heading`의 `level`은 문서 구조, `size`는 `display`, `title`, `heading` 외형을 정해요.
- `Stack`과 `Inline`의 gap은 `none`, `xs`, `sm`, `md`, `section`이에요. `Inline`은 기본으로 줄바꿈해요. `Container`는 `form`, `content`, `wide` 폭을 제공해요.
- `Card`는 `plain`과 `muted`를 제공해요. Header·Title·Description·Content·Footer를 조합해요. 정적인 카드에 그림자나 클릭 동작을 추가하지 않아요.
- `Badge`는 `primary`, `secondary`, `outline`, `destructive`를 제공해요. `Avatar`는 `name`, `toneIndex`, `size`, `avatarUrl`을 받아요. size는 `xs`, `sm`, `md`예요.
- `Callout`은 `title`과 선택적인 `action`, `children`을 받아요. tone은 `action`, `danger`예요.

## 선택과 피드백

`SegmentedControl`은 `value`, `options`, `onValueChange`, `ariaLabel`을 받아요. 옵션에는 `value`, `label`, 선택적인 `disabled`가 있어요. 화면을 전환하는 탭이 아닌 단일 조건 선택에 사용해요.

`FilterChip`의 `label`에는 “이번 달 조건 해제”처럼 대상과 행동을 함께 적고 `onClear`로 해제해요. `EmptyState`는 다음 행동을 `action`으로 받아요. `ErrorState`의 `onRetry`는 인자 없이 호출돼요. `LoadingState`는 `role="status"`, `Skeleton`은 `aria-hidden`으로 콘텐츠를 기다려요.

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

## 소비 코드 검사

```js
import designSystem from "@ai-system/design-system/eslint";

export default [
  { files: ["src/**/*.{ts,tsx}"], ...designSystem.configs.recommended },
];
```

권장 ESLint 설정은 공개 컴포넌트에 직접 전달하는 `className`, `style`, `color`와 Radix·패키지 내부 경로 import를 검사해요. TypeScript는 허용하지 않은 props를 검사하고, DOM으로 전달할 때도 스타일 props를 제거해요. props spread를 모두 정적으로 해석하거나 외부 CSS의 하위 선택자를 차단하는 기능은 아니에요.

## 화면 구조

`Drawer`는 열고 닫는 보조 화면이며 Dialog와 같은 제목·설명·trigger·footer를 받아요. side 기본값인 responsive는 모바일 아래·데스크탑 오른쪽에서 열리고, left·right는 화면 크기와 관계없이 해당 방향에서 열려요. `Panel`은 title·description·children·footer로 독립 영역을 구성해요. `Sidebar`는 label·items·currentId·footer를 받아요. items는 `{ id, label, href }` 배열이며 현재 항목에 aria-current를 표시해요. Storybook에서는 각각 오른쪽·왼쪽 Drawer와 조합해 열고 닫는 모습을 보여줘요. 내용 컴포넌트는 직접 focus trap을 만들지 않고 Drawer가 담당해요. 실제 경로와 활성 항목은 소비 프로젝트가 관리해요.

`Theme.typography`의 각 역할은 size·lineHeight·weight·letterSpacing을 제공해요. 역할은 display·title·heading·body·sub·caption·input·micro로 제한해요. `Text`에서 weight를 생략하면 해당 역할의 굵기를 쓰고, 지정하면 typography.weights의 regular·semibold·bold를 사용해요. 입력의 글자 크기는 최소 16px이에요.
