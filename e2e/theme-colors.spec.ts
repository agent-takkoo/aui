import { expect, test } from "@playwright/test";
import type { Page } from "@playwright/test";

async function open(page: Page, mode: string) {
  await page.goto(
    `/iframe.html?id=testing-themecolors--surfaces&viewMode=story&args=mode:${mode}&globals=a11y.manual:!true`,
  );
  const root = page.locator('[data-ds-theme="surface-test"]');
  await expect(root).toBeVisible();
  return root.evaluate((node) => {
    const sample = document.createElement("span");
    sample.style.setProperty("transition", "none", "important");
    node.append(sample);
    const read = (token: string) => {
      sample.style.color = `var(--ds-${token})`;
      return getComputedStyle(sample).color;
    };
    const result = {
      brand9: read("brand-9"),
      brand12: read("brand-12"),
      brandA3: read("brand-a3"),
      primary: read("primary"),
      primaryForeground: read("primary-foreground"),
      selected: read("selected"),
      selectedForeground: read("selected-foreground"),
      card: read("card"),
      cardBorder: read("card-border"),
      popover: read("popover"),
      foreground: read("foreground"),
      secondary: read("secondary"),
    };
    sample.remove();
    return result;
  });
}

test("custom 브랜드 스케일은 주요 실행·선택·배지에 단계별로 연결된다", async ({
  page,
}) => {
  for (const mode of ["light", "dark"]) {
    const colors = await open(page, mode);
    const primary = page.getByRole("button", { name: "주요 실행" });
    await expect(primary).toHaveCSS("background-color", colors.primary);
    await expect(primary).toHaveCSS("color", colors.primaryForeground);
    await expect(page.getByText("브랜드 배지", { exact: true })).toHaveCSS(
      "background-color",
      colors.brandA3,
    );
    await expect(page.getByText("브랜드 배지", { exact: true })).toHaveCSS(
      "color",
      colors.brand12,
    );
    await expect(page.getByText("채운 배지", { exact: true })).toHaveCSS(
      "background-color",
      colors.primary,
    );
    await expect(
      page.getByRole("button", { name: "선택된 서식", pressed: true }),
    ).toHaveCSS("background-color", colors.selected);
    await expect(page.getByRole("link", { name: "일반 설정" })).toHaveCSS(
      "color",
      colors.selectedForeground,
    );
    await expect(page.getByRole("tab", { name: "첫 화면" })).toHaveCSS(
      "border-bottom-color",
      colors.primary,
    );
    await expect(page.getByRole("button", { name: "보조 실행" })).toHaveCSS(
      "background-color",
      colors.secondary,
    );
    await expect(page.getByText("카드 본문", { exact: true })).toHaveCSS(
      "color",
      colors.foreground,
    );
  }
});

test("Portal과 중첩 theme의 팝업은 각자의 스케일을 유지한다", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const mode of ["light", "dark"]) {
    const colors = await open(page, mode);
    await page.getByRole("button", { name: "모달 열기", exact: true }).click();
    const dialog = page.getByRole("dialog", { name: "모달", exact: true });
    await expect(dialog).toHaveCSS("background-color", colors.card);
    await expect(dialog.getByRole("button", { name: "모달 실행" })).toHaveCSS(
      "background-color",
      colors.primary,
    );
    await page.keyboard.press("Escape");
    await expect(dialog).toHaveCount(0);
    await page.getByRole("button", { name: "팝오버 열기" }).click();
    const popover = page.getByRole("dialog", { name: "팝오버", exact: true });
    await expect(popover).toHaveCSS("background-color", colors.popover);
    await page.keyboard.press("Escape");
    await expect(popover).toHaveCount(0);

    const nested = page.locator('[data-ds-theme="surface-nested"]');
    await expect(nested).toHaveAttribute(
      "data-ds-mode",
      mode === "light" ? "dark" : "light",
    );
    const nestedPrimary = await nested.evaluate((node) => {
      const sample = document.createElement("span");
      sample.style.setProperty("transition", "none", "important");
      node.append(sample);
      sample.style.color = "var(--ds-primary)";
      const value = getComputedStyle(sample).color;
      sample.remove();
      return value;
    });
    expect(nestedPrimary).not.toBe(colors.primary);
    await expect(nested.getByRole("button", { name: "중첩 실행" })).toHaveCSS(
      "background-color",
      nestedPrimary,
    );
    await nested.getByRole("button", { name: "중첩 모달 열기" }).click();
    const nestedDialog = page.getByRole("dialog", { name: "중첩 모달" });
    await expect(
      nestedDialog.getByRole("button", { name: "중첩 모달 실행" }),
    ).toHaveCSS("background-color", nestedPrimary);
    await expect(nestedDialog).toHaveCSS("border-top-left-radius", "0px");
    await page.keyboard.press("Escape");
    await expect(nestedDialog).toHaveCount(0);
  }
});
