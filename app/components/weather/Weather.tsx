import React from "react";
import fetchWeather from "@/app/lib/fetchWeather";
import { useQuery } from "@tanstack/react-query";
import { WeatherCard } from "@/app/components/weather/WeatherCard";
import { useSearchParams } from "next/navigation";
import Loader from "@/app/components/Loader";

const Weather = () => {
  const params = useSearchParams();

  const lon = params.get("lon");
  const lat = params.get("lat");
  const name = params.get("name");
  const country = params.get("country");

  const { data, isFetching } = useQuery({
    queryFn: async () => await fetchWeather(Number(lat), Number(lon)),
    queryKey: ["weather", lon, lat],
    enabled: !(lon === null || lat === null),
  });

  if (isFetching) return <Loader />;
  if (!data || !name || !country) return null;

  return <WeatherCard currentWeather={data} name={name} country={country} />;
};

export default Weather;
