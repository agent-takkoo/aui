import type { ColorMode, Theme } from "@heogeon0/aui";
import { ThemeProvider, defaultTheme, resolveScale } from "@heogeon0/aui";

const fields: Record<keyof Theme, { type: string; description: string }> = {
  name: {
    type: "string",
    description:
      "theme의 이름이에요. 영문 소문자로 시작하고 숫자와 하이픈을 사용해요. 중첩한 theme끼리 서로 달라야 해요.",
  },
  brand: {
    type: "ColorScaleName | CustomColorScale",
    description:
      "주요 행동·선택·포커스에 쓰는 브랜드 색 스케일이에요. Radix 색 이름 하나 또는 { light, dark } 12단계 배열이에요.",
  },
  neutral: {
    type: "NeutralScaleName | CustomColorScale",
    description:
      "배경·글자·경계·보조 표면에 쓰는 중립 스케일이에요. gray·mauve·slate·sage·olive·sand 중 하나예요.",
  },
  radius: {
    type: '"none" | "small" | "medium" | "large" | "full"',
    description:
      "모서리 단계예요. 작은 컨트롤부터 팝업까지 역할별 radius가 이 단계에 비례해요.",
  },
  scaling: {
    type: '"90%" | "95%" | "100%" | "105%" | "110%"',
    description: "글자 크기·간격·컨트롤 높이의 밀도예요.",
  },
  fontFamily: {
    type: "string",
    description:
      "본문과 제목에 사용하는 글꼴이에요. 폰트 파일은 소비 프로젝트가 불러와요.",
  },
  typography: {
    type: "TypographyTokens",
    description:
      "역할별 글자 크기·줄 높이·굵기·자간이에요. 입력에서는 바꿀 역할만 적고 나머지는 기본값을 써요.",
  },
};

const roles: { token: string; from: string; description: string }[] = [
  { token: "background", from: "neutral-1", description: "범위 전체의 배경" },
  { token: "foreground", from: "neutral-12", description: "기본 글자" },
  {
    token: "card",
    from: "white · neutral-2(다크)",
    description: "카드·Panel·모달·Drawer의 표면",
  },
  { token: "card-border", from: "neutral-a6", description: "카드의 경계" },
  {
    token: "popover",
    from: "white · neutral-3(다크)",
    description: "Popover·메뉴·Tooltip의 표면",
  },
  {
    token: "primary",
    from: "brand-9~11 중 4.5:1을 만족하는 첫 단계",
    description: "주요 행동의 배경과 포커스 링",
  },
  { token: "primary-text", from: "brand-11", description: "브랜드색 글자" },
  { token: "secondary", from: "neutral-a3", description: "보조 행동의 배경" },
  { token: "muted", from: "neutral-2", description: "연한 블록·빈 화면" },
  { token: "muted-foreground", from: "neutral-11", description: "보조 설명" },
  { token: "accent", from: "neutral-a4", description: "hover·탐색 중 항목" },
  {
    token: "selected",
    from: "brand-a3 · brand-12",
    description: "지속되는 선택·현재 위치",
  },
  { token: "border", from: "neutral-a6", description: "장식 경계" },
  { token: "input", from: "neutral-a9", description: "입력·선택 컨트롤 경계" },
  {
    token: "destructive",
    from: "danger-9~11 중 4.5:1을 만족하는 첫 단계",
    description: "삭제·위험 행동의 배경",
  },
  {
    token: "destructive-text",
    from: "danger-11",
    description: "오류 메시지 글자",
  },
];

export function ThemeShapeTable() {
  return (
    <ThemeProvider>
      <div className="docs-theme-reference">
        <div className="docs-reference-scroll">
          <table>
            <caption>Theme 객체의 필드</caption>
            <thead>
              <tr>
                <th scope="col">필드</th>
                <th scope="col">타입</th>
                <th scope="col">역할</th>
                <th scope="col">defaultTheme 값</th>
              </tr>
            </thead>
            <tbody>
              {(Object.keys(fields) as (keyof Theme)[]).map((key) => (
                <tr key={key}>
                  <th scope="row">
                    <code>{key}</code>
                  </th>
                  <td>
                    <code>{fields[key].type}</code>
                  </td>
                  <td>{fields[key].description}</td>
                  <td>
                    <code data-field={key}>
                      {key === "typography"
                        ? "역할별 값은 아래 전체 객체에서 확인해요."
                        : String(defaultTheme[key])}
                    </code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </ThemeProvider>
  );
}

function ScaleRow({
  label,
  scale,
  mode,
}: {
  label: string;
  scale: Theme["brand"];
  mode: ColorMode;
}) {
  const resolved = resolveScale(scale, mode);
  return (
    <tr data-scale={label} data-mode={mode}>
      <th scope="row">
        <code>
          {label} · {mode}
        </code>
      </th>
      {resolved.solid.map((value, index) => (
        <td key={index} data-step={index + 1}>
          <span
            className="docs-reference-swatch"
            style={{ backgroundColor: value }}
            aria-hidden="true"
          />
          <code>{value}</code>
        </td>
      ))}
    </tr>
  );
}

export function ThemeScaleTable() {
  return (
    <ThemeProvider>
      <div className="docs-theme-reference">
        <div className="docs-reference-scroll">
          <table>
            <caption>defaultTheme 색 스케일</caption>
            <thead>
              <tr>
                <th scope="col">스케일</th>
                {Array.from({ length: 12 }, (_, index) => (
                  <th scope="col" key={index}>
                    {index + 1}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(["light", "dark"] as const).map((mode) => (
                <ScaleRow
                  key={`brand-${mode}`}
                  label="brand"
                  scale={defaultTheme.brand}
                  mode={mode}
                />
              ))}
              {(["light", "dark"] as const).map((mode) => (
                <ScaleRow
                  key={`neutral-${mode}`}
                  label="neutral"
                  scale={defaultTheme.neutral}
                  mode={mode}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </ThemeProvider>
  );
}

export function ThemeRoleTable() {
  return (
    <ThemeProvider>
      <div className="docs-theme-reference">
        <div className="docs-reference-scroll">
          <table>
            <caption>역할 변수와 스케일 단계</caption>
            <thead>
              <tr>
                <th scope="col">CSS 변수</th>
                <th scope="col">스케일 단계</th>
                <th scope="col">역할</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((role) => (
                <tr key={role.token}>
                  <th scope="row">
                    <code>--ds-{role.token}</code>
                  </th>
                  <td>
                    <code>{role.from}</code>
                  </td>
                  <td>{role.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </ThemeProvider>
  );
}
