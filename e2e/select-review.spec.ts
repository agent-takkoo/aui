import { expect, test } from "@playwright/test";
import type { Page } from "@playwright/test";
import { chooseSelectOption, selectPopup } from "./select-helpers";

async function open(page: Page, id: string) {
  await page.goto(`/iframe.html?id=${id}&viewMode=story`);
  await expect(
    page.locator("#storybook-root [data-ds-theme]").first(),
  ).toBeVisible();
}

test("빈 필수 Select가 여러 개여도 제출 시 첫 번째 Drawer 하나만 열린다", async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name === "desktop-chromium",
    "모바일 Drawer 표시 방식에서 검사한다.",
  );
  await open(page, "testing-select--required-many");
  await page.getByRole("button", { name: "제출", exact: true }).click();
  await expect(page.getByRole("dialog")).toHaveCount(1);
  await expect(page.getByRole("dialog", { name: "언어" })).toBeVisible();
  await chooseSelectOption(page, "Alpha");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(page.getByRole("combobox", { name: "언어" })).toHaveText(
    /Alpha/,
  );
  await page.getByRole("button", { name: "제출", exact: true }).click();
  await expect(page.getByRole("dialog")).toHaveCount(1);
  await expect(page.getByRole("dialog", { name: "지역" })).toBeVisible();
  await chooseSelectOption(page, "Beta");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await page.getByRole("button", { name: "제출", exact: true }).click();
  await expect(page.getByRole("dialog", { name: "권한" })).toBeVisible();
  await chooseSelectOption(page, "Alpha");
  await page.getByRole("button", { name: "제출", exact: true }).click();
  await expect(page.getByRole("status")).toHaveText(
    JSON.stringify({ "field-0": "a", "field-1": "b", "field-2": "a" }),
  );
});

test("부모가 다시 렌더링되는 폼에서도 reset이 표시값과 제출값을 함께 되돌린다", async ({
  page,
}) => {
  await open(page, "testing-select--reset-with-parent");
  const select = page.getByRole("combobox", { name: "글자" });
  await select.click();
  await expect(selectPopup(page)).toBeVisible();
  await chooseSelectOption(page, "Beta");
  await expect(select).toHaveText(/Beta/);
  await expect(page.getByText("부모 상태: b · reset 0회")).toBeVisible();
  await page.getByRole("button", { name: "초기화", exact: true }).click();
  await expect(page.getByText("부모 상태: a · reset 1회")).toBeVisible();
  await expect(select).toHaveText(/Alpha/);
  await page.getByRole("button", { name: "제출", exact: true }).click();
  await expect(page.getByRole("status")).toHaveText(
    JSON.stringify({ letter: "a" }),
  );
});
