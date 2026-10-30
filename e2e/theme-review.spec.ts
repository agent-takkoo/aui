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

test("primary 버튼의 hover 배경도 글자와 4.5:1을 유지한다", async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== "desktop-chromium",
    "hover는 마우스 환경에서 검사한다.",
  );
  for (const brand of ["default", "cream"])
    for (const mode of ["light", "dark"]) {
      await page.goto(
        `/iframe.html?id=global-theme--state-colors&viewMode=story&globals=brand:${brand};mode:${mode};a11y.manual:!true`,
      );
      const button = page.getByRole("button", { name: "변경 사항 저장" });
      const ratio = () =>
        button.evaluate((node) => {
          const style = getComputedStyle(node);
          const context = document.createElement("canvas").getContext("2d")!;
          const luminance = (color: string) => {
            context.fillStyle = color;
            context.fillRect(0, 0, 1, 1);
            return [...context.getImageData(0, 0, 1, 1).data]
              .slice(0, 3)
              .map((value) => {
                const v = value / 255;
                return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
              })
              .reduce(
                (sum, value, index) =>
                  sum + value * [0.2126, 0.7152, 0.0722][index]!,
                0,
              );
          };
          const x = luminance(style.backgroundColor);
          const y = luminance(style.color);
          return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
        });
      const rest = await ratio();
      expect(rest, `${brand} ${mode} rest`).toBeGreaterThanOrEqual(4.5);
      await button.hover();
      await expect
        .poll(ratio, { message: `${brand} ${mode} hover` })
        .toBeGreaterThanOrEqual(4.5);
      await page.mouse.move(0, 0);
    }
});
