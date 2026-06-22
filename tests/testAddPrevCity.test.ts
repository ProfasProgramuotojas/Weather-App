import { expect, test } from "vitest";
import { addPrevCity } from "@/app/components/autocomplete/AutocompleteResults";
import { CityType } from "@/app/types/CityType";
import { TEST_EXAMPLE_CITIES, TEST_LIMIT } from "@/tests/testingConstants";

test("1. Empty Prev Cities", async () => {
  const prevCities = [] as CityType[];
  const city = TEST_EXAMPLE_CITIES[0];

  const newCities = addPrevCity(prevCities, city);

  expect(newCities[0]).toBe(city);
});

//full arr => LIMIT = LIMIT
//arr with duplicate => only 1 case and its in the front
test("2. Full Prev City Array", async () => {
  const prevCities = TEST_EXAMPLE_CITIES.slice(0, TEST_LIMIT) as CityType[];
  const city = TEST_EXAMPLE_CITIES[5];

  const newCities = addPrevCity(prevCities, city);

  expect(newCities[0]).toBe(city);
  expect(newCities.length).toBe(TEST_LIMIT);
});

test("3. Prev Cities have new city already", async () => {
  const prevCities = [
    ...TEST_EXAMPLE_CITIES.slice(0, TEST_LIMIT),
  ] as CityType[];
  const city = TEST_EXAMPLE_CITIES[2];

  const newCities = addPrevCity(prevCities, city);

  const cityCount = {} as Record<number, number>;
  newCities.forEach((city) => {
    if (cityCount[city.id]) {
      cityCount[city.id] = cityCount[city.id] + 1;
    } else {
      cityCount[city.id] = 1;
    }
  });

  Object.values(cityCount).forEach((value) => {
    expect(value).toBe(1);
  });
});
