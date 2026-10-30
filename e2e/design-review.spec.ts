import { expect, test } from "@playwright/test";
import type { Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { chooseSelectOption, selectPopup } from "./select-helpers";

async function open(page: Page, id: string, globals = "") {
  await page.goto(
    `/iframe.html?id=${id}&viewMode=story&globals=a11y.manual:!true;${globals}`,
  );
  await expect(
    page.locator("#storybook-root [data-ds-theme]").first(),
  ).toBeVisible();
}

test("primary 포커스는 테두리 한 줄로 구분되고 비활성 버튼은 Tab에서 건너뛴다", async ({
  page,
}) => {
  await open(page, "components-button--states");
  const active = page
    .getByRole("region", { name: "기본", exact: true })
    .getByRole("button");
  await active.focus();
  const focus = await active.evaluate((node) => {
    const style = getComputedStyle(node);
    return {
      visible: node.matches(":focus-visible"),
      width: parseFloat(style.outlineWidth),
      offset: parseFloat(style.outlineOffset),
      color: style.outlineColor,
    };
  });
  expect(focus.visible).toBe(true);
  expect(focus.width).toBeGreaterThanOrEqual(2);
  expect(focus.offset).toBe(0);
  await expect(active).toHaveCSS("border-color", focus.color);
  expect(focus.color).not.toBe("rgba(0, 0, 0, 0)");
  await expect(
    page.getByRole("region", { name: "로딩", exact: true }).getByRole("button"),
  ).toBeDisabled();
  await expect(
    page
      .getByRole("region", { name: "비활성", exact: true })
      .getByRole("button"),
  ).toBeDisabled();
  await page.keyboard.press("Tab");
  expect(
    await page
      .locator("button:disabled")
      .evaluateAll((nodes) =>
        nodes.some((node) => node === document.activeElement),
      ),
  ).toBe(false);
  await open(page, "components-button--variants");
  for (const button of await page.getByRole("button").all()) {
    await button.focus();
    await expect(button).toHaveCSS("outline-offset", "0px");
    await expect(button).toHaveCSS(
      "border-color",
      await button.evaluate((node) => getComputedStyle(node).outlineColor),
    );
  }
});

test("Input과 Select 크기가 맞고 오류·긴 선택지가 좁은 화면에서도 유지된다", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 844 });
  await open(page, "base-input--sizes");
  const inputHeights = await page
    .getByRole("textbox")
    .evaluateAll((nodes) =>
      nodes.map((node) => node.getBoundingClientRect().height),
    );
  await open(page, "base-select--states");
  const md = page.getByRole("combobox", { name: "기본 언어" });
  const sm = page.getByRole("combobox", { name: "작은 언어 선택" });
  expect((await md.boundingBox())!.height).toBe(inputHeights[0]);
  expect((await sm.boundingBox())!.height).toBe(inputHeights[1]);
  const invalid = page.getByRole("combobox", { name: "필수 언어" });
  await expect(invalid).toHaveAttribute("aria-invalid", "true");
  await expect(invalid).toHaveAccessibleDescription(
    "사용할 언어를 선택해 주세요.",
  );
  expect(
    await invalid.evaluate((node) => getComputedStyle(node).borderColor),
  ).toBe(
    await page
      .getByRole("alert")
      .evaluate((node) => getComputedStyle(node).color),
  );
  expect(
    await invalid.evaluate((node) => getComputedStyle(node).borderColor),
  ).not.toBe(await md.evaluate((node) => getComputedStyle(node).borderColor));
  await page.getByRole("combobox", { name: "공유 범위" }).click();
  const listbox = selectPopup(page);
  await expect(listbox).toBeVisible();
  const bounds = (await listbox.boundingBox())!;
  expect(bounds.x).toBeGreaterThanOrEqual(0);
  expect(bounds.x + bounds.width).toBeLessThanOrEqual(320);
  await chooseSelectOption(page, "나만 보기");
  await expect(page.getByRole("combobox", { name: "공유 범위" })).toHaveText(
    /나만 보기/,
  );
  expect(
    await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    ),
  ).toBeLessThanOrEqual(1);
});

