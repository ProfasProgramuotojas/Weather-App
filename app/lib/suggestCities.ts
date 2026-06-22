"use server";

import { CityType } from "@/app/types/CityType";
import citiesData from "../data/cities.json";
import { LIMIT } from "@/app/constants/autocomplete";
import { serverLog } from "@/app/lib/serverLog";

const cities = citiesData as CityType[];

//top  5 most populated cities in the world
const topCities = cities.slice(0, LIMIT);

const suggestCities = async (query: string): Promise<CityType[]> => {
  try {
    if (!query) return topCities;

    const queryLength = query.length;
    const searchQuery = query.toLowerCase();

    //cities who start with query
    const autocompletedCities = cities.filter(
      (c) =>
        c.name.toLowerCase().slice(0, queryLength) === searchQuery ||
        c.ascii.toLowerCase().slice(0, queryLength) === searchQuery,
    );

    if (autocompletedCities.length >= LIMIT) return autocompletedCities;

    //cities who include query in them
    const searchedCities = cities
      .filter(
        (c) =>
          c.name.toLowerCase().includes(searchQuery) ||
          c.ascii.toLowerCase().includes(searchQuery),
      )
      .filter((c) => !autocompletedCities.some((ac) => ac.id === c.id));

    //returning all searches prioritizing autocomplete
    return [...autocompletedCities, ...searchedCities];
  } catch (e) {
    return serverLog(e, "suggestCities.ts");
  }
};

export default suggestCities;
