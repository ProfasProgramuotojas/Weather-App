import { expect, type Page } from "@playwright/test";

export const testWeather = async (page: Page, title: string) => {
  await page.getByTestId("weather-title").waitFor();
  await expect(page.getByTestId("weather-title")).toContainText(title);
};
