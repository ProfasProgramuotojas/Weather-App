export type CityType = {
  id: number;
  name: string;
  ascii: string;
  country: string;
  lat: number;
  lon: number;
  population: number;
  timezone: string;
};

export type URLCityType = Pick<CityType, "name" | "country" | "lat" | "lon">;
