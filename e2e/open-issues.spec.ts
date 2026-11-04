import { expect, test } from "@playwright/test";
import type { Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

async function open(page: Page, id: string, query = "") {
  await page.goto(`/iframe.html?id=${id}&viewMode=story${query}`);
  await expect(
    page.locator("#storybook-root [data-ds-theme]").first(),
  ).toBeVisible();
}

test("즐겨찾기 아이콘은 테두리와 채운 별을 구분한다", async ({ page }) => {
  await open(page, "base-icon--favorites");
  const icons = page.locator("#storybook-root .ds-icon");
  await expect(icons).toHaveCount(2);
  await expect(icons.nth(0)).toHaveAttribute("fill", "none");
  await expect(icons.nth(1)).toHaveAttribute("fill", "currentColor");
  for (const icon of await icons.all()) {
    await expect(icon).toHaveAttribute("aria-hidden", "true");
    expect((await icon.boundingBox())!.width).toBeCloseTo(20, 0);
  }
});

test("AppShell의 사이드바는 실제 헤더 아래에 남고 긴 메뉴만 따로 스크롤한다", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await open(page, "layout-app-shell--long-document");
  const header = page.locator(".ds-app-shell-header");
  const sidebar = page.locator(".ds-app-shell-sidebar");
  await expect(
    page.getByRole("navigation", { name: "문서 보기" }),
  ).toBeVisible();
  await page.evaluate(() => window.scrollTo(0, 600));
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(600);
  const checkPosition = async () => {
    await expect
      .poll(async () => {
        const h = (await header.boundingBox())!;
        const s = (await sidebar.boundingBox())!;
        return Math.abs(s.y - h.y - h.height);
      })
      .toBeLessThan(1);
    const s = (await sidebar.boundingBox())!;
    expect(s.y + s.height).toBeLessThanOrEqual(page.viewportSize()!.height + 1);
  };
  await checkPosition();
  const before = (await header.boundingBox())!.height;
  await page.getByRole("button", { name: "도움말 펼치기" }).click();
  await expect
    .poll(async () => (await header.boundingBox())!.height)
    .toBeGreaterThan(before);
  await checkPosition();
  const windowScroll = await page.evaluate(() => window.scrollY);
  await sidebar.getByRole("link", { name: "문서 40", exact: true }).focus();
  await expect
    .poll(() => sidebar.evaluate((node) => node.scrollTop))
    .toBeGreaterThan(0);
  expect(await page.evaluate(() => window.scrollY)).toBe(windowScroll);
  await page.setViewportSize({ width: 1440, height: 700 });
  await checkPosition();
});

test("AppShell은 헤더가 없어도 고정하며 sidebarSticky=false와 모바일 숨김을 지원한다", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await open(page, "layout-app-shell--without-header");
  await page.evaluate(() => window.scrollTo(0, 600));
  const sidebar = page.locator(".ds-app-shell-sidebar");
  await expect
    .poll(async () => Math.abs((await sidebar.boundingBox())!.y))
    .toBeLessThan(1);
  await open(page, "layout-app-shell--scrolling-sidebar");
  await page.evaluate(() => window.scrollTo(0, 600));
  await expect
    .poll(async () => (await sidebar.boundingBox())!.y)
    .toBeLessThan(0);
  await page.setViewportSize({ width: 767, height: 844 });
  await expect(sidebar).toBeHidden();
  await page.setViewportSize({ width: 1024, height: 844 });
  await expect(sidebar).toBeVisible();
});

test("작은 IconButton의 크기·키보드·이름·로딩·비활성 동작을 유지한다", async ({
  page,
}, testInfo) => {
  await open(page, "base-icon-button--sizes");
  const expected = testInfo.project.name === "desktop-chromium" ? 36 : 44;
  for (const [size, height] of [
    ["sm", expected],
    ["md", 44],
    ["lg", 48],
  ] as const) {
    const box = (await page
      .getByRole("button", { name: `${size} 정책 수정` })
      .boundingBox())!;
    expect(box.height).toBeCloseTo(height, 0);
    expect(box.width).toBeCloseTo(box.height, 0);
  }
  await open(page, "base-icon-button--small");
  const button = page.getByRole("button", { name: "정책 수정" });
  await button.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("status")).toHaveText("실행 1회");
  await page.keyboard.press("Space");
  await expect(page.getByRole("status")).toHaveText("실행 2회");
  await expect(button).toBeFocused();
  await open(page, "base-icon-button--states");
  await expect(
    page.getByRole("button", { name: "사용할 수 없는 수정" }),
  ).toBeDisabled();
  await expect(
    page.getByRole("button", { name: "수정 저장 중" }),
  ).toBeDisabled();
  await expect(
    page.getByRole("button", { name: "수정 저장 중" }),
  ).toHaveAttribute("aria-busy", "true");
});

