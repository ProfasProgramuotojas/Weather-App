"use client";

import Autocomplete from "@/app/components/autocomplete/Autocomplete";
import Weather from "@/app/components/weather/Weather";
import { Suspense } from "react";

export default function Home() {
  return (
    <div>
      <Autocomplete />
      <Suspense>
        <Weather />
      </Suspense>
    </div>
  );
}
