"use server";

import { CityType } from "@/app/types/CityType";
import citiesData from "../data/cities.json";
import { LIMIT } from "@/app/constants/autocomplete";

const cities = citiesData as CityType[];

//top  5 most populated cities in the world
// const topCities = cities.slice(0, LIMIT);

const suggestCities = async (query: string): Promise<CityType[]> => {
  if (!query) return [];

  //cities who start with query
  const autocompletedCities = cities.filter(
    (c) =>
      c.name.slice(0, query.length) === query ||
      c.ascii.slice(0, query.length) === query,
  );

  if (autocompletedCities.length >= LIMIT)
    return autocompletedCities.slice(0, LIMIT);

  //cities who include query in them
  const searchedCities = cities
    .filter((c) => c.name.includes(query) || c.ascii.includes(query))
    .filter((c) => !autocompletedCities.some((ac) => ac.id === c.id));

  return [...autocompletedCities, ...searchedCities].slice(0, LIMIT);
};

export default suggestCities;
