import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import type { Page } from "@playwright/test";
import {
  defaultTheme,
  colorTokenNames,
} from "../packages/design-system/dist/theme/index.js";

async function openStory(page: Page, id: string, globals = "") {
  await page.goto(
    `/iframe.html?id=${id}&viewMode=story${globals ? `&globals=${globals}` : ""}`,
  );
  await expect(
    page.locator("#storybook-root [data-ds-theme]").first(),
  ).toBeVisible();
}

test("전역 화면 선택은 Docs와 Story에서 유지되고 Theme와 Controls도 적용된다", async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== "desktop-chromium",
    "manager toolbar는 데스크탑에서 검사하고 컴포넌트는 세 브라우저에서 검사한다.",
  );
  await page.goto("/?path=/docs/base-input--docs");
  await page
    .getByRole("button", { name: "미리보기 화면 크기 웹 버전" })
    .click();
  await page.getByText("모바일 버전", { exact: true }).click();
  const docs = page.frameLocator("#storybook-preview-iframe");
  const inputPreview = docs.frameLocator("#iframe--base-input--default");
  await expect(
    inputPreview.getByRole("textbox", { name: "이름", exact: true }),
  ).toBeVisible();
  await expect
    .poll(() =>
      docs
        .locator("#iframe--base-input--default")
        .evaluate(
          (frame) => (frame as HTMLIFrameElement).contentWindow!.innerWidth,
        ),
    )
    .toBe(390);
  await docs.locator('textarea[name="placeholder"]').fill("Controls 반영 확인");
  await docs.locator('textarea[name="placeholder"]').press("Tab");
  await expect(
    inputPreview.getByRole("textbox", { name: "이름", exact: true }),
  ).toHaveAttribute("placeholder", "Controls 반영 확인");
  await page.getByText("기본 theme", { exact: true }).click();
  await page.getByText("크림 theme", { exact: true }).click();
  await expect(inputPreview.locator('[data-ds-theme="cream"]')).toBeVisible();
  await page.getByText("라이트", { exact: true }).click();
  await page.getByText("다크", { exact: true }).click();
  await expect(inputPreview.locator('[data-ds-mode="dark"]')).toBeVisible();
  await expect(
    inputPreview.getByRole("textbox", { name: "이름", exact: true }),
  ).toHaveAttribute("placeholder", "Controls 반영 확인");
  await page.locator("#base-button").click();
  await page.locator("#components-button--docs").click();
  const buttonPreview = docs.frameLocator(
    "#iframe--components-button--default",
  );
  await expect(buttonPreview.locator('[data-ds-theme="cream"]')).toBeVisible();
  await expect
    .poll(() =>
      docs
        .locator("#iframe--components-button--default")
        .evaluate(
          (frame) => (frame as HTMLIFrameElement).contentWindow!.innerWidth,
        ),
    )
    .toBe(390);
  await docs.getByRole("combobox").selectOption("secondary");
  await expect(buttonPreview.getByRole("button")).toHaveClass(
    /ds-button-secondary/,
  );
  await page.locator("#components-button--default").click();
  await expect
    .poll(() =>
      page
        .locator("#storybook-preview-iframe")
        .evaluate(
          (frame) => (frame as HTMLIFrameElement).contentWindow!.innerWidth,
        ),
    )
    .toBe(390);
  await page
    .getByRole("button", { name: "미리보기 화면 크기 모바일 버전" })
    .click();
  await page.getByText("웹 버전", { exact: true }).click();
  await expect
    .poll(() =>
      page
        .locator("#storybook-preview-iframe")
        .evaluate(
          (frame) => (frame as HTMLIFrameElement).contentWindow!.innerWidth,
        ),
    )
    .toBeGreaterThan(390);
});

test("typography 주입은 실제 본문에 적용되고 입력 최소 크기는 유지된다", async ({
  page,
}) => {
  await openStory(page, "testing-theme--typography");
  const text = page.getByText("Theme 본문", { exact: true });
  await expect(text).toHaveCSS("font-family", "serif");
  await expect(text).toHaveCSS("font-size", "20px");
  await expect(text).toHaveCSS("line-height", "32px");
  await expect(text).toHaveCSS("font-weight", "450");
  await expect(text).toHaveCSS("letter-spacing", "0.4px");
  await expect(page.getByRole("textbox")).toHaveCSS("font-size", "16px");
});

