import { expect, test } from "@playwright/test";

test("AI 문서를 API별로 열고 공통 설정과 함께 복사한다", async ({
  page,
  request,
}) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "clipboard", {
      value: {
        write: async (items: ClipboardItem[]) =>
          sessionStorage.setItem(
            "copied",
            await (await items[0].getType("text/plain")).text(),
          ),
        writeText: async (text: string) =>
          sessionStorage.setItem("copied", text),
      },
    });
  });
  await page.goto("/iframe.html?id=components-button--docs&viewMode=docs");
  await page.getByText("AI 문서", { exact: true }).click();
  await expect(
    page.getByRole("link", { name: "원문", exact: true }),
  ).toHaveAttribute("href", "./llms/Button.md");
  await page.getByRole("button", { name: "복사", exact: true }).click();
  await expect(
    page.getByRole("status").filter({ hasText: "복사했어요." }),
  ).toBeVisible();
  const copied = await page.evaluate(() => sessionStorage.getItem("copied"));
  expect(copied).toContain("@heogeon0/aui/styles.css");
  expect(copied).toContain("# Button");
  expect(copied).toContain("## API");
  const index = await request.get("/llms.txt");
  expect(index.ok()).toBe(true);
  expect(await index.text()).toContain("./llms/Select.md");
  const select = await request.get("/llms/Select.md");
  expect(await select.text()).toContain("768px");
});

test("없는 문서를 복사 성공으로 표시하지 않는다", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "clipboard", {
      value: {
        write: async (items: ClipboardItem[]) => {
          await items[0].getType("text/plain");
        },
        writeText: async () => {},
      },
    });
  });
  await page.route("**/llms/Button.md", (route) =>
    route.fulfill({ status: 404, body: "not found" }),
  );
  await page.goto("/iframe.html?id=components-button--docs&viewMode=docs");
  await page.getByText("AI 문서", { exact: true }).click();
  await page.getByRole("button", { name: "복사", exact: true }).click();
  await expect(
    page.getByRole("status").filter({ hasText: "복사하지 못했어요." }),
  ).toBeVisible();
});
