import React from "react";
import { CityType } from "@/app/types/CityType";
import fetchWeather from "@/app/lib/fetchWeather";
import { useQuery } from "@tanstack/react-query";

const Weather = ({ city }: { city: CityType }) => {
  const { data, isFetching } = useQuery({
    queryFn: async () => await fetchWeather(city),
    queryKey: ["weather", city],
  });
  if (isFetching || !data) return null;
  return (
    <div>
      Apparent Temperature: {data.current.apparent_temperature}
      Temperature: {data.current.temperature_2m}
      Apparent Temperature: {data.current.apparent_temperature}
    </div>
  );
};

export default Weather;
