import { expect, test } from "@playwright/test";

test("스크롤바는 Theme 색으로 hover·drag를 구분하고 스크롤된다", async ({
  page,
  isMobile,
}) => {
  await page.goto("/iframe.html?id=layout-scrollarea--default&viewMode=story");
  const viewport = page.getByRole("region", { name: "문서 목록" });
  await expect(viewport).toBeVisible();
  const scrollbar = page.locator('.ds-scrollbar[data-orientation="vertical"]');
  await expect(scrollbar).toBeVisible();
  await expect(scrollbar).toHaveCSS("width", "6px");
  await expect(scrollbar).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  const thumb = scrollbar.locator(".ds-scroll-thumb");
  const idle = await thumb.evaluate(
    (node) => getComputedStyle(node).backgroundColor,
  );
  if (!isMobile) {
    await scrollbar.hover();
    await expect(thumb).not.toHaveCSS("background-color", idle);
    const hover = await thumb.evaluate(
      (node) => getComputedStyle(node).backgroundColor,
    );
    const box = (await thumb.boundingBox())!;
    await page.mouse.move(box.x + box.width / 2, box.y + 8);
    await page.mouse.down();
    await expect(thumb).not.toHaveCSS("background-color", hover);
    await page.mouse.move(box.x + box.width / 2, box.y + 90);
    await page.mouse.up();
    await expect
      .poll(() => viewport.evaluate((node) => node.scrollTop))
      .toBeGreaterThan(0);
  } else {
    await viewport.evaluate((node) => node.scrollTo(0, 180));
    await expect
      .poll(() => viewport.evaluate((node) => node.scrollTop))
      .toBeGreaterThan(0);
  }
});

test("토스트 세 개가 투명 목록 안에 작게 쌓이고 액션·닫기는 44px을 유지한다", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const mode of ["light", "dark"]) {
    await page.goto(
      `/iframe.html?id=component-toast--default&viewMode=story&args=duration:30000&globals=mode:${mode}`,
    );
    const trigger = page.getByRole("button", {
      name: "알림 보기",
      exact: true,
    });
    for (let i = 0; i < 3; i++) await trigger.click();
    const toasts = page.locator(".ds-toast");
    await expect(toasts).toHaveCount(3);
    await expect(page.locator(".ds-toast-viewport")).toHaveCSS(
      "background-color",
      "rgba(0, 0, 0, 0)",
    );
    for (const toast of await toasts.all()) {
      const box = (await toast.boundingBox())!;
      expect(box.height).toBeLessThan(100);
      expect(box.x).toBeGreaterThanOrEqual(0);
      expect(box.x + box.width).toBeLessThanOrEqual(390);
      for (const button of await toast.getByRole("button").all()) {
        const target = (await button.boundingBox())!;
        // 이동 중 좌표 계산에서 생기는 부동소수점 오차를 제외한다.
        expect(Math.round(target.width * 1000) / 1000).toBeGreaterThanOrEqual(
          44,
        );
        expect(Math.round(target.height * 1000) / 1000).toBeGreaterThanOrEqual(
          44,
        );
      }
      const title = (await toast.locator(".ds-toast-title").boundingBox())!;
      const action = (await toast
        .getByRole("button", { name: "되돌리기", exact: true })
        .boundingBox())!;
      expect(action.x).toBeGreaterThan(title.x + title.width);
    }
    await page
      .getByRole("button", { name: "알림 닫기", exact: true })
      .first()
      .click();
    await expect(toasts).toHaveCount(2);
  }
});

test("긴 토스트와 움직임 줄이기에서도 닫힘·자동 닫힘이 유지된다", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 320, height: 640 });
  await page.goto(
    "/iframe.html?id=component-toast--messages-and-stack&viewMode=story&args=duration:1000",
  );
  await page.getByRole("button", { name: "긴 알림", exact: true }).click();
  const toast = page.locator(".ds-toast");
  await expect(toast).toBeVisible();
  expect(
    await toast.evaluate((node) => node.scrollWidth <= node.clientWidth),
  ).toBe(true);
  await expect(toast).toHaveCount(0, { timeout: 5000 });
});
