import { expect, test } from "@playwright/test";
import type { Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
async function open(page: Page, id: string, suffix = "") {
  await page.goto(`/iframe.html?id=${id}&viewMode=story${suffix}`);
  await expect(
    page.locator("#storybook-root [data-ds-theme]").first(),
  ).toBeVisible();
}

test("새 폼 컨트롤은 키보드·Field 연결·제출·native reset을 지원한다", async ({
  page,
}) => {
  await open(page, "testing-controls--form");
  const terms = page.getByRole("checkbox", { name: "약관 동의" });
  const partial = page.getByRole("checkbox", { name: "일부 선택" });
  await expect(partial).toHaveAttribute("aria-checked", "mixed");
  await terms.focus();
  await page.keyboard.press("Space");
  await partial.focus();
  await page.keyboard.press("Space");
  const notifications = page.getByRole("switch", { name: "알림 받기" });
  await notifications.focus();
  await page.keyboard.press("Space");
  await expect(notifications).not.toBeChecked();
  await expect(
    page.getByRole("radiogroup", { name: "알림 빈도" }),
  ).toHaveAccessibleDescription("받을 주기를 골라 주세요.");
  await page.getByRole("radio", { name: "매일", exact: true }).focus();
  await page.keyboard.press("ArrowDown", { delay: 60 });
  await expect(page.getByRole("radio", { name: "매주" })).toBeChecked();
  await expect(page.getByRole("radio", { name: "매시간" })).toBeDisabled();
  const select = page.getByRole("combobox", { name: "표시 언어" });
  await expect(select).toHaveAccessibleDescription(
    "메뉴에 사용할 언어예요. 설정을 확인해 주세요.",
  );
  await expect(select).toHaveAttribute("aria-invalid", "true");
  await select.focus();
  await page.keyboard.press("Space");
  await expect(page.getByRole("listbox")).toBeVisible();
  expect(
    await page
      .getByRole("listbox")
      .evaluate((node) =>
        node.closest("[data-ds-theme]")?.getAttribute("data-ds-theme"),
      ),
  ).toBe("cream");
  await page.getByRole("option", { name: "English", exact: true }).click();
  await expect(select).toBeFocused();
  const slider = page.getByRole("slider", { name: "음량" });
  await expect(slider).toHaveAccessibleDescription("0부터 100까지 조절해요.");
  await slider.focus();
  await page.keyboard.press("End");
  await expect(slider).toHaveAttribute("aria-valuenow", "100");
  await page.keyboard.press("Home");
  await page.keyboard.press("ArrowRight");
  await expect(slider).toHaveAttribute("aria-valuenow", "10");
  await page.getByRole("button", { name: "제출", exact: true }).click();
  await expect(page.getByRole("status")).toHaveText(
    JSON.stringify({
      terms: "on",
      partial: "on",
      frequency: "weekly",
      language: "en",
      volume: "10",
    }),
  );
  await page.getByRole("button", { name: "초기화", exact: true }).click();
  await expect(terms).not.toBeChecked();
  await expect(partial).toHaveAttribute("aria-checked", "mixed");
  await expect(notifications).toBeChecked();
  await expect(
    page.getByRole("radio", { name: "매일", exact: true }),
  ).toBeChecked();
  await expect(select).toHaveText(/한국어/);
  await expect(slider).toHaveAttribute("aria-valuenow", "30");
});

test("Toggle과 ToggleGroup은 눌림 상태와 방향키 탐색을 제공한다", async ({
  page,
}) => {
  await open(page, "base-toggle--default");
  const toggle = page.getByRole("button", { name: "굵게", exact: true });
  await toggle.focus();
  await page.keyboard.press("Space");
  await expect(toggle).toHaveAttribute("aria-pressed", "true");
  await open(page, "base-togglegroup--default");
  await page.getByRole("button", { name: "굵게", exact: true }).focus();
  await page.keyboard.press("ArrowRight", { delay: 60 });
  await expect(page.getByRole("button", { name: "기울임" })).toBeFocused();
  await page.keyboard.press("Space");
  await expect(
    page.getByRole("button", { name: "굵게", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByRole("button", { name: "기울임" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
});

test("Slider의 사용자 범위와 disabled 상태를 지킨다", async ({ page }) => {
  await open(
    page,
    "base-slider--default",
    "&args=min:20;max:80;defaultValue:0",
  );
  const slider = page.getByRole("slider", { name: "음량" });
  await expect(slider).toHaveAttribute("aria-valuenow", "20");
  await slider.focus();
  await page.keyboard.press("End");
  await expect(slider).toHaveAttribute("aria-valuenow", "80");
  await page.keyboard.press("ArrowRight");
  await expect(slider).toHaveAttribute("aria-valuenow", "80");
  await open(page, "base-slider--default", "&args=disabled:!true");
  await expect(page.getByRole("slider")).toHaveAttribute("data-disabled", "");
  await page.getByRole("slider").dispatchEvent("keydown", { key: "End" });
  await expect(page.getByRole("slider")).toHaveAttribute("aria-valuenow", "40");
});

test("Tabs는 패널을 연결하고 비활성 탭을 건너뛴다", async ({ page }) => {
  await open(page, "component-tabs--default");
  await page.getByRole("tab", { name: "일반" }).focus();
  await page.keyboard.press("ArrowRight", { delay: 60 });
  await expect(page.getByRole("tab", { name: "보안" })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  await expect(page.getByRole("tabpanel", { name: "보안" })).toHaveText(
    "보안 설정 내용이에요.",
  );
  await page.keyboard.press("ArrowRight", { delay: 60 });
  await expect(page.getByRole("tab", { name: "일반" })).toBeFocused();
  await expect(page.getByRole("tab", { name: "결제" })).toBeDisabled();
});

test("Accordion과 Collapsible은 키보드로 열고 닫고 reduced motion을 따른다", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const [id, label, content] of [
    [
      "component-accordion--default",
      "알림은 어떻게 설정하나요?",
      "설정 화면에서 알림을 선택해 주세요.",
    ],
    [
      "component-collapsible--default",
      "상세 설정",
      "추가 설정을 이 영역에 배치해요.",
    ],
  ]) {
    await open(page, id);
    const trigger = page.getByRole("button", { name: label, exact: true });
    await trigger.focus();
    await page.keyboard.press("Enter");
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await expect(page.getByText(content, { exact: true })).toBeVisible();
    const controlId = await trigger.getAttribute("aria-controls");
    expect(
      await page
        .locator(`[id="${controlId}"]`)
        .evaluate((node) =>
          parseFloat(getComputedStyle(node).animationDuration),
        ),
    ).toBeLessThan(0.001);
    await page.keyboard.press("Enter");
    await expect(page.getByText(content, { exact: true })).not.toBeVisible();
  }
});

test("Tooltip은 포커스로 나타나고 Escape로 닫히며 Theme 안에 열린다", async ({
  page,
}) => {
  await open(
    page,
    "component-tooltip--default",
    "&globals=brand:cream;mode:dark",
  );
  const trigger = page.getByRole("button", { name: "도움말", exact: true });
  await trigger.focus();
  const tooltip = page.getByRole("tooltip");
  await expect(tooltip).toHaveText("도움말에서 자세한 설명을 확인해요.");
  await expect(trigger).toHaveAccessibleDescription(
    "도움말에서 자세한 설명을 확인해요.",
  );
  expect(
    await tooltip.evaluate((node) =>
      node.closest("[data-ds-theme]")?.getAttribute("data-ds-theme"),
    ),
  ).toBe("cream");
  await page.keyboard.press("Escape");
  await expect(tooltip).toHaveCount(0);
  await expect(trigger).toBeFocused();
});

test("Toast는 범위 안에서 동작하고 개수 제한·액션·닫기·자동 닫힘을 지원한다", async ({
  page,
}) => {
  await open(page, "component-toast--default", "&globals=brand:cream");
  const trigger = page.getByRole("button", { name: "알림 보기", exact: true });
  for (let count = 0; count < 4; count++) await trigger.click();
  await expect(page.locator(".ds-toast")).toHaveCount(3);
  expect(
    await page
      .locator(".ds-toast")
      .first()
      .evaluate((node) =>
        node.closest("[data-ds-theme]")?.getAttribute("data-ds-theme"),
      ),
  ).toBe("cream");
  const box = await page.locator(".ds-toast-viewport").boundingBox();
  expect(box!.x).toBeGreaterThanOrEqual(0);
  expect(box!.x + box!.width).toBeLessThanOrEqual(page.viewportSize()!.width);
  await page
    .getByRole("button", { name: "되돌리기", exact: true })
    .first()
    .click();
  await expect(
    page.getByRole("status").filter({ hasText: "변경을 되돌렸어요." }),
  ).toHaveText("변경을 되돌렸어요.");
  await expect(page.locator(".ds-toast")).toHaveCount(2);
  await page
    .getByRole("button", { name: "알림 닫기", exact: true })
    .first()
    .click();
  await expect(page.locator(".ds-toast")).toHaveCount(1);
  await open(page, "component-toast--default", "&args=duration:1000");
  await page.getByRole("button", { name: "알림 보기", exact: true }).click();
  await expect(page.locator(".ds-toast")).toHaveCount(1);
  await expect(page.locator(".ds-toast")).toHaveCount(0, { timeout: 5000 });
});

test("Breadcrumb·Pagination·Progress는 현재 위치와 진행 상태를 알린다", async ({
  page,
}) => {
  await open(page, "component-breadcrumb--default");
  await expect(
    page
      .getByRole("navigation", { name: "현재 위치" })
      .locator('[aria-current="page"]'),
  ).toHaveText("사용 안내");
  await expect(
    page.getByRole("link", { name: "문서", exact: true }),
  ).toHaveAttribute("href", "#documents");
  await open(page, "component-pagination--default");
  await expect(
    page.getByRole("button", { name: "이전 페이지", exact: true }),
  ).toBeDisabled();
  await page.getByRole("button", { name: "다음 페이지", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "2페이지", exact: true }),
  ).toHaveAttribute("aria-current", "page");
  await page.getByRole("button", { name: "12페이지", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "다음 페이지", exact: true }),
  ).toBeDisabled();
  await open(page, "base-progress--default");
  await expect(
    page.getByRole("progressbar", { name: "업로드 진행률" }),
  ).toHaveAttribute("aria-valuenow", "45");
  await open(page, "base-progress--default", "&args=value:!null");
  await expect(page.getByRole("progressbar")).not.toHaveAttribute(
    "aria-valuenow",
  );
});

test("Table·ScrollArea·AspectRatio는 모바일 경계를 지키고 키보드로 탐색된다", async ({
  page,
}) => {
  await open(page, "component-table--default");
  await expect(page.getByRole("table", { name: "문서 현황" })).toBeVisible();
  await expect(
    page.getByRole("columnheader", { name: "담당자" }),
  ).toBeVisible();
  await expect(
    page.getByRole("rowheader", { name: "사용 안내" }),
  ).toBeVisible();
  await page.setViewportSize({ width: 320, height: 800 });
  const region = page.getByRole("region", { name: "문서 현황" });
  expect(
    await region.evaluate((node) => node.scrollWidth > node.clientWidth),
  ).toBe(true);
  expect(
    await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    ),
  ).toBeLessThanOrEqual(1);
  await open(page, "layout-scrollarea--default");
  const scroll = page.getByRole("region", { name: "문서 목록" });
  await scroll.focus();
  await page.keyboard.press("End");
  await expect
    .poll(() => scroll.evaluate((node) => node.scrollTop))
    .toBeGreaterThan(0);
  await open(page, "layout-aspectratio--default");
  const box = await page.locator('[data-slot="aspect-ratio"]').boundingBox();
  expect(box!.width / box!.height).toBeCloseTo(16 / 9, 1);
});

test("새 폼 컨트롤과 테이블의 기본 접근성을 검사한다", async ({ page }) => {
  for (const id of [
    "testing-controls--form",
    "component-table--default",
    "component-tabs--default",
  ]) {
    await open(page, id, "&globals=a11y.manual:!true");
    expect(
      (
        await new AxeBuilder({ page })
          .include("#storybook-root")
          .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
          .analyze()
      ).violations,
    ).toEqual([]);
  }
});
