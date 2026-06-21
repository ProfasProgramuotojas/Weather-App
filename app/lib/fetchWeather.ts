"use server";

import { CityType } from "@/app/types/CityType";
import { fetchWeatherApi } from "openmeteo";
import { API_URL, WEATHER_VARIABLES } from "@/app/constants/weather";
import { CurrentWeatherType } from "@/app/types/WeatherType";

const fetchWeather = async (
  lat: number,
  lon: number,
): Promise<CurrentWeatherType> => {
  const params = {
    latitude: lat,
    longitude: lon,
    current: WEATHER_VARIABLES,
  };

  const response = (await fetchWeatherApi(API_URL, params))[0];
  const current = response.current()!;
  const utcOffsetSeconds = response.utcOffsetSeconds();

  const currentWeather = {
    time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
  } as Record<string, unknown>;

  for (const i in WEATHER_VARIABLES) {
    const index = Number(i);
    const key = WEATHER_VARIABLES[index];
    currentWeather[key] = current.variables(index)!.value();
  }

  return currentWeather as CurrentWeatherType;
};

export default fetchWeather;
