// 타입·기본값은 소스에서 추출한다. 이 파일에는 역할·선택 기준·예제 연결만 둔다.
export const catalog = [
  {
    components: {
      ThemeProvider: "하위 UI와 Portal에 프로젝트 Theme를 적용한다.",
      defineTheme: "brand·neutral·radius·scaling·fontFamily로 Theme를 만든다.",
      defaultTheme:
        "indigo 브랜드, slate 중립색, medium radius의 기본 Theme다.",
      creamTheme:
        "ruby 브랜드, sand 중립색, small radius의 다른 브랜드 예시다.",
      resolveScale:
        "스케일 이름이나 custom 배열을 모드별 12단계 색으로 바꾼다.",
      themeStylesheet: "Theme 하나의 CSS 변수 선언 문자열을 만든다.",
      themeKey: "theme 이름과 설정 해시를 합친 stylesheet 키다.",
      defaultTypography: "역할별 글자 크기·줄 높이·굵기·자간 기본값이다.",
      colorScaleNames: "brand에 쓸 수 있는 Radix 색 스케일 이름이다.",
      neutralScaleNames: "neutral에 쓸 수 있는 중립 스케일 이름이다.",
      radiusNames: "Theme radius 단계 이름이다.",
      scalingNames: "Theme scaling 단계 이름이다.",
      typographyRoleNames: "Theme의 typography 역할 이름이다.",
    },
    stories: ["Global/Theme"],
    example: "ThemeExample",
    rules: [
      'theme 생략 시 defaultTheme, mode 생략 시 light이다. 시스템 설정을 따르려면 mode="system"을 지정한다. 라우터 Link를 쓰려면 href를 to로 넘기는 adapter(({ href, ...props }) => <Link to={href} {...props} />)를 linkComponent에 넘긴다.',
      "Theme 입력은 name·brand·neutral·radius·scaling·fontFamily·typography(선택)다. brand는 스케일 이름(blue·indigo·ruby 등) 또는 { light, dark } 12단계 배열이고 neutral은 gray·mauve·slate·sage·olive·sand다.",
      "radius는 none·small·medium·large·full, scaling은 90%·95%·100%·105%·110%다. 터치 영역은 어느 scaling에서도 44px 이상이다. 색 하나하나를 적지 않는다. 컴포넌트가 brand·neutral·danger·success·warning·info 스케일의 단계를 역할에 맞게 쓴다.",
      "채운 배경(primary 버튼·solid 배지)은 글자와 4.5:1을 만족하는 단계를 자동으로 고른다. 중첩 ThemeProvider와 Portal은 가까운 Theme 범위를 따르고 Theme 이름은 서로 달라야 한다.",
    ],
  },
  {
    components: {
      Button: "저장·실행 등 사용자의 행동을 수행한다.",
      IconButton: "아이콘만 표시하는 행동에 접근 가능한 이름을 제공한다.",
      ButtonLink: "버튼 외형을 가진 실제 링크로 이동한다.",
    },
    stories: ["Base/Button"],
    example: "ButtonsExample",
    rules: [
      "variant는 primary·secondary·ghost·destructive 네 가지다. 화면의 주요 행동 하나만 primary, 나머지 보조 행동은 secondary, 낮은 강조는 ghost, 삭제·되돌릴 수 없는 행동은 destructive다.",
      'Button은 type="button"이 기본이다. loading은 라벨을 유지하면서 중복 실행을 막는다. 아이콘은 leadingIcon·trailingIcon에 Icon을 넣는다.',
      "IconButton은 icon과 label이 필수이고 size는 md·lg만 받는다. ButtonLink는 href가 필수이며 disabled·loading은 제공하지 않는다. ThemeProvider의 linkComponent가 있으면 그 Link로 렌더링한다.",
    ],
  },
  {
    components: { Input: "한 줄의 텍스트나 네이티브 입력값을 받는다." },
    stories: ["Base/Input"],
    example: "InputExample",
    rules: [
      "Field로 label·설명·오류를 연결한다. inputSize는 sm(44px)·md(56px)이다. HTML size와 구분한다.",
      "name·type·inputMode·autoComplete를 목적에 맞게 지정한다. 오류 검증과 메시지 결정은 소비 코드가 맡는다.",
    ],
  },
  {
    components: { Textarea: "여러 줄의 텍스트를 입력받는다." },
    stories: ["Base/Textarea"],
    example: "TextareaExample",
    rules: [
      "Field로 label·설명·오류를 연결한다. rows 기본값은 4이며 입력 글꼴·포커스·경계는 Theme를 따른다.",
    ],
  },
  {
    components: {
      Field: "입력 하나에 label·설명·오류·필수 여부를 연결한다.",
      Label: "htmlFor로 별도 입력과 연결하는 label이다.",
    },
    stories: ["Base/Label", "Component/Form"],
    example: "FieldExample",
    rules: [
      "Field에는 입력 하나 또는 RadioGroup처럼 하나의 그룹을 놓는다. ID를 지정하려면 Field의 id를 사용한다.",
      "Field가 연결하는 입력은 AUI 컨트롤이다. 임의의 자식 DOM에 속성을 복제해 주지 않는다. Label을 쓰면 htmlFor와 입력 id를 맞춘다.",
    ],
  },
  {
    components: {
      Text: "본문·보조·캡션 텍스트를 Theme 역할에 맞게 표시한다.",
      Heading: "문서의 제목 단계와 제목 외형을 구분한다.",
      SectionLabel: "영역을 구분하는 작은 라벨을 표시한다.",
    },
    stories: ["Global/Typography"],
    example: "TypographyExample",
    rules: [
      'Heading의 level은 문서 구조, size는 외형이다. Text의 tone="default"는 현재 표면의 글자색을 상속한다.',
      "Text의 as는 p·span만 지원한다. 제목 역할을 SectionLabel로 대신하지 않는다.",
    ],
  },
  {
    components: {
      Stack: "정해진 간격으로 세로 배치한다.",
      Inline: "정렬과 줄바꿈을 지정해 가로 배치한다.",
      Container: "form·content·wide 중 콘텐츠 폭을 선택한다.",
    },
    stories: ["Global/Spacing"],
    example: "LayoutExample",
    rules: [
      "gap은 none·xs·sm·md·section만 받는다. Stack의 align은 stretch(기본)·start·center·end, Inline의 justify는 start·center·between·end이고 기본 wrap=true다.",
      "2열 이상은 Grid, 페이지 제목 영역은 PageHeader, 하단 저장 바는 ActionBar, 사이드바와 본문 틀은 AppShell을 쓴다. div에 style이나 className으로 배치를 만들지 않는다.",
    ],
  },
  {
    components: {
      Grid: "같은 폭의 열로 나누고 좁은 화면에서 한 열로 쌓는다.",
    },
    stories: ["Layout/Grid"],
    example: "GridExample",
    rules: [
      "columns는 1·2·3·4·auto이며 기본 2이다. auto는 14rem 이상을 확보할 수 있는 만큼 열을 채운다. 열 폭을 개별로 지정하는 prop은 없다.",
      "collapseBelow는 none·sm(640px)·md(768px)·lg(1024px)이며 기본 md이다. 그 폭 미만에서는 한 열로 쌓인다. 고정 폭 사이드바와 본문처럼 열 폭이 다른 배치에는 사용하지 않는다.",
      "자식은 셀 하나를 차지한다. 가로 한 줄 나열은 Inline, 세로 쌓기는 Stack을 사용한다.",
    ],
  },
  {
    components: {
      PageHeader: "페이지 제목·설명·경로·주요 행동을 한 줄 규칙으로 배치한다.",
    },
    stories: ["Layout/PageHeader"],
    example: "PageHeaderExample",
    rules: [
      "화면마다 하나만 두고 title은 h1(level 기본 1)이다. 하위 영역의 제목은 Heading level 2 이상을 쓴다.",
      "actions에는 Button을 최대 두 개 두고 주요 행동 하나만 primary다. 경로 표시는 breadcrumb에 Breadcrumb을 넣는다.",
    ],
  },
  {
    components: {
      ActionBar: "폼이나 화면 하단에 저장·취소 버튼을 고정 배치한다.",
    },
    stories: ["Layout/ActionBar"],
    example: "ActionBarExample",
    rules: [
      "기본 sticky로 화면 하단에 붙고 safe area 여백을 포함한다. justify는 end(기본)·start·between·stretch다. 좁은 화면에서는 버튼이 가로를 채운다.",
      '주요 행동은 오른쪽 마지막에 primary 하나, 취소는 ghost로 둔다. 폼 안에서는 type="submit" 버튼을 넣는다.',
    ],
  },
  {
    components: {
      AppShell: "상단 헤더·사이드바·본문으로 앱 화면의 틀을 만든다.",
    },
    stories: ["Layout/AppShell"],
    example: "AppShellExample",
    rules: [
      "sidebar는 1024px 이상에서만 보인다. 좁은 화면의 메뉴는 header의 IconButton으로 Drawer를 열어 같은 Sidebar를 넣는다.",
      "children이 main 영역이고 안에 Container로 폭을 정한다. sidebarWidth는 md(16rem)·sm(13rem)이다. 라우팅과 현재 위치는 소비 코드가 맡는다.",
    ],
  },
  {
    components: { Separator: "내용 사이에 의미 있는 구분선을 놓는다." },
    stories: ["Base/Separator"],
    example: "SeparatorExample",
    rules: [
      "props를 받지 않는 수평 구분선이다. 단순 여백은 Stack의 gap을 사용한다.",
    ],
  },
  {
    components: {
      Card: "관련 정보를 하나의 표면에 묶는다.",
      CardHeader: "카드 제목과 설명을 묶는다.",
      CardTitle: "카드의 h3 제목을 표시한다.",
      CardDescription: "카드의 보조 설명을 표시한다.",
      CardContent: "카드 본문을 담는다.",
      CardFooter: "카드 하단의 행동을 배치한다.",
    },
    stories: ["Component/Card"],
    example: "CardExample",
    rules: [
      "Card의 tone은 plain·muted이다. Card 자체를 클릭하는 버튼으로 만들지 말고 ButtonLink·LinkRow를 사용한다.",
      "Header·Content·Footer는 필요한 부분만 조합한다. CardTitle은 h3이므로 페이지의 제목 구조를 확인한다.",
    ],
  },
  {
    components: { Badge: "상태를 짧은 텍스트로 표시한다." },
    stories: ["Base/Badge"],
    example: "BadgeExample",
    rules: [
      "tone은 neutral(기본)·brand·success·warning·danger·info, variant는 soft(기본)·solid·outline, size는 sm·md·lg다. 완료는 success, 진행 중·주의는 warning, 실패는 danger, 안내는 info를 쓴다.",
      "클릭·토글 컨트롤이 아니다. 해제 가능한 조건에는 FilterChip, 눌림 상태에는 Toggle을 쓴다.",
    ],
  },
  {
    components: { Avatar: "사진 또는 이름의 첫 글자로 대상을 구분한다." },
    stories: ["Base/Avatar"],
    example: "AvatarExample",
    rules: [
      "name은 필수이다. 사진이 없거나 로드에 실패하면 이름 첫 글자를 표시한다. 배경색은 name으로 정해지며 toneIndex를 지정하면 그 값으로 4가지 색 중 하나를 고른다. 색은 상태나 권한을 의미하지 않는다.",
    ],
  },
  {
    components: { Callout: "영역 안에서 중요한 안내와 후속 행동을 표시한다." },
    stories: ["Component/Callout"],
    example: "CalloutExample",
    rules: [
      'tone은 info(기본)·success·warning·danger다. danger는 role="alert", warning은 role="status"로 전달되므로 일반 안내에는 info를 쓴다.',
      "title은 한 줄 요약이고 설명은 children에 Text로 넣는다. 후속 행동은 action에 Button 하나를 둔다.",
    ],
  },
  {
    components: { LinkRow: "제목과 설명을 가진 행 전체를 링크로 만든다." },
    stories: ["Component/LinkRow"],
    example: "LinkRowExample",
    rules: [
      "href와 title이 필수이다. variant는 card·plain이며 라우팅과 목적지 결정은 소비 코드가 맡는다.",
    ],
  },
  {
    components: { ListItem: "행 전체를 누르는 버튼으로 동작을 실행한다." },
    stories: ["Component/ListItem"],
    example: "ListItemExample",
    rules: [
      "title은 필수이고 description·leading·trailing을 추가할 수 있다. size는 sm(기본·한 줄·44px)·lg(제목 아래 설명·최소 64px)이다. sm은 긴 문구를 말줄임하고 lg는 줄바꿈해 높이가 늘어난다.",
      '기본 type="button"이다. 링크 이동에는 LinkRow를 사용한다. disabled·ref·기본 이벤트와 ARIA 속성을 유지한다.',
      "앞뒤 슬롯에는 아이콘·텍스트·Badge 같은 표시 내용을 넣는다. 행 안에 버튼·링크·입력을 중첩하지 않는다.",
      "trailing이 없으면 오른쪽 화살표를 표시한다. chevron으로 표시 여부를 지정한다. 선택·현재 위치를 나타내는 selected prop은 제공하지 않는다.",
    ],
  },
  {
    components: {
      SegmentedControl: "적은 수의 필터 중 하나를 선택한다.",
      FilterChip: "적용된 필터를 표시하고 해제한다.",
    },
    stories: ["Component/Selection"],
    example: "SelectionExample",
    rules: [
      "SegmentedControl은 value·onValueChange·options·ariaLabel이 필수인 제어 컴포넌트다. 콘텐츠 패널 전환에는 Tabs를 사용한다.",
      "FilterChip의 label에는 '완료 필터 해제'처럼 동작을 적는다. label·children·onClear가 필요하다.",
    ],
  },
  {
    components: {
      EmptyState: "데이터가 없을 때 이유와 다음 행동을 안내한다.",
      ErrorState: "오류와 재시도 방법을 안내한다.",
      LoadingState: "처리 중임을 텍스트와 status로 알린다.",
    },
    stories: ["Component/Feedback"],
    example: "FeedbackExample",
    rules: [
      "EmptyState는 정상적인 빈 결과, ErrorState는 실패에 사용한다. onRetry가 있어야 재시도 버튼을 표시한다.",
      "실제 요청·재시도·로딩 상태는 소비 코드가 관리한다.",
    ],
  },
  {
    components: { Skeleton: "아직 불러오지 않은 콘텐츠의 형태를 보여 준다." },
    stories: ["Base/Skeleton"],
    example: "SkeletonExample",
    rules: [
      "variant는 line·title·avatar·card이다. 장식이므로 aria-hidden이며 로딩 안내는 LoadingState 등으로 별도 제공한다.",
    ],
  },
  {
    components: { Dialog: "배경 작업을 잠시 멈추고 집중할 내용을 보여 준다." },
    stories: ["Component/Modal"],
    example: "DialogExample",
    rules: [
      "title과 children은 필수이다. trigger 또는 open·onOpenChange로 열고 닫는다. size는 sm·md이며 기본 md이다.",
      "닫힘 후 포커스는 트리거로 돌아간다. 파괴적 행동의 확인에는 ConfirmDialog를 사용한다.",
    ],
  },
  {
    components: { Drawer: "화면 가장자리에서 작업 영역을 연다." },
    stories: ["Layout/Drawer"],
    example: "DrawerExample",
    rules: [
      'side="responsive"는 모바일에서 하단, 넓은 화면에서 오른쪽으로 열린다. left·right로 방향을 고정할 수 있다.',
      "title·children은 필수이며 trigger 또는 open·onOpenChange를 사용한다. header에 검색창·필터를 두면 header·footer 사이의 본문만 스크롤한다.",
      "size는 auto(기본·내용만큼)·half(50%)·tall(85%)·full(전체 높이)이다. 하단에서 열릴 때만 적용하며, 옆에서 열리면 화면 높이를 채운다. full은 상단 safe area 여백을 포함한다.",
      "지정 높이가 작아도 고정 영역과 목록 한 줄이 들어갈 최소 높이는 확보한다.",
    ],
  },
  {
    components: {
      Panel: "화면 흐름 안에 제목·본문·푸터를 가진 영역을 만든다.",
    },
    stories: ["Layout/Panel"],
    example: "PanelExample",
    rules: [
      "Panel 자체에 open·onOpenChange나 닫기 애니메이션은 없다. 열리는 패널은 Drawer 안에 조합한다. 이 경우 Drawer가 제목·닫기·애니메이션을 담당한다.",
    ],
  },
  {
    components: { Sidebar: "현재 위치와 탐색 링크를 표시한다." },
    stories: ["Layout/Sidebar"],
    example: "SidebarExample",
    rules: [
      "label·items가 필수이며 currentId가 현재 페이지를 표시한다. 라우팅은 소비 코드가 맡는다.",
      "접고 펼치는 메뉴가 필요하면 Drawer 안에 조합한다. Sidebar 자체에는 open prop이 없다.",
    ],
  },
  {
    components: {
      ConfirmDialog: "확인이 필요한 행동을 명시적으로 승인하거나 취소한다.",
    },
    stories: ["Component/ConfirmDialog"],
    example: "ConfirmExample",
    rules: [
      'open·onOpenChange·title·description·onConfirm이 필수다. 기본 tone="destructive", confirmLabel="삭제"이므로 다른 행동은 라벨과 tone을 함께 지정한다.',
      "onConfirm이 자동으로 닫지 않는다. 성공 후 open=false로 변경하고 비동기 작업 동안 busy를 사용한다. busy일 때 취소·Escape와 중복 실행을 막는다.",
    ],
  },
  {
    components: { Popover: "트리거 근처에 작은 입력이나 보조 작업을 연다." },
    stories: ["Component/Popover"],
    example: "PopoverExample",
    rules: [
      "title·trigger·children이 필수다. 짧은 설명만 필요하면 Tooltip, 작업 목록은 DropdownMenu를 사용한다.",
    ],
  },
  {
    components: { DropdownMenu: "트리거에서 실행할 수 있는 행동 목록을 연다." },
    stories: ["Component/DropdownMenu"],
    example: "MenuExample",
    rules: [
      "label·trigger·items가 필수다. 각 항목은 id·label·onSelect를 갖는다. 선택한 폼 값을 보관하려면 Select를 사용한다.",
    ],
  },
  {
    components: {
      Icon: "lucide 아이콘을 패키지 크기·굵기로 표시한다.",
      iconNames: "Icon의 name으로 쓸 수 있는 이름 목록이다.",
    },
    stories: ["Base/Icon"],
    example: "IconExample",
    rules: [
      "name은 iconNames 중 하나다. 목록에 없는 아이콘은 lucide-react에서 import해 source에 넘긴다. SVG를 직접 그리지 않는다.",
      "Icon 자체는 aria-hidden이다. 아이콘만 있는 버튼은 IconButton의 label로 의미를 전달한다. size는 md(20px)·sm(16px)이고 색은 currentColor를 따른다.",
    ],
  },
  {
    components: { Checkbox: "폼에서 개별 항목의 선택·해제를 표현한다." },
    stories: ["Base/Checkbox"],
    example: "CheckboxExample",
    rules: [
      "checked·defaultChecked·onCheckedChange를 사용한다. checked는 boolean 또는 'indeterminate'이다. name을 지정해 제출한다.",
      "단독 사용에는 label, 설명·오류를 연결하려면 Field를 사용한다. 일부 선택 상태는 전체 선택 체크박스 등에 사용한다.",
    ],
  },
  {
    components: { Switch: "즉시 적용되는 설정을 켜고 끈다." },
    stories: ["Base/Switch"],
    example: "SwitchExample",
    rules: [
      "checked·defaultChecked·onCheckedChange를 사용한다. 동의나 다중 항목 선택에는 Checkbox를 사용한다.",
    ],
  },
  {
    components: { RadioGroup: "보이는 선택지 중 폼 값 하나를 고른다." },
    stories: ["Base/RadioGroup"],
    example: "RadioExample",
    rules: [
      "options는 { value, label, disabled? } 배열이다. 비어 있지 않은 고유 value를 사용한다. Field나 aria-label로 그룹 이름을 준다.",
    ],
  },
  {
    components: { Select: "목록을 열어 폼 값 하나를 고른다." },
    stories: ["Base/Select"],
    example: "SelectExample",
    rules: [
      "options는 { value, label, disabled? } 배열이다. 비어 있지 않은 고유 value를 사용한다. name·required·form reset을 지원한다.",
      "768px 미만에서는 하단 Drawer, 넓은 화면에서는 드롭다운으로 열린다. 선택 후 닫히고 포커스가 트리거로 돌아온다. 화면 크기가 바뀌면 목록을 닫고 값은 유지한다.",
      "Drawer 제목은 selectionTitle, Field label, aria-label, '항목 선택' 순서로 정한다. inputSize는 sm·md이다. open prop은 공개하지 않는다.",
    ],
  },
  {
    components: { Slider: "범위 안의 숫자 하나를 조절한다." },
    stories: ["Base/Slider"],
    example: "SliderExample",
    rules: [
      "value·defaultValue는 숫자 하나이며 배열이 아니다. min·max·step을 지정한다. 기본 초기값은 defaultValue 또는 min이다.",
      "onValueChange는 조작 중, onValueCommit은 조작 완료 시 사용한다. Field나 aria-label로 이름을 제공한다.",
    ],
  },
  {
    components: { Toggle: "하나의 버튼이 눌린 상태를 유지한다." },
    stories: ["Base/Toggle"],
    example: "ToggleExample",
    rules: [
      "pressed·defaultPressed·onPressedChange를 사용한다. 폼의 체크 값이나 즉시 설정에는 Checkbox·Switch를 검토한다.",
    ],
  },
  {
    components: { ToggleGroup: "여러 버튼의 단일·다중 눌림 상태를 관리한다." },
    stories: ["Base/ToggleGroup"],
    example: "ToggleGroupExample",
    rules: [
      'aria-label과 options가 필수이다. type="single" 또는 생략 시 value는 string, type="multiple"이면 string[]이다. 해제하면 빈 문자열 또는 빈 배열이 될 수 있다.',
      "폼의 필수 단일 선택에는 RadioGroup을 사용한다. 선택 상태는 secondary 계열 색을 사용한다.",
    ],
  },
  {
    components: { Tabs: "제목과 연결된 콘텐츠 패널을 전환한다." },
    stories: ["Component/Tabs"],
    example: "TabsExample",
    rules: [
      "label·items가 필수이고 각 item은 value·label·content를 갖는다. defaultValue 생략 시 첫 활성 항목을 선택한다.",
      '필터만 변경하려면 SegmentedControl을 사용한다. activationMode="manual"은 방향키 이동 후 Enter·Space로 선택한다.',
    ],
  },
  {
    components: { Accordion: "여러 제목 아래의 내용을 펼치고 접는다." },
    stories: ["Component/Accordion"],
    example: "AccordionExample",
    rules: [
      'items는 { value, title, content, disabled? } 배열이다. type="single" 또는 생략 시 값은 string, multiple이면 string[]이다. single도 모두 닫을 수 있다.',
    ],
  },
  {
    components: { Collapsible: "하나의 보조 콘텐츠를 펼치고 접는다." },
    stories: ["Component/Collapsible"],
    example: "CollapsibleExample",
    rules: [
      "label·children이 필수다. 여러 제목을 묶으면 Accordion, 단일 내용의 열림은 Collapsible을 사용한다.",
    ],
  },
  {
    components: { Tooltip: "hover·focus 시 짧은 보충 설명을 표시한다." },
    stories: ["Component/Tooltip"],
    example: "TooltipExample",
    rules: [
      "content는 문자열이고 trigger가 필수다. 필수 안내나 클릭해야 하는 버튼·입력을 Tooltip 안에 넣지 않는다.",
    ],
  },
  {
    components: {
      ToastProvider: "현재 Theme 범위의 일시적 결과 알림을 관리한다.",
      useToast: "가까운 ToastProvider에 알림을 추가하거나 닫는다.",
    },
    stories: ["Component/Toast"],
    example: "ToastExample",
    rules: [
      "ToastProvider를 ThemeProvider 안에 두고 그 하위 컴포넌트에서 useToast를 호출한다.",
      "toast({ title, description?, tone?, action? })는 id를 반환한다. dismiss(id)로 닫는다. action에는 label·altText·onClick이 필요하다.",
      "실제 저장·오류 판단은 소비 코드가 맡는다. 사용자 확인을 받아야 하는 작업에는 ConfirmDialog를 사용한다.",
    ],
  },
  {
    components: { Progress: "작업의 진행 정도를 전달한다." },
    stories: ["Base/Progress"],
    example: "ProgressExample",
    rules: [
      "label은 필수이다. value가 null이거나 생략되면 진행률 미정이다. max 기본값은 100이다.",
    ],
  },
  {
    components: { Breadcrumb: "현재 위치까지의 경로를 표시한다." },
    stories: ["Component/Breadcrumb"],
    example: "BreadcrumbExample",
    rules: [
      "items의 마지막 항목은 현재 페이지이며 링크 대신 텍스트로 표시한다. 상위 항목에 href를 지정한다.",
    ],
  },
  {
    components: { Pagination: "목록의 페이지 번호를 전환한다." },
    stories: ["Component/Pagination"],
    example: "PaginationExample",
    rules: [
      "page는 1부터 시작한다. page·pageCount·onPageChange가 필수이다. 데이터 조회와 URL 반영은 소비 코드가 맡는다.",
    ],
  },
  {
    components: {
      Table: "caption을 가진 의미 있는 데이터 표를 표시한다.",
      TableHeader: "표의 머리글 행을 묶는다.",
      TableBody: "표의 데이터 행을 묶는다.",
      TableFooter: "표의 요약 행을 묶는다.",
      TableRow: "표의 한 행을 만든다.",
      TableHead: "열 또는 행의 머리글 셀을 만든다.",
      TableCell: "표의 데이터 셀을 만든다.",
    },
    stories: ["Component/Table"],
    example: "TableExample",
    rules: [
      'caption은 스크린리더용 표 이름이며 화면에는 숨긴다. TableHeader·TableBody·TableRow·TableHead·TableCell의 HTML 구조를 유지한다. TableHead는 기본 scope="col"이다.',
      "바깥 모서리는 Theme radius를 따르되 최대 4px로 제한한다. radius가 0이면 각진 모양이다.",
      "정렬·검색·페이지 조회는 소비 코드가 맡는다. align·width·bgcolor 같은 HTML 외형 속성도 허용하지 않는다.",
    ],
  },
  {
    components: { ScrollArea: "높이가 제한된 영역을 키보드로도 스크롤한다." },
    stories: ["Layout/ScrollArea"],
    example: "ScrollExample",
    rules: [
      "label은 필수이며 height는 sm·md·lg이다. 콘텐츠 자체의 의미와 포커스 가능한 항목을 유지한다.",
    ],
  },
  {
    components: { AspectRatio: "미디어 영역의 비율을 유지한다." },
    stories: ["Layout/AspectRatio"],
    example: "AspectExample",
    rules: [
      "ratio는 16:9·4:3·1:1이다. 이미지의 alt와 로딩 정책은 소비 코드가 정한다.",
    ],
  },
];

