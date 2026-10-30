AUI의 디자인 검수에는 Vercel의 구현 기준, Interface Design의 일관성 점검, Impeccable의 화면 평가 방식을 함께 참고한다. 접근성 수치와 키보드 동작은 W3C 원문으로 확인한다. Story를 줄이더라도 외형과 중요한 상태를 비교할 수 있는 예제는 남긴다.

확인일은 2026-10-28이다. 이 문서는 공개 스킬과 가이드를 조사한 기록이며, 아래 AUI 적용 방법은 이 프로젝트를 위한 제안이다. 스킬 설치나 전체 컴포넌트의 디자인 검수를 완료했다는 뜻은 아니다.

이를 적용한 기준은 [AUI 디자인 원칙](design-principles.md), 실제 변경과 검증 범위는 [개선 기록](design-review-2026-10-28.md)에 정리했다.

## 참고할 공개 스킬

| 스킬과 원문                                                                                                                                                                                                                  | 주로 다루는 것                                                                                                                        | AUI에서 참고할 부분                                                                                                                               |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Vercel [web-design-guidelines](https://github.com/vercel-labs/agent-skills/blob/main/skills/web-design-guidelines/SKILL.md) · [실제 검수 규칙](https://github.com/vercel-labs/web-interface-guidelines/blob/main/command.md) | UI 코드를 읽고 접근성·폼·포커스·동작·반응형 문제를 파일과 위치로 보고한다.                                                            | 키보드, label, 입력 상태, 긴 문구, reduced motion을 구현 근거와 함께 확인한다. 코드 검사만으로 시각적 완성도를 판정하지 않는다.                   |
| [Interface Design](https://github.com/Dammyjay93/interface-design/blob/main/.claude/skills/interface-design/SKILL.md)                                                                                                        | 대시보드·설정·업무 도구의 시각적 위계, 밀도, token, 컴포넌트 재사용과 상태를 다룬다.                                                  | 글자·간격·radius·표면의 관계를 보고 기존 Theme와 컴포넌트를 우선한다. 스킬에 나온 특정 비율과 치수는 AUI의 고정값으로 옮기지 않는다.              |
| [Impeccable](https://github.com/pbakaus/impeccable) · [스킬 원문](https://github.com/pbakaus/impeccable/blob/main/skill/SKILL.src.md)                                                                                        | `critique`로 UX와 위계를 평가하고, `audit`로 구현 품질을 검사한다. `polish`, `harden`, `adapt`는 마무리·예외 상황·기기 대응을 다룬다. | 렌더링된 결과를 실제 사용 크기에서 확인한다. AUI는 업무 수행과 문서 이해가 중심이므로 장식보다 읽기·조작·일관성을 우선한다.                       |
| Anthropic [frontend-design](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md)                                                                                                                  | 제품의 맥락을 바탕으로 색·typography·구도에 의도를 부여하고 결과를 스스로 검토한다.                                                   | 모든 요소를 똑같이 강조하지 않았는지, 장식이 정보 전달에 도움이 되는지 확인한다. 새로운 브랜드 표현은 소비 프로젝트의 Theme 설계에 사용한다.      |
| [UI UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) · [스킬 원문](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/blob/main/.claude/skills/ui-ux-pro-max/SKILL.md)                              | UX·색·글꼴·스타일·기술별 가이드를 검색하고 제품에 맞는 디자인 구성을 제안한다.                                                        | 폼 오류·긴 문구·모바일 조작처럼 구체적인 문제의 참고 자료로 사용한다. 생성한 팔레트나 페이지별 스타일을 기존 Theme 위에 자동으로 덮어쓰지 않는다. |

현재 목적에는 앞의 세 스킬이 직접적이다. Anthropic frontend-design과 UI UX Pro Max는 새로운 시각적 방향을 고민할 때 보완 자료로 쓰는 편이 맞다. 이는 기능 설명을 바탕으로 한 AUI 적용 판단이며 성능을 비교한 실험 결과는 아니다.

## 원칙을 확인할 공식 가이드

| 출처                                                                                                                           | 검수에 사용할 질문                                                                                                                                                |
| ------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Nielsen Norman Group [10 Usability Heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/)                     | 진행 상황을 알 수 있는가? 행동을 취소하거나 오류에서 회복할 수 있는가? 선택지를 기억에 의존하지 않고 알아볼 수 있는가?                                            |
| W3C [WCAG 2.2 설명](https://www.w3.org/WAI/WCAG22/Understanding/)                                                              | 대비·조작 영역·확대·화면 재배치에서 어떤 기준과 예외를 적용해야 하는가?                                                                                           |
| W3C [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/patterns/)                                                      | Button·Tabs·Select·Dialog가 각 패턴에 맞는 이름·역할·키보드·포커스 동작을 제공하는가?                                                                             |
| IBM [Carbon Button 가이드](https://www.carbondesignsystem.com/building-blocks/core/components/button/guidelines)               | variant의 강조 정도가 행동의 중요도를 표현하는가? 크기·로딩·아이콘·버튼 조합까지 설명하는가? Carbon의 정렬과 variant 사용 규칙은 해당 시스템의 선택으로 구분한다. |
| Apple [Human Interface Guidelines: Accessibility](https://developer.apple.com/design/human-interface-guidelines/accessibility) | 글자 확대, VoiceOver, 라이트·다크, 움직임 줄이기와 터치 조작을 고려했는가?                                                                                        |
| Google [Android 접근성 가이드](https://developer.android.com/guide/topics/ui/accessibility/views/apps-views)                   | 보이는 아이콘보다 실제 터치 영역이 충분한가? 보조 기술에 요소의 목적을 전달하는가?                                                                                |
| [Storybook: How to write stories](https://storybook.js.org/docs/writing-stories)                                               | 중요한 렌더링 상태를 재현하고 설명할 수 있는가? Controls를 조작하기 전에도 제공하는 선택지를 이해할 수 있는가?                                                    |

## 현재 환경에 있는 자료

`design:design-critique`는 첫인상·사용성·시각적 위계·일관성·접근성의 다섯 관점으로 피드백을 정리한다. 관찰한 문제, 사용자에게 생기는 영향, 수정안을 연결하는 방식이 검수 기록에 유용하다.

`design:accessibility-review`는 키보드·스크린 리더·대비·확대를 함께 확인하는 참고 자료다. 다만 설치된 1.1.0 문서는 WCAG 2.1 AA 목록에 AAA 항목인 2.5.5를 포함하므로 아래 원문 구분을 적용한다. 자동 검사로 발견하는 문제의 비율도 고정된 보장값으로 사용하지 않는다.

Interface Design도 설치되어 있다. 사용자 지침에서 참조하는 Vercel Web Interface Guidelines와 React Best Practices는 각각 UI 구현과 React 성능을 보는 자료다. React 성능 기준을 통과했다고 시각적 위계나 사용성이 검증된 것은 아니다.

## 그대로 옮기면 안 되는 규칙

접근성 기준, 플랫폼 권장값, 디자인 취향, AUI의 자체 정책을 구분한다.

- **터치 영역:** WCAG 2.2의 2.5.8 AA는 원칙적으로 24×24 CSS px이며 간격·문장 안의 링크 등의 예외가 있다. 2.5.5 AAA는 44×44 CSS px와 별도 예외를 둔다. AUI의 터치 컨트롤 최소 44px은 현재 프로젝트 정책으로 유지하되 “AA의 최소 수치”라고 설명하지 않는다. [AA 원문](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html), [AAA 원문](https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html).
- **플랫폼 단위:** Apple의 iOS·iPadOS 기본 컨트롤 크기 44×44pt와 Android의 권장 터치 영역 48×48dp를 CSS px와 같은 숫자로 취급하지 않는다. Capacitor에서는 실제 기기의 WebView와 입력 환경에서 확인한다. [Apple](https://developer.apple.com/design/human-interface-guidelines/accessibility), [Android](https://developer.android.com/guide/topics/ui/accessibility/views/apps-views).
- **대비:** 일반 텍스트는 4.5:1, 큰 텍스트는 3:1을 확인한다. 큰 텍스트는 18pt 이상 또는 굵은 14pt 이상이라는 조건이 있다. 컨트롤과 상태를 식별하는 데 필요한 비텍스트 정보에는 인접 색과 3:1 기준을 적용한다. 비활성 컨트롤 등의 예외가 있으며, 모든 장식 경계에 3:1을 요구하는 것은 아니다. [텍스트](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html), [비텍스트](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html).
- **포커스:** modal 안에서 Tab 순환을 유지하는 것은 필요한 동작이다. 닫을 방법이 없어 탈출하지 못하거나, 닫은 뒤 포커스가 사라지는 문제와 구분한다. [APG Dialog](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/).
- **모바일과 확대:** 390px 화면만 확인하지 않는다. WCAG reflow의 320 CSS px 조건과 확대 시 정보 유지도 확인한다. 표처럼 의미상 2차원 배치가 필요한 영역의 스크롤은 예외로 다루고, 페이지 전체가 옆으로 넘치는 것과 구분한다. [Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html).
- **시각적 취향:** 특정 폰트를 피하라거나 모든 간격을 4의 배수로 만들라는 조언은 보편적 접근성 조건이 아니다. AUI의 `defaultTheme`, typography 역할, 기존 간격 체계와 제한된 props를 먼저 따른다. 변경이 필요하면 화면별 덮어쓰기 대신 공통 API나 Theme의 문제로 검토한다.

## AUI에서 확인할 질문

다음은 위 자료와 현재 프로젝트 요구를 묶은 검수 초안이다. 아직 각 컴포넌트의 통과 여부를 판정한 목록은 아니다.

1. **무엇을 해야 하는지 보이는가?** 주요 행동과 보조 행동을 구분할 수 있어야 한다. 버튼의 variant 이름뿐 아니라 실제 강조 차이를 같은 배경과 문구에서 비교한다.
2. **같은 역할이 같은 외형을 쓰는가?** 색·글꼴·radius가 Theme를 따르고, 간격·컨트롤 높이·아이콘 크기는 정한 역할에 맞아야 한다. 중첩 Theme와 Portal에서도 확인한다.
3. **글자와 요소의 관계가 정돈되어 있는가?** 제목·본문·설명·오류의 읽는 순서, 아이콘과 글자의 정렬, 라벨과 입력의 거리, 그룹 사이의 간격을 실제 화면에서 확인한다.
4. **중요한 상태가 보이고 구별되는가?** 해당 컴포넌트에 필요한 hover·pressed·focus-visible·disabled·loading·selected·invalid 상태를 확인한다. hover만으로 필수 정보를 전달하지 않는다.
5. **내용이 달라져도 사용할 수 있는가?** 긴 한글·영문·숫자, 빈 값, 여러 줄 설명과 오류에서 넘침·잘림·버튼 밀림을 확인한다. 잘라낸 내용이 필요하다면 다시 읽을 방법이 있어야 한다.
6. **실제로 조작할 수 있는가?** 키보드 순서, 접근 가능한 이름, 폼 제출·reset, 선택 변경, popup의 열기·닫기·포커스 복귀를 확인한다. 스크린 리더 검사는 실행한 도구와 범위를 기록한다.
7. **다른 환경에서도 같은 의미를 유지하는가?** 라이트·다크, default·cream Theme, 좁은 화면, 터치, 글자 확대를 확인한다. 모바일에서는 hover와 정밀한 포인터 조작에 의존하지 않는다.
8. **상태 변화가 이해되는가?** 로딩·완료·오류를 알리고 다음 행동을 제공한다. 열림과 닫힘 애니메이션의 방향·종료, 빠른 반복 조작, reduced motion을 함께 확인한다.

## 남겨야 할 Story의 기준

Story 수 자체를 목표로 줄이지 않는다. **사용자가 선택지를 이해하고, 개발자가 중요한 상태를 재현하고, 검수자가 차이를 비교할 수 있는가**를 기준으로 남긴다. Controls는 탐색에 유용하지만 주요 비교 화면과 재현 가능한 상태 예제를 모두 대신하지는 못한다.

| 대상                                             | 남길 예제의 목적                                                                                                 |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| Button·Badge 같은 variant 컴포넌트               | 기본 사용법과 variant 비교를 남긴다. 크기와 상태가 중요한 Button에는 size·loading·disabled 비교도 필요하다.      |
| Input·Textarea·Field                             | 정상·설명·오류·필수·disabled·readOnly 중 지원하는 상태를 보여준다. 긴 label·오류와 실제 폼 조합도 확인한다.      |
| Checkbox·Switch·RadioGroup·Select·Toggle         | 미선택·선택·disabled와 해당되는 indeterminate를 비교한다. 접근 가능한 이름과 변경 결과를 확인할 수 있게 한다.    |
| Modal·ConfirmDialog·Popover·Drawer·Panel·Sidebar | trigger로 열고 닫는 흐름, 긴 콘텐츠, footer 버튼 조합을 남긴다. 모바일 배치와 닫힘 애니메이션은 조작해 확인한다. |
| Toast·Progress·Feedback                          | 결과·진행·빈 상태·오류 중 각 컴포넌트가 맡는 역할을 보여준다. 재시도·닫기·되돌리기가 있다면 실행할 수 있게 한다. |
| Table·Tabs·Accordion·ScrollArea                  | 짧고 긴 콘텐츠, 항목 전환, 스크롤과 키보드 조작을 재현한다. 단순히 빈 영역이 렌더링되는 예제로 끝내지 않는다.    |
| Global                                           | 실제 Theme 값과 typography·spacing의 기준을 계속 공개한다. 색·font·radius를 바꿨을 때의 결과를 비교한다.         |

같은 목적의 비교는 한 Story 안에 묶고, 다른 동작이나 배치 문제가 드러나는 예제는 따로 둔다. `Default / Variants / Sizes / States / Usage`는 필요한 목적을 찾는 참고 이름이며, 모든 컴포넌트에 다섯 개를 강제하지 않는다. 공개 예제에 비정상 props나 테스트 장치를 노출할 필요는 없지만, 오류·비활성·로딩 같은 정상적인 사용 상태를 전부 testing 폴더로 숨기지도 않는다.

## 실제 검수로 이어갈 방법

먼저 Button·Form·Modal/ConfirmDialog·Drawer/Panel/Sidebar를 본다. 이번 대화에서 중요 예제가 사라졌거나 배치·닫힘 문제를 확인했던 영역이기 때문이다. 이후 선택·탐색·데이터·피드백 컴포넌트로 넓힌다.

검수할 때는 같은 commit과 같은 Story의 Theme·모드·화면 폭·args를 기록한다. 렌더링된 화면과 실제 조작으로 관찰한 뒤 관련 소스와 연결한다. 수정이 필요하면 같은 조건에서 전후를 비교한다.

결과에는 **Story와 조건 → 관찰한 문제 → 사용자에게 생기는 영향 → 적용할 원칙 → 수정안 → 다시 확인한 결과**를 남긴다. 취향에 관한 제안은 동작 오류와 구분하고, 실행하지 않은 검사는 “미확인”으로 적는다. E2E 통과, axe 결과, 스크린 리더 확인, 시각 검토는 각각 확인한 범위만 보고한다.
