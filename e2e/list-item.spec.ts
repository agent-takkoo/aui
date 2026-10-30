import { expect, test } from "@playwright/test";
import type { Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

async function open(page: Page, story: string, query = "") {
  await page.goto(
    `/iframe.html?id=components-list-item--${story}&viewMode=story${query}`,
  );
  await expect(page.locator('[data-slot="list-item"]').first()).toBeVisible();
}

test("ListItem은 키보드로 Drawer를 열고 닫은 뒤 포커스를 돌려준다", async ({
  page,
}) => {
  await open(page, "default");
  const row = page.getByRole("button", { name: /알림 설정/ });
  await expect(row).toHaveAttribute("type", "button");
  await row.focus();
  await page.keyboard.press("Enter");
  const drawer = page.getByRole("dialog", { name: "알림 설정" });
  await expect(drawer).toBeVisible();
  await drawer.getByRole("switch", { name: "알림 받기" }).click();
  await drawer.getByRole("button", { name: "닫기", exact: true }).click();
  await expect(drawer).toHaveCount(0);
  await expect(row).toBeFocused();
  await expect(page.getByRole("status")).toHaveText("알림을 받지 않아요.");
  await page.keyboard.press("Space");
  await expect(drawer).toBeVisible();
  await expect(
    drawer.getByRole("switch", { name: "알림 받기" }),
  ).not.toBeChecked();
});

test("sm은 설명도 한 줄에 놓고 lg는 제목 아래에 설명을 둔다", async ({
  page,
}) => {
  await open(page, "sizes");
  const small = page.locator('[data-slot="list-item"][data-size="sm"]');
  const large = page.locator('[data-slot="list-item"][data-size="lg"]');
  expect((await small.boundingBox())!.height).toBeCloseTo(44, 0);
  expect((await large.boundingBox())!.height).toBeGreaterThanOrEqual(64);
  for (const [row, singleLine] of [
    [small, true],
    [large, false],
  ] as const) {
    const title = (await row.locator("strong").boundingBox())!;
    const description = (await row
      .locator(".ds-list-item-copy > span")
      .boundingBox())!;
    if (singleLine) expect(description.y).toBeLessThan(title.y + title.height);
    else expect(description.y).toBeGreaterThanOrEqual(title.y + title.height);
  }
  await small.click();
  await expect(page.getByRole("status")).toHaveText("실행한 행: 좁은형");
  await large.click();
  await expect(page.getByRole("status")).toHaveText("실행한 행: 큰형");
});

test("좁은 화면의 긴 sm 문구는 한 줄을 유지하고 lg는 줄바꿈한다", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 844 });
  await open(
    page,
    "sizes",
    `&args=title:${"LongTitle".repeat(30)};description:${"Description".repeat(20)}`,
  );
  const small = page.locator('[data-size="sm"][data-slot="list-item"]');
  const large = page.locator('[data-size="lg"][data-slot="list-item"]');
  expect((await small.boundingBox())!.height).toBeCloseTo(44, 0);
  expect((await large.boundingBox())!.height).toBeGreaterThan(64);
  expect(
    await small
      .locator("strong")
      .evaluate((node) => node.scrollWidth > node.clientWidth),
  ).toBe(true);
  expect(
    (await small.locator(".ds-list-item-copy > span").boundingBox())!.width,
  ).toBeGreaterThan(0);
  expect(
    await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    ),
  ).toBeLessThanOrEqual(1);
  await open(page, "list");
  const badgeRow = page.getByRole("button", { name: /검토할 문서/ });
  const rowBox = (await badgeRow.boundingBox())!;
  const badgeBox = (await badgeRow
    .getByText("3개", { exact: true })
    .boundingBox())!;
  expect(badgeBox.x + badgeBox.width).toBeLessThanOrEqual(
    rowBox.x + rowBox.width,
  );
  const disabled = page.getByRole("button", {
    name: /현재 사용할 수 없는 항목/,
  });
  await expect(disabled).toBeDisabled();
  await disabled.evaluate((node) => (node as HTMLButtonElement).click());
  await expect(page.getByRole("status")).toHaveText("항목을 눌러 보세요.");
});

test("ListItem은 두 Theme의 라이트·다크와 접근성을 유지한다", async ({
  page,
}) => {
  for (const brand of ["default", "cream"])
    for (const mode of ["light", "dark"]) {
      await open(
        page,
        "list",
        `&globals=brand:${brand};mode:${mode};a11y.manual:!true`,
      );
      const row = page.getByRole("button", { name: /문서 검색/ });
      expect(await row.evaluate((node) => getComputedStyle(node).color)).toBe(
        await page
          .locator("#storybook-root .ds-root")
          .first()
          .evaluate((node) => getComputedStyle(node).color),
      );
      await row.focus();
      await expect(row).toHaveCSS("outline-style", "solid");
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
