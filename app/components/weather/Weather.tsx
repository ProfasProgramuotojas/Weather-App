import React from "react";
import { CityType } from "@/app/types/CityType";
import fetchWeather from "@/app/lib/fetchWeather";
import { useQuery } from "@tanstack/react-query";
import { WeatherCard } from "@/app/components/weather/WeatherCard";

const Weather = ({ city }: { city: CityType }) => {
  const { data, isFetching } = useQuery({
    queryFn: async () => await fetchWeather(city),
    queryKey: ["weather", city],
  });
  console.log(data);
  if (isFetching || !data) return null;
  return <WeatherCard currentWeather={data} city={city} />;
};

export default Weather;
