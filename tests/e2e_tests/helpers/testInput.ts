import { expect, type Page } from "@playwright/test";

export const testInput = async (page: Page, query: string) => {
  const input = page.getByRole("searchbox");
  await expect(input).toBeVisible();
  await input.fill(query);
};
