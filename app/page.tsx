"use client";

import Autocomplete from "@/app/components/autocomplete/Autocomplete";
import { Suspense } from "react";
import Weather from "@/app/components/weather/Weather";

export default function Home() {
  return (
    <main className="flex min-h-dvh w-full justify-center px-4 py-10 sm:py-16">
      <div className="flex w-full max-w-2xl flex-col gap-8">
        <header className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl">
            Weather
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Search a city to see current conditions
          </p>
        </header>

        <Autocomplete />

        <Suspense>
          <Weather />
        </Suspense>
      </div>
    </main>
  );
}