// 화면 단위 레시피. AI는 컴포넌트 문서보다 이 예제를 먼저 복사한다.
export const recipes = [
  {
    id: "list-screen",
    title: "목록 화면",
    description:
      "제목·필터·검색·표·페이지 이동·빈 상태를 갖춘 목록 화면이다. 데이터 조회와 URL 반영은 소비 코드가 맡는다.",
    example: "ListScreenRecipe",
  },
  {
    id: "settings-form",
    title: "설정 폼",
    description:
      "2열 입력과 선택·동의를 하단 고정 저장 바로 제출하는 폼이다. 검증 메시지는 Field의 error로 연결한다.",
    example: "SettingsFormRecipe",
  },
  {
    id: "detail-screen",
    title: "상세 화면",
    description:
      "경로·제목·행동 메뉴와 카드로 나눈 정보, 삭제 확인을 갖춘 상세 화면이다.",
    example: "DetailScreenRecipe",
  },
  {
    id: "dialog-form",
    title: "모달 폼",
    description:
      "Dialog 안에서 입력을 받고 footer의 버튼으로 저장·취소하는 흐름이다. 저장 결과는 Toast로 알린다.",
    example: "DialogFormRecipe",
  },
  {
    id: "app-layout",
    title: "앱 레이아웃",
    description:
      "AppShell에 헤더·사이드바를 두고 좁은 화면에서는 Drawer로 같은 메뉴를 여는 틀이다.",
    example: "AppLayoutRecipe",
  },
];
