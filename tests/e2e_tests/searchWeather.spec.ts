import { expect, test } from "@playwright/test";
import { TESTING_URL } from "@/tests/testingConstants";
import { testWeather } from "@/tests/e2e_tests/helpers/testWeather";
import { testInput } from "@/tests/e2e_tests/helpers/testInput";
import { testCityButton } from "@/tests/e2e_tests/helpers/testCityButton";
import citiesData from "../../app/data/cities.json";
import { CityType } from "@/app/types/CityType";

const cities = citiesData as CityType[];

test(`Search Valid City`, async ({ page }) => {
  await page.goto(TESTING_URL);

  const cityIndex = Math.floor(Math.random() * cities.length);
  const cityName = cities[cityIndex].name;
  const cityCountry = cities[cityIndex].country;

  await testInput(page, cityName);
  await testCityButton(page, `${cityName} ${cityCountry}`);
  await testWeather(page, `${cityName} ${cityCountry}`);
});

test(`Search Invalid City`, async ({ page }) => {
  await page.goto(TESTING_URL);

  const cityName = "ImaginaryCity";

  await testInput(page, cityName);

  await expect(page.getByTestId("empty-state")).toBeVisible();
});

test(`Test Previously Searched Cities`, async ({ page }) => {
  await page.goto(TESTING_URL);

  const cityIndex = Math.floor(Math.random() * cities.length);
  const cityName = cities[cityIndex].name;
  const cityCountry = cities[cityIndex].country;

  await testInput(page, cityName);
  await testCityButton(page, `${cityName} ${cityCountry}`);
  //now the button should be visible at the top
  await testCityButton(page, `${cityName} ${cityCountry}`);
  await testWeather(page, `${cityName} ${cityCountry}`);
});

test(`Test Invalid URL`, async ({ page }) => {
  await page.goto(
    `${TESTING_URL}/?lat=181&lon=23.31667&name=Šiauliai&country=LT`,
  );
  await expect(page.getByTestId("empty-state")).toBeVisible();
});
