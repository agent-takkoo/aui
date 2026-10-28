import type { ColorTokens, Theme } from "@ai-system/design-system";
import {
  ThemeProvider,
  colorTokenNames,
  defaultTheme,
} from "@ai-system/design-system";

const fields: Record<keyof Theme, { type: string; description: string }> = {
  typography: {
    type: "TypographyTokens",
    description: "역할별 글자 크기·줄 높이·굵기·자간과 강조 굵기예요.",
  },
  name: {
    type: "string",
    description:
      "프로젝트 theme의 이름이에요. 영문 소문자로 시작하고 숫자와 하이픈을 사용할 수 있어요.",
  },
  light: {
    type: "Readonly<ColorTokens>",
    description: "라이트 모드의 전체 색상이에요.",
  },
  dark: {
    type: "Readonly<ColorTokens>",
    description: "다크 모드의 전체 색상이에요.",
  },
  radius: {
    type: "string",
    description: "버튼·입력·카드·팝업 모서리의 기준이에요.",
  },
  fontFamily: {
    type: "string",
    description:
      "본문과 제목에 사용하는 글꼴이에요. 폰트 파일은 소비 프로젝트가 불러와요.",
  },
};

const descriptions: Record<keyof ColorTokens, string> = {
  overlay: "모달과 Drawer 뒤의 가림막",
  shadow: "떠 있는 표면과 링크 카드의 그림자 기준색",
  background: "범위 전체의 기본 배경",
  foreground: "기본 본문과 제목",
  card: "카드·팝업·선택 면의 배경",
  cardForeground: "카드 안의 글자와 아이콘",
  popover: "메뉴와 떠 있는 표면의 배경",
  popoverForeground: "메뉴 안의 글자와 아이콘",
  primary: "주요 행동의 배경과 강조색",
  primaryForeground: "primary 위의 글자와 아이콘",
  secondary: "보조 행동의 배경",
  secondaryForeground: "보조 행동과 필터의 글자",
  muted: "연한 블록·빈 화면·Skeleton 배경",
  mutedForeground: "보조 설명·placeholder·quiet 버튼",
  accent: "메뉴에서 강조된 항목의 배경",
  accentForeground: "강조된 메뉴 항목의 글자",
  destructive: "삭제·오류·위험 행동",
  destructiveForeground: "destructive 위의 글자와 아이콘",
  border: "outline 버튼·배지·메뉴의 경계",
  input:
    "Select 등의 입력 경계를 위한 역할색. Input은 투명 경계를 기본으로 사용해요.",
  ring: "키보드 포커스 표시",
  surfacePressed: "눌리거나 비활성화된 표면",
  field: "입력과 Textarea의 기본 배경",
  separator: "내용과 목록 사이의 구분선",
  avatar1: "첫 번째 아바타의 배경",
  avatar2: "두 번째 아바타의 배경",
  avatar3: "세 번째 아바타의 배경",
  avatar4: "네 번째 아바타의 배경",
  avatarForeground: "사진 없는 아바타의 첫 글자",
};

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
                    <code>
                      {typeof defaultTheme[key] === "string"
                        ? defaultTheme[key]
                        : key === "typography"
                          ? "역할별 값은 아래 전체 객체에서 확인해요."
                          : `${colorTokenNames.length}개 색상 token`}
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

export function ThemeColorTable() {
  return (
    <ThemeProvider>
      <div className="docs-theme-reference">
        <div className="docs-reference-scroll">
          <table>
            <caption>defaultTheme 색상 token</caption>
            <thead>
              <tr>
                <th scope="col">Token</th>
                <th scope="col">역할</th>
                <th scope="col">CSS 변수</th>
                <th scope="col">light</th>
                <th scope="col">dark</th>
              </tr>
            </thead>
            <tbody>
              {colorTokenNames.map((token) => (
                <tr key={token}>
                  <th scope="row">
                    <code>{token}</code>
                  </th>
                  <td>{descriptions[token]}</td>
                  <td>
                    <code>{`--ds-${token.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}`}</code>
                  </td>
                  {(["light", "dark"] as const).map((mode) => (
                    <td key={mode} data-mode={mode}>
                      <span
                        className="docs-reference-swatch"
                        style={{ backgroundColor: defaultTheme[mode][token] }}
                        aria-hidden="true"
                      />
                      <code>{defaultTheme[mode][token]}</code>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </ThemeProvider>
  );
}
