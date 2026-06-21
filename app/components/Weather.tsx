import React, { useEffect, useState } from "react";
import { CityType } from "@/app/types/CityType";
import fetchWeather from "@/app/lib/fetchWeather";

const Weather = ({ city }: { city: CityType }) => {
  const [weather, setWeather] = useState();
  useEffect(() => {
    const fetch = async () => {
      console.log(await fetchWeather(city));
    };

    void fetch();
  }, [city]);
  return <div></div>;
};

export default Weather;
