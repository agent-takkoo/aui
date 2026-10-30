import type { Page } from "@playwright/test";
export function selectPopup(page: Page) {
  return page
    .getByRole("listbox")
    .or(
      page
        .getByRole("dialog")
        .filter({ has: page.locator(".ds-select-choices") }),
    );
}
export async function chooseSelectOption(page: Page, name: string) {
  const choices = page.locator(".ds-select-choices");
  if (await choices.count())
    await choices.getByRole("radio", { name, exact: true }).click();
  else await page.getByRole("option", { name, exact: true }).click();
}