test("Theme radius는 작은 표면과 Portal까지 적용되고 원형·pill·화면 가장자리는 유지된다", async ({
  page,
}) => {
  for (const radius of [0, 2, 32]) {
    await page.goto(
      `/iframe.html?id=testing-radius--default&viewMode=story&args=radius:${radius}px`,
    );
    const scope = page.locator('[data-ds-theme="radius-test"]');
    await expect(
      scope.getByRole("button", { name: "기본 버튼", exact: true }),
    ).toHaveCSS("border-top-left-radius", `${radius}px`);
    for (const selector of [
      ".ds-input",
      ".ds-card",
      ".ds-callout",
      ".ds-link-row",
      ".ds-panel",
      ".ds-sidebar",
      ".ds-sidebar-link",
      ".ds-segment-indicator",
      ".ds-segment-item",
      ".ds-empty-state",
      ".ds-error-state",
      ".ds-loading-state",
    ]) {
      await expect(scope.locator(selector).first()).toHaveCSS(
        "border-top-left-radius",
        `${radius}px`,
      );
    }
    await expect(scope.locator(".ds-button-sm")).toHaveCSS(
      "border-top-left-radius",
      `${Math.max(0, radius - 2)}px`,
    );
    await expect(scope.locator(".ds-skeleton-line")).toHaveCSS(
      "border-top-left-radius",
      `${Math.max(0, radius - 2)}px`,
    );
    await expect(scope.locator(".ds-badge")).toHaveCSS(
      "border-top-left-radius",
      `${Math.max(0, radius - 4)}px`,
    );
    await expect(scope.locator(".ds-segmented-control")).toHaveCSS(
      "border-top-left-radius",
      `${radius + Math.min(radius, 4)}px`,
    );
    for (const selector of [".ds-avatar", ".ds-skeleton-avatar", ".ds-spinner"])
      await expect(scope.locator(selector)).toHaveCSS(
        "border-top-left-radius",
        "50%",
      );
    await expect(scope.locator(".ds-filter-chip")).toHaveCSS(
      "border-top-left-radius",
      "999px",
    );
    for (const [trigger, selector] of [
      ["모달 열기", ".ds-dialog"],
      ["팝오버 열기", ".ds-popover"],
      ["메뉴 열기", ".ds-dropdown-menu"],
    ]) {
      await scope.getByRole("button", { name: trigger, exact: true }).click();
      await expect(scope.locator(selector)).toHaveCSS(
        "border-top-left-radius",
        `${radius}px`,
      );
      if (selector === ".ds-dropdown-menu")
        await expect(scope.locator(".ds-dropdown-item")).toHaveCSS(
          "border-top-left-radius",
          `${Math.max(0, radius - 4)}px`,
        );
      await page.keyboard.press("Escape");
      await expect(scope.locator(selector)).toHaveCount(0);
    }
    await scope
      .getByRole("button", { name: "Drawer 열기", exact: true })
      .click();
    const drawer = scope.getByRole("dialog", { name: "Drawer", exact: true });
    await expect(drawer).toHaveCSS("border-bottom-left-radius", "0px");
    await expect(drawer).toHaveCSS(
      "border-top-left-radius",
      page.viewportSize()!.width >= 1024 ? "0px" : `${radius}px`,
    );
  }
});