test("ChipGroup은 이름·설명·방향키·제출·reset과 disabled를 지원한다", async ({
  page,
}) => {
  await open(page, "components-chip-group--default");
  const group = page.getByRole("radiogroup", { name: "표시 범위" });
  await expect(group).toHaveAccessibleDescription(
    "목록에 표시할 문서를 골라요.",
  );
  await expect(
    group.getByRole("radio", { name: "전체 문서", exact: true }),
  ).toBeChecked();
  await group.getByRole("radio", { name: "내가 작성한 문서" }).click();
  await page.getByRole("button", { name: "적용", exact: true }).click();
  await expect(page.getByRole("status")).toHaveText("제출: mine");
  await group.getByRole("radio", { name: "공유받은 문서" }).focus();
  // Radix가 다음 항목으로 포커스를 옮기는 동안 키를 누른 상태로 유지한다.
  await page.keyboard.down("ArrowRight");
  await expect(
    group.getByRole("radio", { name: "최근 수정한 문서" }),
  ).toBeChecked();
  await page.keyboard.up("ArrowRight");
  await page.getByRole("button", { name: "초기화" }).click();
  await expect(
    group.getByRole("radio", { name: "전체 문서", exact: true }),
  ).toBeChecked();
  await page.getByRole("button", { name: "적용", exact: true }).click();
  await expect(page.getByRole("status")).toHaveText("제출: all");
  await open(page, "components-chip-group--disabled");
  for (const radio of await page.getByRole("radio").all())
    await expect(radio).toBeDisabled();
  await page.getByRole("button", { name: "적용", exact: true }).click();
  await expect(page.getByRole("status")).toHaveText("제출: 없음");
});

test("ChipGroup의 required 검증과 초기화가 표시값·폼 값에 함께 반영된다", async ({
  page,
}) => {
  await open(page, "components-chip-group--required");
  await page.getByRole("button", { name: "적용", exact: true }).click();
  await expect(page.getByRole("status")).toHaveText("선택 후 적용해 주세요.");
  expect(
    await page
      .locator("form")
      .evaluate((form) => (form as HTMLFormElement).checkValidity()),
  ).toBe(false);
  await page.getByRole("radio", { name: "내가 작성한 문서" }).click();
  await page.getByRole("button", { name: "적용", exact: true }).click();
  await expect(page.getByRole("status")).toHaveText("제출: mine");
  await page.getByRole("button", { name: "초기화" }).click();
  await expect(page.getByRole("radio", { checked: true })).toHaveCount(0);
  expect(
    await page
      .locator("form")
      .evaluate((form) => (form as HTMLFormElement).checkValidity()),
  ).toBe(false);
});

test("BottomBar는 처음부터 화면 하단에 보이고 높이 변경 후에도 마지막 본문을 가리지 않는다", async ({
  page,
}) => {
  await open(page, "layout-bottom-bar--default");
  const bar = page.locator(".ds-bottom-bar-fixed");
  const space = page.locator('[data-slot="bottom-bar"]');
  const verify = async () => {
    const box = (await bar.boundingBox())!;
    expect(box.y + box.height).toBeCloseTo(page.viewportSize()!.height, 0);
    await expect
      .poll(async () =>
        Math.abs(
          (await space.boundingBox())!.height -
            (await bar.boundingBox())!.height,
        ),
      )
      .toBeLessThan(1);
  };
  await verify();
  const height = (await bar.boundingBox())!.height;
  await page.getByRole("button", { name: "안내 펼치기" }).click();
  await expect
    .poll(async () => (await bar.boundingBox())!.height)
    .toBeGreaterThan(height);
  await verify();
  await page.evaluate(() =>
    window.scrollTo(0, document.documentElement.scrollHeight),
  );
  const last = (await page.getByTestId("last-content").boundingBox())!;
  expect(last.y + last.height).toBeLessThanOrEqual(
    (await bar.boundingBox())!.y,
  );
  await page.getByRole("button", { name: "저장", exact: true }).click();
  await expect(page.getByRole("status")).toHaveText("저장했어요.");
  await page.setViewportSize({ width: 320, height: 640 });
  await verify();
  expect(
    await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    ),
  ).toBeLessThanOrEqual(1);
});

