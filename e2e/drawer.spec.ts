import { expect, test } from "@playwright/test";
import type { Locator, Page } from "@playwright/test";

async function openSearch(page: Page, args = "") {
  await page.goto(
    `/iframe.html?id=layout-drawer--search&viewMode=story${args ? `&args=${args}` : ""}`,
  );
  await page.getByRole("button", { name: "프로젝트 선택 열기" }).click();
  const drawer = page.getByRole("dialog", {
    name: "프로젝트 선택",
    exact: true,
  });
  await expect(drawer).toBeVisible();
  await expect(drawer).toHaveCSS("transform", "none");
  return drawer;
}

async function expectFooterAtBottom(drawer: Locator) {
  const gap = await drawer.evaluate((node) => {
    const footer = node.querySelector(".ds-dialog-footer")!;
    return (
      node.getBoundingClientRect().bottom -
      footer.getBoundingClientRect().bottom
    );
  });
  expect(Math.abs(gap)).toBeLessThanOrEqual(1);
}

test("Drawer는 검색창·footer를 고정하고 본문만 스크롤한다", async ({
  page,
}) => {
  const drawer = await openSearch(page);
  const search = drawer.getByRole("searchbox", { name: "프로젝트 검색" });
  const header = await search.boundingBox();
  const body = drawer.locator(".ds-dialog-body");
  const height = (await drawer.boundingBox())!.height;
  await body.evaluate((node) => node.scrollTo(0, node.scrollHeight));
  await expect
    .poll(() => body.evaluate((node) => node.scrollTop))
    .toBeGreaterThan(0);
  expect((await search.boundingBox())!.y).toBeCloseTo(header!.y, 0);
  await expect(
    drawer.getByRole("button", { name: "프로젝트 30", exact: true }),
  ).toBeInViewport();
  await expectFooterAtBottom(drawer);

  await search.fill("프로젝트 02");
  await expect(
    drawer.getByRole("button", { name: /^프로젝트 \d+$/ }),
  ).toHaveCount(1);
  expect((await drawer.boundingBox())!.height).toBeCloseTo(height, 0);
  await expectFooterAtBottom(drawer);
  await search.fill("없는 프로젝트");
  await expect(drawer.getByRole("status")).toHaveText("검색 결과가 없어요.");
  expect((await drawer.boundingBox())!.height).toBeCloseTo(height, 0);
  await expectFooterAtBottom(drawer);

  await search.fill("프로젝트 02");
  await drawer
    .getByRole("button", { name: "프로젝트 02", exact: true })
    .click();
  await drawer.getByRole("button", { name: "선택 완료" }).click();
  await expect(drawer).toHaveCount(0);
  await expect(page.getByRole("status")).toHaveText(
    "선택한 프로젝트: 프로젝트 02",
  );
  await expect(
    page.getByRole("button", { name: "프로젝트 선택 열기" }),
  ).toBeFocused();
});

for (const [size, ratio] of [
  ["auto", 0.85],
  ["half", 0.5],
  ["tall", 0.85],
  ["full", 1],
] as const) {
  test(`Drawer size=${size}는 하단에서만 높이를 바꾼다`, async ({ page }) => {
    const drawer = await openSearch(page, `size:${size}`);
    const viewport = page.viewportSize()!;
    const box = (await drawer.boundingBox())!;
    expect(box.height).toBeCloseTo(
      viewport.height * (viewport.width < 1024 ? ratio : 1),
      0,
    );
    expect(box.y + box.height).toBeCloseTo(viewport.height, 0);
    await expectFooterAtBottom(drawer);
    if (size === "full" || viewport.width >= 1024) {
      await expect(drawer).toHaveCSS("border-top-left-radius", "0px");
    }
  });
}

test("auto 높이는 짧은 내용에 맞춰 줄어든다", async ({ page }) => {
  const drawer = await openSearch(page, "size:auto");
  const height = (await drawer.boundingBox())!.height;
  await drawer
    .getByRole("searchbox", { name: "프로젝트 검색" })
    .fill("프로젝트 02");
  if (page.viewportSize()!.width < 1024) {
    await expect
      .poll(async () => (await drawer.boundingBox())!.height)
      .toBeLessThan(height);
  } else {
    expect((await drawer.boundingBox())!.height).toBeCloseTo(height, 0);
  }
  await expectFooterAtBottom(drawer);
});

test("left·right는 size와 관계없이 화면 높이를 채운다", async ({ page }) => {
  for (const side of ["left", "right"]) {
    const drawer = await openSearch(page, `side:${side};size:half`);
    const box = (await drawer.boundingBox())!;
    expect(box.height).toBeCloseTo(page.viewportSize()!.height, 0);
    expect(box.y).toBeCloseTo(0, 0);
    await expectFooterAtBottom(drawer);
  }
});

test("반응형 Drawer는 화면 폭이 바뀌면 높이를 다시 맞춘다", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const drawer = await openSearch(page, "size:half");
  expect((await drawer.boundingBox())!.height).toBeCloseTo(422, 0);
  await page.setViewportSize({ width: 1024, height: 844 });
  await expect
    .poll(async () => (await drawer.boundingBox())!.height)
    .toBeCloseTo(844, 0);
  await expectFooterAtBottom(drawer);
  await page.setViewportSize({ width: 390, height: 844 });
  await expect
    .poll(async () => (await drawer.boundingBox())!.height)
    .toBeCloseTo(422, 0);
  await expectFooterAtBottom(drawer);
});

test("높이 옵션은 visualViewport가 줄어도 header·footer와 목록 한 줄을 경계 안에 둔다", async ({
  page,
}) => {
  for (const size of ["half", "tall", "full"]) {
    const drawer = await openSearch(page, `size:${size}`);
    await page.evaluate(() => {
      const viewport = window.visualViewport!;
      Object.defineProperty(viewport, "height", {
        configurable: true,
        value: 360,
      });
      Object.defineProperty(viewport, "offsetTop", {
        configurable: true,
        value: 44,
      });
      viewport.dispatchEvent(new Event("resize"));
    });
    await expect
      .poll(() =>
        drawer.evaluate(
          (node) => node.parentElement!.getBoundingClientRect().height,
        ),
      )
      .toBeCloseTo(360, 0);
    const search = (await drawer
      .getByRole("searchbox", { name: "프로젝트 검색" })
      .boundingBox())!;
    const footer = (await drawer
      .getByRole("button", { name: "선택 완료" })
      .boundingBox())!;
    expect(search.y).toBeGreaterThanOrEqual(44);
    expect(footer.y + footer.height).toBeLessThanOrEqual(404);
    expect(
      await drawer.locator(".ds-dialog-body").evaluate((node) => {
        const style = getComputedStyle(node);
        return (
          node.clientHeight -
          parseFloat(style.paddingTop) -
          parseFloat(style.paddingBottom)
        );
      }),
    ).toBeGreaterThanOrEqual(44);
    await expectFooterAtBottom(drawer);
  }
});