test("Panel은 이름 있는 영역이고 Sidebar는 현재 위치를 알리는 링크다", async ({
  page,
}) => {
  await openStory(page, "layout-panel--default");
  const panelTrigger = page.getByRole("button", { name: "패널 열기" });
  await panelTrigger.click();
  const panel = page.getByRole("dialog", { name: "패널", exact: true });
  await expect(panel).toHaveCSS("transform", "none");
  const panelBox = await panel.boundingBox();
  expect(panelBox!.x + panelBox!.width).toBeCloseTo(
    page.viewportSize()!.width,
    0,
  );
  await expect(page.getByRole("region", { name: "작업 정보" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(panel).toHaveCount(0);
  await expect(panelTrigger).toBeFocused();
  await openStory(page, "layout-sidebar--default");
  const sidebarTrigger = page.getByRole("button", { name: "사이드바 열기" });
  await sidebarTrigger.click();
  const sidebar = page.getByRole("dialog", { name: "사이드바", exact: true });
  await expect(sidebar).toHaveCSS("transform", "none");
  expect((await sidebar.boundingBox())!.x).toBeCloseTo(0, 0);
  const nav = page.getByRole("navigation", { name: "설정" });
  await expect(nav.getByRole("link", { name: "일반" })).toHaveAttribute(
    "aria-current",
    "page",
  );
  await nav.getByRole("link", { name: "구성원" }).focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#members$/);
  await sidebar.getByRole("button", { name: "닫기", exact: true }).click();
  await expect(sidebar).toHaveCount(0);
  await expect(sidebarTrigger).toBeFocused();
});

test("버튼의 키보드 실행과 비활성·로딩 상태", async ({ page }) => {
  await openStory(page, "testing-button--interaction");
  const button = page.getByRole("button", { name: "실행", exact: true });
  await button.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("status")).toHaveText("실행 횟수: 1");
  await expect(
    page.getByRole("button", { name: "비활성 실행", exact: true }),
  ).toBeDisabled();
  const pending = page.getByRole("button", {
    name: "진행 중 실행",
    exact: true,
  });
  await expect(pending).toBeDisabled();
  await expect(pending).toHaveAttribute("aria-busy", "true");
  await pending.dispatchEvent("click");
  await expect(page.getByRole("status")).toHaveText("실행 횟수: 1");
});

test("Drawer·Panel·Sidebar는 들어온 방향으로 닫힌 뒤 포커스를 돌려준다", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  const examples = [
    {
      id: "layout-drawer--default",
      trigger: "시트 열기",
      animation:
        page.viewportSize()!.width >= 1024 ? "ds-side-out" : "ds-drawer-out",
    },
    {
      id: "layout-panel--default",
      trigger: "패널 열기",
      animation: "ds-side-out",
    },
    {
      id: "layout-sidebar--default",
      trigger: "사이드바 열기",
      animation: "ds-side-left-out",
    },
  ];
  for (const example of examples) {
    await openStory(page, example.id);
    const trigger = page.getByRole("button", {
      name: example.trigger,
      exact: true,
    });
    await trigger.click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toHaveCSS("transform", "none");
    // 짧은 퇴장 구간을 순차 polling하지 않고 실제 animationstart를 기록한다.
    await page.evaluate(() => {
      const names: string[] = [];
      document.addEventListener("animationstart", (event) => {
        if (
          event.target instanceof HTMLElement &&
          event.target.getAttribute("data-state") === "closed"
        ) {
          names.push(event.animationName);
          document.documentElement.setAttribute(
            "data-closed-animations",
            names.join(" "),
          );
        }
      });
    });
    if (example.id === "layout-panel--default")
      await page.keyboard.press("Escape");
    else
      await dialog.getByRole("button", { name: "닫기", exact: true }).click();
    await expect(page.locator("html")).toHaveAttribute(
      "data-closed-animations",
      new RegExp(example.animation),
    );
    await expect(page.locator("html")).toHaveAttribute(
      "data-closed-animations",
      /ds-fade-out/,
    );
    await expect(dialog).toHaveCount(0);
    await expect(trigger).toBeFocused();
  }
});

test("JavaScript로 전달한 임의 스타일은 DOM에 전달하지 않는다", async ({
  page,
}) => {
  await openStory(page, "testing-button--runtime-boundary");
  const button = page.getByRole("button", { name: "보호된 버튼" });
  await expect(button).not.toHaveAttribute("style");
  await expect(button).not.toHaveAttribute("color");
  await expect(button).not.toHaveClass(/rogue-class/);
  await expect(button).toHaveCSS("background-color", "rgb(36, 107, 214)");
  await button.click();
  await expect(page.getByRole("status")).toHaveText("실행 횟수: 1");
});

test("폼의 라벨·검증·포커스·저장과 중복 실행 방지", async ({ page }) => {
  await openStory(page, "components-form--validation");
  const name = page.getByRole("textbox", { name: "이름", exact: true });
  await page.getByRole("button", { name: "저장", exact: true }).click();
  await expect(name).toBeFocused();
  await expect(name).toHaveAttribute("aria-invalid", "true");
  await expect(name).toHaveAccessibleDescription(/이름을 두 글자 이상/);
  await name.fill("새로운 공간");
  await name.press("Enter");
  await expect(page.getByRole("button", { name: "저장 중…" })).toBeDisabled();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("status")).toHaveText(
    "새로운 공간 저장 완료 · 1회",
  );
  await expect(name).toHaveValue("새로운 공간");
  await expect(page.getByRole("alert")).toHaveCount(0);
});

