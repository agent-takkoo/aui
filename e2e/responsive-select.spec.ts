import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { chooseSelectOption, selectPopup } from "./select-helpers";

test("모바일 Select는 아래에서 열리고 선택·닫힘·포커스 복귀를 지원한다", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(
    "/iframe.html?id=base-select--default&viewMode=story&globals=a11y.manual:!true",
  );
  const select = page.getByRole("combobox", { name: "표시 언어" });
  await expect(select).toHaveAttribute("aria-haspopup", "dialog");
  await select.focus();
  await page.keyboard.press("ArrowDown");
  const drawer = page.getByRole("dialog", { name: "표시 언어" });
  await expect(drawer).toBeVisible();
  await expect(drawer.getByRole("radio", { name: "한국어" })).toBeFocused();
  await expect(drawer.getByRole("radio", { name: "日本語" })).toBeDisabled();
  await expect
    .poll(async () => {
      const box = (await drawer.boundingBox())!;
      return Math.abs(box.y + box.height - 844);
    })
    .toBeLessThanOrEqual(1);
  expect(
    (
      await new AxeBuilder({ page })
        .include('[role="dialog"]')
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
  await page.keyboard.press("ArrowDown");
  await expect(drawer.getByRole("radio", { name: "English" })).toBeFocused();
  await page.keyboard.press("Space");
  await expect(drawer).toHaveCount(0);
  await expect(select).toHaveText(/English/);
  await expect(select).toBeFocused();
  await select.click();
  await expect(drawer.getByRole("radio", { name: "English" })).toBeChecked();
  await page.keyboard.press("Escape");
  await expect(drawer).toHaveCount(0);
  await expect(select).toHaveText(/English/);
  await expect(select).toBeFocused();
});

test("화면 크기를 바꾸면 Select를 닫고 값과 원래 기본값을 유지한다", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(
    "/iframe.html?id=components-form--preferences&viewMode=story&globals=a11y.manual:!true",
  );
  const select = page.getByRole("combobox", { name: "표시 언어" });
  await select.click();
  await chooseSelectOption(page, "English");
  await expect(selectPopup(page)).toHaveCount(0);
  await select.click();
  await page.setViewportSize({ width: 1440, height: 1000 });
  await expect(selectPopup(page)).toHaveCount(0);
  await expect(select).toHaveText(/English/);
  await expect(select).toHaveAttribute("data-presentation", "popover");
  await select.click();
  await expect(page.getByRole("listbox")).toBeVisible();
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: "기본값으로 되돌리기" }).click();
  await expect(select).toHaveText(/한국어/);
  await page.setViewportSize({ width: 390, height: 844 });
  await select.click();
  await expect(page.getByRole("radio", { name: "한국어" })).toBeChecked();
});

test("Modal 안의 모바일 Select는 목록만 스크롤하고 바깥 Modal을 유지한다", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 844 });
  await page.goto(
    "/iframe.html?id=base-select--in-dialog&viewMode=story&globals=brand:cream;mode:dark;a11y.manual:!true",
  );
  await page.getByRole("button", { name: "공유 설정 열기" }).click();
  const select = page.getByRole("combobox", { name: "공유할 프로젝트" });
  await select.click();
  const choices = page.getByRole("dialog", { name: "공유할 프로젝트" });
  await expect(choices).toBeVisible();
  await expect(
    choices.getByRole("radio", { name: "프로젝트 3", exact: true }),
  ).toBeDisabled();
  const body = choices.locator(".ds-dialog-body");
  expect(
    await body.evaluate((node) => node.scrollHeight > node.clientHeight),
  ).toBe(true);
  await choices
    .getByRole("radio", { name: "프로젝트 20", exact: true })
    .click();
  await expect(choices).toHaveCount(0);
  await expect(
    page.getByRole("dialog", { name: "공유 설정", exact: true }),
  ).toBeVisible();
  await expect(select).toHaveText(/프로젝트 20/);
  await expect(select).toBeFocused();
  expect(
    await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    ),
  ).toBeLessThanOrEqual(1);
});

test("선택 상태의 색과 Badge 크기를 네 Theme 조합에서 확인한다", async ({
  page,
}) => {
  for (const brand of ["default", "cream"])
    for (const mode of ["light", "dark"]) {
      await page.goto(
        `/iframe.html?id=global-theme--state-colors&viewMode=story&globals=brand:${brand};mode:${mode};a11y.manual:!true`,
      );
      const colors = await page
        .locator("[data-ds-theme]")
        .first()
        .evaluate((root) => {
          const sample = document.createElement("span");
          sample.style.setProperty("transition", "none", "important");
          root.append(sample);
          const read = (token: string) => {
            sample.style.color = `var(--ds-${token})`;
            return getComputedStyle(sample).color;
          };
          const result = {
            selected: read("selected"),
            selectedForeground: read("selected-foreground"),
            primary: read("primary"),
            foreground: read("foreground"),
          };
          sample.remove();
          return result;
        });
      const toggle = page.getByRole("button", { name: "굵게", exact: true });
      await expect(toggle).toHaveCSS("background-color", colors.selected);
      await expect(toggle).toHaveCSS("color", colors.selectedForeground);
      const tab = page.getByRole("tab", { name: "일반", exact: true });
      await expect(tab).toHaveCSS("border-bottom-color", colors.primary);
      await expect(tab).toHaveCSS("color", colors.foreground);
      expect(
        (
          await new AxeBuilder({ page })
            .include("#storybook-root")
            .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
            .analyze()
        ).violations,
      ).toEqual([]);
    }
  await page.goto(
    "/iframe.html?id=base-badge--sizes&viewMode=story&globals=a11y.manual:!true",
  );
  await expect(page.locator('[data-slot="badge"]')).toHaveCount(3);
  const sizes = await page.locator('[data-slot="badge"]').evaluateAll((nodes) =>
    nodes.map((node) => ({
      height: node.getBoundingClientRect().height,
      font: parseFloat(getComputedStyle(node).fontSize),
    })),
  );
  expect(sizes[0]!.height).toBeLessThan(sizes[1]!.height);
  expect(sizes[1]!.height).toBeLessThan(sizes[2]!.height);
  expect(sizes.every((size) => size.font >= 12)).toBe(true);
});
