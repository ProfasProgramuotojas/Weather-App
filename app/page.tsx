"use client";

import Autocomplete from "@/app/components/Autocomplete";
import { useState } from "react";
import { CityType } from "@/app/types/CityType";
import Weather from "@/app/components/weather/Weather";

export default function Home() {
  return (
    <div>
      <Autocomplete />
      <Weather />
    </div>
  );
}