test("세그먼트는 방향키로 선택하고 필터는 즉시 해제한다", async ({ page }) => {
  await openStory(page, "components-selection--default");
  await page.getByRole("radio", { name: "전체", exact: true }).focus();
  await page.keyboard.press("ArrowRight", { delay: 60 });
  await expect(
    page.getByRole("radio", { name: "진행 중", exact: true }),
  ).toBeChecked();
  await expect(page.getByRole("status")).toHaveText("선택: 진행 중");
  await page.getByRole("button", { name: "내 항목 조건 해제" }).click();
  await expect(
    page.getByRole("button", { name: "내 항목 조건 해제" }),
  ).toHaveCount(0);
  await page.getByRole("button", { name: "이번 달 조건 해제" }).click();
  await expect(page.getByText("모든 조건을 해제했어요")).toBeVisible();
});

test("팝업은 포커스를 가두고 Escape 후 열었던 버튼으로 돌아온다", async ({
  page,
}) => {
  await openStory(page, "component-modal--default");
  const trigger = page.getByRole("button", { name: "팝업 열기" });
  await trigger.focus();
  await trigger.press("Enter");
  const dialog = page.getByRole("dialog", { name: "이름 바꾸기" });
  await expect(dialog).toBeVisible();
  await expect(dialog).toHaveAccessibleDescription(
    "변경한 이름은 함께 쓰는 사람에게도 보여요.",
  );
  for (let index = 0; index < 6; index += 1) {
    await page.keyboard.press("Tab");
    expect(
      await dialog.evaluate((element) =>
        element.contains(document.activeElement),
      ),
    ).toBe(true);
  }
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(trigger).toBeFocused();
});

test("삭제 확인은 취소에 먼저 포커스를 두고 처리 중 닫히지 않는다", async ({
  page,
}) => {
  await openStory(page, "component-confirmdialog--default");
  const trigger = page.getByRole("button", { name: "항목 삭제", exact: true });
  await trigger.click();
  const dialog = page.getByRole("alertdialog");
  await expect(dialog.getByRole("button", { name: "취소" })).toBeFocused();
  await dialog.getByRole("button", { name: "취소" }).click();
  await expect(dialog).toHaveCount(0);
  await expect(trigger).toBeFocused();
  await trigger.click();
  await dialog.getByRole("button", { name: "삭제", exact: true }).click();
  await expect(
    dialog.getByRole("button", { name: "삭제", exact: true }),
  ).toBeDisabled();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("status")).toHaveText("항목을 삭제했어요.");
  await expect(dialog).toHaveCount(0);
});

