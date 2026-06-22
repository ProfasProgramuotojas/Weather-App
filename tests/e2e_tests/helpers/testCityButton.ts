import { expect, type Page } from "@playwright/test";

export const testCityButton = async (page: Page, text: string) => {
  const button = page.getByRole("button", { name: text }).first();
  await expect(button).toBeVisible();
  await button.click();
};