test("기본 Theme 네 조합은 글자·오류·입력 경계·포커스 대비를 유지한다", async ({
  page,
}) => {
  for (const brand of ["default", "cream"])
    for (const mode of ["light", "dark"]) {
      await open(
        page,
        "components-form--preferences",
        `brand:${brand};mode:${mode}`,
      );
      const ratios = await page
        .locator("[data-ds-theme]")
        .first()
        .evaluate((root) => {
          const style = getComputedStyle(root);
          const context = document.createElement("canvas").getContext("2d")!;
          function luminance(token: string) {
            context.fillStyle = style
              .getPropertyValue("--ds-background")
              .trim();
            context.fillRect(0, 0, 1, 1);
            context.fillStyle = style.getPropertyValue(`--ds-${token}`).trim();
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
          }
          const pairs: [string, string, number][] = [
            ["foreground", "background", 4.5],
            ["card-foreground", "card", 4.5],
            ["popover-foreground", "popover", 4.5],
            ["accent-foreground", "accent", 4.5],
            ["muted-foreground", "background", 4.5],
            ["muted-foreground", "field", 4.5],
            ["primary-foreground", "primary", 4.5],
            ["secondary-foreground", "secondary", 4.5],
            ["destructive-foreground", "destructive", 4.5],
            ["destructive-text", "background", 4.5],
            ["destructive-text", "card", 4.5],
            ["selected-foreground", "selected", 4.5],
            ["primary-text", "background", 4.5],
            ["input", "background", 3],
            ["input", "card", 3],
            ["input", "field", 3],
            ["ring", "background", 3],
            ["ring", "card", 3],
            ["ring", "field", 3],
          ];
          return pairs.map(([a, b, minimum]) => {
            const x = luminance(a),
              y = luminance(b);
            return {
              pair: `${a}/${b}`,
              minimum,
              ratio: (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05),
            };
          });
        });
      for (const { pair, minimum, ratio } of ratios)
        expect(ratio, `${brand} ${mode} ${pair}`).toBeGreaterThanOrEqual(
          minimum,
        );
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

test("설정 폼의 저장과 기본값 복원이 선택·동의 값까지 반영된다", async ({
  page,
}) => {
  await open(page, "components-form--preferences");
  await page.getByRole("textbox", { name: "공간 이름" }).fill("공유 공간");
  await page.getByRole("combobox", { name: "표시 언어" }).click();
  await chooseSelectOption(page, "English");
  await expect(selectPopup(page)).toHaveCount(0);
  await page.getByRole("radio", { name: "팀에 공개" }).check();
  await page
    .getByRole("checkbox", { name: "활동 요약을 이메일로 받기" })
    .uncheck();
  await page.getByRole("button", { name: "설정 저장" }).click();
  await expect(page.getByRole("status")).toHaveText(
    "공유 공간 · English · 팀에 공개 · 이메일 받지 않기로 저장했어요.",
  );
  await page.getByRole("button", { name: "기본값으로 되돌리기" }).click();
  await page.getByRole("button", { name: "설정 저장" }).click();
  await expect(page.getByRole("status")).toHaveText(
    "작업 공간 · 한국어 · 나만 보기 · 이메일 받기로 저장했어요.",
  );
});

test("긴 Modal은 본문만 스크롤하고 저장·취소와 포커스 복귀가 동작한다", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await open(page, "component-modal--long-content");
  const trigger = page.getByRole("button", { name: "팝업 열기" });
  await trigger.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toHaveCSS("transform", "none");
  const save = dialog.getByRole("button", { name: "변경 사항 저장" });
  const footerBefore = (await save.boundingBox())!;
  expect(footerBefore.y + footerBefore.height).toBeLessThanOrEqual(844);
  const body = dialog.locator(".ds-dialog-body");
  expect(
    await body.evaluate((node) => node.scrollHeight > node.clientHeight),
  ).toBe(true);
  await body.evaluate((node) => {
    node.scrollTop = node.scrollHeight;
  });
  expect((await save.boundingBox())!.y).toBeCloseTo(footerBefore.y, 0);
  await dialog.getByRole("textbox", { name: "새 이름" }).fill("A");
  await save.click();
  await expect(dialog.getByRole("alert")).toHaveText(
    "이름을 두 글자 이상 입력해 주세요.",
  );
  await expect(dialog.getByRole("textbox", { name: "새 이름" })).toBeFocused();
  await dialog.getByRole("textbox", { name: "새 이름" }).fill("새 공간");
  await save.click();
  await expect(dialog).toHaveCount(0);
  await expect(page.getByRole("status")).toHaveText(
    "새 공간 이름으로 저장했어요.",
  );
  await expect(trigger).toBeFocused();
  await trigger.click();
  await dialog
    .getByRole("textbox", { name: "새 이름" })
    .fill("저장하지 않을 이름");
  await dialog.getByRole("button", { name: "취소", exact: true }).click();
  await expect(dialog).toHaveCount(0);
  await trigger.click();
  await expect(dialog.getByRole("textbox", { name: "새 이름" })).toHaveValue(
    "새 공간",
  );
});

test("Drawer에서 적용한 설정을 다시 열어 확인할 수 있다", async ({ page }) => {
  await open(page, "layout-drawer--default");
  const trigger = page.getByRole("button", { name: "시트 열기" });
  await trigger.click();
  await page.getByRole("textbox", { name: "검색어" }).fill("안내");
  await page.getByRole("button", { name: "설정 적용" }).click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(page.getByRole("status")).toHaveText(
    "검색어 “안내”를 적용했어요.",
  );
  await expect(trigger).toBeFocused();
  await trigger.click();
  await expect(page.getByRole("textbox", { name: "검색어" })).toHaveValue(
    "안내",
  );
});

test("공개 상태 예제에서 오류와 비활성을 접근 가능한 이름과 함께 확인한다", async ({
  page,
}) => {
  for (const id of [
    "base-input--states",
    "base-select--states",
    "base-checkbox--states",
    "base-radiogroup--states",
  ]) {
    await open(page, id);
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