test("메뉴는 키보드로 탐색하고 선택 후 포커스를 돌려준다", async ({ page }) => {
  await openStory(page, "component-dropdownmenu--default");
  const trigger = page.getByRole("button", { name: "메뉴 열기" });
  await trigger.focus();
  await trigger.press("ArrowDown");
  await expect(
    page.getByRole("menuitem", { name: "이름 바꾸기" }),
  ).toBeFocused();
  await page.keyboard.press("ArrowDown");
  await expect(page.getByRole("menuitem", { name: "복제" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("status")).toHaveText("선택: 복제");
  await expect(trigger).toBeFocused();
});

test("확인창의 두 버튼은 좁은 화면과 긴 문구에서도 내부 폭을 나눈다", async ({
  page,
}) => {
  for (const width of [320, 390, 745, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await openStory(page, "component-confirmdialog--default");
    await page.getByRole("button", { name: "항목 삭제", exact: true }).click();
    const dialog = page.getByRole("alertdialog");
    await expect(dialog).toHaveCSS("transform", "none");
    for (const longLabels of [false, true]) {
      if (longLabels) {
        // 문구 길이만 바꿔 layout을 검사한다. 버튼의 스타일과 동작은 그대로 둔다.
        await dialog.getByRole("button").evaluateAll((buttons) => {
          buttons[0].textContent = "삭제하지 않고 이전 화면으로 돌아가기";
          buttons[1].textContent = "선택한 모든 항목을 영구적으로 삭제하기";
        });
      }
      const bounds = await dialog.evaluate((element) => {
        const actions = element.querySelector(".ds-confirm-actions")!;
        const rect = actions.getBoundingClientRect();
        return {
          left: rect.left,
          right: rect.right,
          buttons: [...actions.querySelectorAll("button")].map((button) => {
            const box = button.getBoundingClientRect();
            return {
              left: box.left,
              right: box.right,
              width: box.width,
              height: box.height,
              overflow: button.scrollWidth - button.clientWidth,
            };
          }),
        };
      });
      const [cancel, confirm] = bounds.buttons;
      expect(cancel.left).toBeGreaterThanOrEqual(bounds.left - 1);
      expect(confirm.right).toBeLessThanOrEqual(bounds.right + 1);
      expect(cancel.width).toBeCloseTo(confirm.width, 0);
      expect(confirm.left - cancel.right).toBeGreaterThanOrEqual(7);
      for (const button of bounds.buttons) {
        expect(button.height).toBeGreaterThanOrEqual(44);
        expect(button.overflow).toBeLessThanOrEqual(1);
      }
    }
  }
});

test("중첩 theme의 팝업은 자기 범위의 색을 유지한다", async ({ page }) => {
  await openStory(page, "testing-theme--nested");
  await page.getByRole("button", { name: "안쪽 팝업 열기" }).click();
  const dialog = page.getByRole("dialog", { name: "안쪽 theme의 팝업" });
  expect(
    await dialog.evaluate((element) =>
      element.closest("[data-ds-theme]")?.getAttribute("data-ds-theme"),
    ),
  ).toBe("cream");
  expect(
    await dialog.evaluate((element) =>
      element.closest("[data-ds-mode]")?.getAttribute("data-ds-mode"),
    ),
  ).toBe("light");
  await expect(dialog.getByRole("button", { name: "확인" })).toHaveCSS(
    "background-color",
    "rgb(154, 0, 2)",
  );
});

test("시트는 모바일에서 아래에, 데스크탑에서 오른쪽에 열린다", async ({
  page,
}, testInfo) => {
  await openStory(page, "layout-drawer--default");
  await page.getByRole("button", { name: "시트 열기" }).click();
  const dialog = page.getByRole("dialog", { name: "보기 설정" });
  await expect(dialog).toBeVisible();
  await expect(dialog).toHaveCSS("transform", "none");
  const box = await dialog.boundingBox();
  expect(box).not.toBeNull();
  const viewport = page.viewportSize()!;
  if (viewport.width >= 1024) {
    expect(box!.width).toBeCloseTo(448, 0);
    expect(box!.x + box!.width).toBeCloseTo(viewport.width, 0);
  } else {
    expect(box!.width).toBeLessThanOrEqual(viewport.width);
    expect(box!.y + box!.height).toBeCloseTo(viewport.height, 0);
  }
  await expect(
    dialog.getByRole("button", { name: "설정 적용" }),
  ).toBeInViewport();
  await testInfo.attach("sheet", {
    body: await page.screenshot(),
    contentType: "image/png",
  });
});

test("입력 방식에 맞는 버튼·입력 크기와 터치 실행", async ({ page }) => {
  const touch = await page.evaluate(
    () => window.matchMedia("(pointer: coarse)").matches,
  );
  await openStory(page, "testing-button--sizes");
  const box = await page
    .getByRole("button", { name: "작게", exact: true })
    .boundingBox();
  expect(box!.height).toBeGreaterThanOrEqual(touch ? 44 : 36);
  await openStory(page, "base-input--default");
  await expect(
    page.getByRole("textbox", { name: "이름", exact: true }),
  ).toHaveCSS("font-size", "16px");
  if (touch) {
    await openStory(page, "testing-button--interaction");
    await page.getByRole("button", { name: "실행", exact: true }).tap();
    await expect(page.getByRole("status")).toHaveText("실행 횟수: 1");
  }
});

test("시스템 모드가 실행 중 바뀌어도 반영된다", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await openStory(page, "testing-theme--system");
  const scope = page.locator('[data-ds-theme="default"]').last();
  await expect(scope).toHaveAttribute("data-ds-mode", "dark");
  await page.emulateMedia({ colorScheme: "light" });
  await expect(scope).toHaveAttribute("data-ds-mode", "light");
});

test("모바일부터 넓은 화면까지 가로로 넘치지 않는다", async ({
  page,
}, testInfo) => {
  await openStory(page, "testing-catalog--default");
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await expect(async () => {
      const overflow = await page.evaluate(
        () =>
          document.documentElement.scrollWidth -
          document.documentElement.clientWidth,
      );
      expect(overflow).toBeLessThanOrEqual(1);
    }).toPass();
    if (width === 390 || width === 1440)
      await testInfo.attach(`overview-${width}`, {
        body: await page.screenshot({ fullPage: true }),
        contentType: "image/png",
      });
  }
});

test("움직임 줄이기 설정을 지킨다", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await openStory(page, "components-selection--default");
  const duration = await page
    .locator(".ds-segment-indicator")
    .evaluate((element) =>
      parseFloat(getComputedStyle(element).transitionDuration),
    );
  expect(duration).toBeLessThan(0.001);
});