test("문서 배경은 opt-in한 theme·모드를 따르고 기존 html·body 스타일을 복구한다", async ({
  page,
}) => {
  await open(page, "testing-theme--document");
  await page.evaluate(() => {
    document.documentElement.style.setProperty(
      "background-color",
      "rgb(10, 20, 30)",
      "important",
    );
    document.documentElement.style.colorScheme = "light";
    document.body.style.backgroundColor = "rgb(40, 50, 60)";
    document.body.style.colorScheme = "normal";
  });
  const readDocumentStyles = () =>
    page.evaluate(() =>
      [document.documentElement, document.body].map(({ style }) => ({
        background: style.getPropertyValue("background-color"),
        backgroundPriority: style.getPropertyPriority("background-color"),
        scheme: style.getPropertyValue("color-scheme"),
        schemePriority: style.getPropertyPriority("color-scheme"),
      })),
    );
  const original = await readDocumentStyles();
  const root = page
    .getByText("문서 배경을 적용한 영역", { exact: true })
    .locator("..");
  const checkDocument = async () => {
    const color = await root.evaluate(
      (node) => getComputedStyle(node).backgroundColor,
    );
    const mode = await root.getAttribute("data-ds-mode");
    for (const selector of ["html", "body"]) {
      await expect(page.locator(selector)).toHaveCSS("background-color", color);
      await expect(page.locator(selector)).toHaveCSS("color-scheme", mode!);
    }
  };
  await page
    .getByRole("button", { name: "문서 배경 적용", exact: true })
    .click();
  await checkDocument();
  await page.getByRole("button", { name: "문서 모드 전환" }).click();
  await checkDocument();
  await page.getByRole("button", { name: "문서 theme 교체" }).click();
  await checkDocument();
  await page.emulateMedia({ colorScheme: "dark" });
  await page.getByRole("button", { name: "시스템 모드 적용" }).click();
  await checkDocument();
  await page.emulateMedia({ colorScheme: "light" });
  await expect(root).toHaveAttribute("data-ds-mode", "light");
  await checkDocument();
  await page.getByRole("button", { name: "두 번째 배경 적용" }).click();
  await expect(page.locator("html")).toHaveCSS("color-scheme", "dark");
  await page
    .getByRole("button", { name: "문서 배경 해제", exact: true })
    .click();
  await expect(page.locator("html")).toHaveCSS("color-scheme", "dark");
  await page.getByRole("button", { name: "두 번째 배경 해제" }).click();
  expect(await readDocumentStyles()).toEqual(original);
});

for (const brand of ["default", "cream"])
  for (const mode of ["light", "dark"]) {
    test(`추가 컴포넌트의 접근성과 좁은 화면 경계: ${brand} ${mode}`, async ({
      page,
    }, testInfo) => {
      await page.setViewportSize({ width: 320, height: 844 });
      for (const story of [
        "components-chip-group--default",
        "components-stat--grid-layout",
        "base-icon-button--sizes",
        "layout-bottom-bar--default",
      ]) {
        await open(
          page,
          story,
          `&globals=brand:${brand};mode:${mode};a11y.manual:!true`,
        );
        expect(
          await page.evaluate(
            () =>
              document.documentElement.scrollWidth -
              document.documentElement.clientWidth,
          ),
        ).toBeLessThanOrEqual(1);
        const results = await new AxeBuilder({ page })
          .include("#storybook-root")
          .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
          .analyze();
        expect(results.violations, `${story} ${brand} ${mode}`).toEqual([]);
        if (brand === "default" && mode === "light")
          await testInfo.attach(story, {
            body: await page.screenshot(),
            contentType: "image/png",
          });
      }
    });
  }
