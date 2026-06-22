"use server";
import { expect, test } from "vitest";
import suggestCities from "@/app/lib/suggestCities";
import { TEST_LIMIT } from "@/tests/testingConstants";
import { CityType } from "@/app/types/CityType";
import citiesData from "../../app/data/cities.json";

const cities = citiesData as CityType[];
const TEST_BIGGEST_CITIES = cities.splice(0, TEST_LIMIT);

const TEST_SIAULIAI_CITY = {
  id: 594739,
  name: "Šiauliai",
  ascii: "Siauliai",
  lat: 55.93333,
  lon: 23.31667,
  country: "LT",
  population: 99462,
  timezone: "Europe/Vilnius",
};
test("1. Empty Query", async () => {
  const suggested = await suggestCities("");
  expect(suggested).toStrictEqual(TEST_BIGGEST_CITIES);
});

test("2. Invalid Query (no such city)", async () => {
  const suggested = await suggestCities("ImaginaryCity");
  expect(suggested).toStrictEqual([]);
});

test("3. Normal Query", async () => {
  const suggested = await suggestCities("Siauliai");
  expect(suggested).toStrictEqual([TEST_SIAULIAI_CITY]);
});

test("4. Lowercase Query", async () => {
  const suggested = await suggestCities("siauliai");
  expect(suggested).toStrictEqual([TEST_SIAULIAI_CITY]);
});

test("5. Unicode Query", async () => {
  const suggested = await suggestCities("Šiauliai");
  expect(suggested).toStrictEqual([TEST_SIAULIAI_CITY]);
});
