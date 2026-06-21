"use client";

import Autocomplete from "@/app/components/Autocomplete";
import Weather from "@/app/components/weather/Weather";

export default function Home() {
  return (
    <div>
      <Autocomplete />
      <Weather />
    </div>
  );
}
