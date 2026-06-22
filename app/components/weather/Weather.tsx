import React from "react";
import fetchWeather from "@/app/lib/fetchWeather";
import { useQuery } from "@tanstack/react-query";
import { WeatherCard } from "@/app/components/weather/WeatherCard";
import { useRouter, useSearchParams } from "next/navigation";
import Loader from "@/app/components/Loader";
import Error from "@/app/components/Error";
import { Empty } from "@/app/components/Empty";

const Weather = () => {
  const params = useSearchParams();
  const router = useRouter();

  const lon = params.get("lon");
  const lat = params.get("lat");
  const name = params.get("name");
  const country = params.get("country");

  const { data, isLoading, isError, refetch } = useQuery({
    queryFn: async () => await fetchWeather(Number(lat), Number(lon)),
    queryKey: ["weather", lon, lat],
    enabled: !(lon === null || lat === null),
    retry: 1,
  });

  if (isError) {
    return (
      <Error
        onRetry={() => {
          router.push("/");
          void refetch();
        }}
      />
    );
  }
  if (isLoading) return <Loader />;
  if (!data || !name || !country)
    return <Empty children={"Please Select a city"} />;
  return <WeatherCard currentWeather={data} name={name} country={country} />;
};

export default Weather;
