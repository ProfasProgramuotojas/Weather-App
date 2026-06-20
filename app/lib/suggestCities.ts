import cities from "../data/cities.json";
import { CityType } from "@/app/types/CityType";

const LIMIT = 5;

const suggestCities = (query: string): CityType[] => {
  const autocompletedCities = cities.filter(
    (c) => c.name.slice(0, query.length) === query,
  );

  const searchedCities = cities
    .filter((c) => c.name.includes(query))
    .filter((c) => !autocompletedCities.some((ac) => ac.name === c.name));

  return [...autocompletedCities, ...searchedCities].slice(0, LIMIT);
};

export default suggestCities;
