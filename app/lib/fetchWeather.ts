"use server";

import { CityType } from "@/app/types/CityType";
import { fetchWeatherApi } from "openmeteo";
import { WeatherType } from "@/app/types/WeatherType";
import { API_URL, WEATHER_VARIABLES } from "@/app/constants/weather";

const fetchWeather = async (city: CityType): Promise<WeatherType> => {
  const params = {
    latitude: city.lat,
    longitude: city.lon,
    hourly: WEATHER_VARIABLES,
    current: WEATHER_VARIABLES,
  };

  const response = (await fetchWeatherApi(API_URL, params))[0];

  const current = response.current()!;
  const hourly = response.hourly()!;
  const utcOffsetSeconds = response.utcOffsetSeconds();

  const weatherData = {
    current: {
      time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
    } as Record<string, unknown>,
    hourly: {
      time: Array.from(
        {
          length:
            (Number(hourly.timeEnd()) - Number(hourly.time())) /
            hourly.interval(),
        },
        (_, i) =>
          new Date(
            (Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) *
              1000,
          ),
      ),
    } as Record<string, unknown>,
  };

  for (const i in WEATHER_VARIABLES) {
    const index = Number(i);
    const key = WEATHER_VARIABLES[index];
    weatherData.current[key] = current.variables(index)!.value();
    weatherData.hourly[key] = hourly.variables(index)!.valuesArray();
  }
  return weatherData as WeatherType;
};

export default fetchWeather;