test("오류 화면에서 다시 시도할 수 있다", async ({ page }) => {
  await openStory(page, "components-feedback--error");
  await page.getByRole("button", { name: "다시 시도" }).click();
  await expect(page.getByRole("status")).toHaveText("다시 불러왔어요.");
});

for (const brand of ["default", "cream"]) {
  for (const mode of ["light", "dark"]) {
    test(`${brand} ${mode}의 기본 화면과 팝업 접근성`, async ({ page }) => {
      await openStory(
        page,
        "testing-catalog--default",
        `brand:${brand};mode:${mode};a11y.manual:!true`,
      );
      expect(
        (
          await new AxeBuilder({ page })
            .include("#storybook-root")
            .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
            .analyze()
        ).violations,
      ).toEqual([]);
      await openStory(
        page,
        "component-modal--default",
        `brand:${brand};mode:${mode};a11y.manual:!true`,
      );
      await page.getByRole("button", { name: "팝업 열기" }).click();
      await expect(page.getByRole("dialog")).toHaveCSS("transform", "none");
      expect(
        (
          await new AxeBuilder({ page })
            .include('[role="dialog"]')
            .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
            .analyze()
        ).violations,
      ).toEqual([]);
    });
  }
}

test("Theme 문서는 실제 defaultTheme의 모든 값을 보여준다", async ({
  page,
}) => {
  await page.goto("/iframe.html?id=global-theme--docs&viewMode=docs");
  await expect(
    page.getByRole("heading", { name: /Theme에 들어가는 값$/ }),
  ).toBeVisible();
  const fields = page.getByRole("table", { name: "Theme 객체의 필드" });
  for (const field of [
    "name",
    "light",
    "dark",
    "radius",
    "fontFamily",
    "typography",
  ]) {
    await expect(
      fields.getByRole("rowheader", { name: field, exact: true }),
    ).toBeVisible();
  }
  const colors = page.getByRole("table", { name: "defaultTheme 색상 token" });
  await expect(colors.getByRole("row")).toHaveCount(colorTokenNames.length + 1);
  for (const token of colorTokenNames) {
    const row = colors.getByRole("row").filter({
      has: page.getByRole("rowheader", { name: token, exact: true }),
    });
    await expect(row.locator('[data-mode="light"]')).toHaveText(
      defaultTheme.light[token],
    );
    await expect(row.locator('[data-mode="dark"]')).toHaveText(
      defaultTheme.dark[token],
    );
  }
  await expect(
    page.getByRole("heading", { name: /프로젝트에 주입하기$/ }),
  ).toBeVisible();
  await page.getByText("ThemeProvider 내부 구현 보기", { exact: true }).click();
  await expect(page.locator("details pre")).toBeVisible();
  await expect(page.locator("details pre")).toContainText(
    "useSyncExternalStore",
  );
});

test("모든 Story가 패키지 빌드 결과로 렌더링된다", async ({
  page,
  request,
}) => {
  test.setTimeout(120_000);
  const response = await request.get("/index.json");
  expect((await request.get("/")).ok()).toBe(true);
  const index = (await response.json()) as {
    entries: Record<string, { id: string; type: string }>;
  };
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const story of Object.values(index.entries).filter(
    (entry) => entry.type === "story",
  )) {
    await openStory(page, story.id);
    await expect(
      page
        .locator(
          "#storybook-root [data-slot], #storybook-root .ds-text, #storybook-root .ds-heading, #storybook-root .docs-page",
        )
        .first(),
    ).toBeAttached();
    await expect(page.locator(".sb-errordisplay")).not.toBeVisible();
  }
  expect(errors).toEqual([]);
});
