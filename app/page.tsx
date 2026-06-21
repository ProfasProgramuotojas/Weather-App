"use client";

import Autocomplete from "@/app/components/Autocomplete";
import { useState } from "react";
import { CityType } from "@/app/types/CityType";
import Weather from "@/app/components/weather/Weather";

export default function Home() {
  const [city, setCity] = useState<CityType | null>(null);
  return (
    <div>
      {city?.ascii}
      <Autocomplete
        onCitySelect={(c) => {
          console.log(c);
          setCity(c);
        }}
      />
      {city && <Weather city={city} />}
    </div>
  );
}
