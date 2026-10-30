import { expect, test } from "@playwright/test";
import type { Locator } from "@playwright/test";

async function focusWithoutMovingBorder(control: Locator) {
  const before = (await control.boundingBox())!;
  await control.focus();
  await expect(control).toBeFocused();
  const after = (await control.boundingBox())!;
  expect(after.width).toBeCloseTo(before.width, 1);
  expect(after.height).toBeCloseTo(before.height, 1);
}

test("입력·선택·탭·펼치기의 포커스는 기존 경계 안에 한 줄로 표시된다", async ({
  page,
}) => {
  for (const brand of ["default", "cream"])
    for (const mode of ["light", "dark"]) {
      await page.goto(
        `/iframe.html?id=testing-focus--controls&viewMode=story&globals=brand:${brand};mode:${mode};a11y.manual:!true`,
      );
      await expect(page.getByRole("textbox", { name: "메모" })).toBeVisible();
      for (const control of [
        page.getByRole("textbox", { name: "이름" }),
        page.getByRole("textbox", { name: "메모" }),
        page.getByRole("combobox", { name: "언어" }),
        page.getByRole("radio", { name: "목록", exact: true }),
        page.getByRole("tab", { name: "일반" }),
        page.getByRole("button", { name: "도움말" }),
      ]) {
        await focusWithoutMovingBorder(control);
        await expect(control).toHaveCSS("outline-style", "solid");
        await expect(control).toHaveCSS("outline-width", "2px");
        await expect(control).toHaveCSS("outline-offset", "-2px");
        await expect(control).toHaveCSS("box-shadow", "none");
      }
      const viewport = page.getByRole("region", { name: "문서 목록" });
      await focusWithoutMovingBorder(viewport);
      await expect(viewport).toHaveCSS("outline-style", "none");
      await expect(page.locator(".ds-scroll-area")).toHaveCSS(
        "outline-offset",
        "-2px",
      );
      await expect(page.locator(".ds-scroll-area")).toHaveCSS(
        "outline-width",
        "2px",
      );
    }
});

test("Checkbox·Radio·Switch·Slider는 클릭 영역 대신 표시 부분에만 포커스가 생기고 오류 색을 유지한다", async ({
  page,
}) => {
  for (const invalid of [false, true]) {
    await page.goto(
      `/iframe.html?id=testing-focus--controls&viewMode=story&args=invalid:${invalid ? "!true" : "!false"}&globals=a11y.manual:!true`,
    );
    await expect(
      page.getByRole("checkbox", { name: "이용 조건" }),
    ).toBeVisible();
    for (const [control, mark] of [
      [page.getByRole("checkbox", { name: "이용 조건" }), ".ds-check-box"],
      [
        page.getByRole("radio", { name: "나만 보기", exact: true }),
        ".ds-radio-circle",
      ],
      [page.getByRole("switch", { name: "알림" }), ".ds-switch-track"],
      [page.getByRole("slider", { name: "음량" }), "::before"],
    ] as const) {
      await focusWithoutMovingBorder(control);
      await expect(control).toHaveCSS("outline-style", "none");
      const outline = await control.evaluate((node, selector) => {
        const style =
          selector === "::before"
            ? getComputedStyle(node, "::before")
            : getComputedStyle(node.querySelector(selector)!);
        const reference = node.closest(".ds-field")!;
        const error = reference.querySelector(".ds-field-error");
        return {
          width: parseFloat(style.outlineWidth),
          offset: parseFloat(style.outlineOffset),
          color: style.outlineColor,
          error: error ? getComputedStyle(error).color : null,
        };
      }, mark);
      expect(outline.width).toBe(2);
      expect(outline.offset).toBe(0);
      if (invalid) expect(outline.color).toBe(outline.error);
    }
    if (invalid)
      for (const control of [
        page.getByRole("textbox", { name: "메모" }),
        page.getByRole("combobox", { name: "언어" }),
      ]) {
        await control.focus();
        const color = await control.evaluate(
          (node) =>
            getComputedStyle(
              node.closest(".ds-field")!.querySelector(".ds-field-error")!,
            ).color,
        );
        await expect(control).toHaveCSS("outline-color", color);
        await expect(control).toHaveCSS("outline-offset", "-2px");
      }
  }
});
