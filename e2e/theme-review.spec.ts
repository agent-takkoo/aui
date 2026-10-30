import { expect, test } from "@playwright/test";
import type { Page } from "@playwright/test";

async function open(page: Page, id: string) {
  await page.goto(`/iframe.html?id=${id}&viewMode=story`);
  await expect(
    page.locator("#storybook-root [data-ds-theme]").first(),
  ).toBeVisible();
}

test("같은 이름으로 설정만 바꾼 theme도 stylesheet가 갱신된다", async ({
  page,
}) => {
  await open(page, "testing-theme--swap");
  const root = page.locator('[data-ds-theme="swap-test"]');
  const readBrand = () =>
    root.evaluate((node) => {
      const sample = document.createElement("span");
      sample.style.setProperty("transition", "none", "important");
      sample.style.color = "var(--ds-primary)";
      node.append(sample);
      const value = getComputedStyle(sample).color;
      sample.remove();
      return { value, key: node.getAttribute("data-ds-theme-key") };
    });
  const button = page.getByRole("button", { name: "브랜드 바꾸기" });
  const indigo = await readBrand();
  await button.click();
  await expect(page.getByRole("status")).toHaveText("현재 브랜드: ruby");
  const ruby = await readBrand();
  expect(ruby.value).not.toBe(indigo.value);
  expect(ruby.key).not.toBe(indigo.key);
  await page.mouse.move(0, 0);
  await expect(button).toHaveCSS("background-color", ruby.value);
  await button.click();
  await expect(page.getByRole("status")).toHaveText("현재 브랜드: indigo");
  expect(await readBrand()).toEqual(indigo);
  await page.mouse.move(0, 0);
  await expect(button).toHaveCSS("background-color", indigo.value);
});

test("scaling 90%에서도 터치 영역은 44px 이상이다", async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name === "desktop-chromium",
    "터치 하한은 pointer: coarse 환경에서 검사한다.",
  );
  await open(page, "testing-theme--dense");
  for (const control of [
    page.getByRole("button", { name: "작은 버튼" }),
    page.getByRole("button", { name: "기본 버튼" }),
    page.getByRole("button", { name: "추가" }),
    page.getByRole("checkbox", { name: "동의" }),
    page.getByRole("switch", { name: "알림" }),
    page.getByRole("textbox", { name: "이름" }),
  ]) {
    const box = (await control.boundingBox())!;
    expect(box.height).toBeGreaterThanOrEqual(44);
    expect(box.width).toBeGreaterThanOrEqual(44);
  }
  expect(
    (await page.getByRole("textbox", { name: "이름" }).boundingBox())!.height,
  ).toBeLessThan(56);
});

test("linkComponent adapter를 거친 링크는 실제 라우터 안에서 목적지로 이동한다", async ({
  page,
}) => {
  await open(page, "testing-theme--router");
  const status = page.getByRole("status");
  await expect(status).toHaveText("현재 경로: /start");
  const go = page.getByRole("link", { name: "도착으로 이동" });
  await expect(go).toHaveAttribute("href", "/destination");
  await go.click();
  await expect(status).toHaveText("현재 경로: /destination");
  await expect(page.getByText("도착 화면", { exact: true })).toBeVisible();
  await page.getByRole("link", { name: /설정/ }).click();
  await expect(status).toHaveText("현재 경로: /settings");
  await page.getByRole("link", { name: "문서", exact: true }).first().click();
  await expect(status).toHaveText("현재 경로: /docs");
  await expect(
    page.getByRole("link", { name: "문서", exact: true }).last(),
  ).toHaveAttribute("aria-current", "page");
  await page.getByRole("link", { name: "시작", exact: true }).click();
  await expect(status).toHaveText("현재 경로: /start");
  await expect(page.getByText("시작 화면", { exact: true })).toBeVisible();
});
