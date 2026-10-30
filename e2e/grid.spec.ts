import { expect, test } from "@playwright/test";
import type { Page } from "@playwright/test";

async function open(page: Page, id: string) {
  await page.goto(`/iframe.html?id=${id}&viewMode=story`);
  await expect(
    page.locator("#storybook-root [data-ds-theme]").first(),
  ).toBeVisible();
}
const columnCount = (page: Page, selector: string) =>
  page
    .locator(selector)
    .first()
    .evaluate(
      (node) => getComputedStyle(node).gridTemplateColumns.split(" ").length,
    );

test("Grid는 넓은 화면에서 지정한 열, 768px 미만에서 한 열로 쌓인다", async ({
  page,
}) => {
  await open(page, "layout-grid--form-fields");
  const width = page.viewportSize()?.width ?? 0;
  const grid = page.locator('[data-slot="grid"]').first();
  await expect(grid).toHaveAttribute("data-columns", "2");
  expect(await columnCount(page, '[data-slot="grid"]')).toBe(
    width >= 768 ? 2 : 1,
  );
  const cells = grid.locator(':scope > [data-slot="field"]');
  await expect(cells).toHaveCount(4);
  const first = await cells.nth(0).boundingBox();
  const second = await cells.nth(1).boundingBox();
  expect(first && second).toBeTruthy();
  if (width >= 768) {
    expect(Math.round(first!.y)).toBe(Math.round(second!.y));
    expect(Math.round(first!.width)).toBe(Math.round(second!.width));
  } else {
    expect(second!.y).toBeGreaterThan(first!.y + first!.height - 1);
    expect(Math.round(first!.width)).toBe(Math.round(second!.width));
  }
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
});

test("Grid의 열 수 선택지는 자식 수와 무관하게 같은 폭을 유지한다", async ({
  page,
}) => {
  await open(page, "layout-grid--columns");
  const width = page.viewportSize()?.width ?? 0;
  for (const columns of [1, 2, 3, 4]) {
    const selector = `[data-slot="grid"][data-columns="${columns}"]`;
    expect(await columnCount(page, selector)).toBe(width >= 768 ? columns : 1);
  }
  const auto = page.locator('[data-slot="grid"][data-columns="auto"]');
  const autoColumns = await columnCount(
    page,
    '[data-slot="grid"][data-columns="auto"]',
  );
  expect(autoColumns).toBeGreaterThanOrEqual(1);
  const boxes = await auto
    .locator(":scope > *")
    .evaluateAll((nodes) =>
      nodes.map((node) => Math.round(node.getBoundingClientRect().width)),
    );
  expect(new Set(boxes).size).toBe(1);
});
