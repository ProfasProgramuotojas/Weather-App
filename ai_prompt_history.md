## Prompt History
___
[https://open-meteo.com/](https://open-meteo.com/) [https://www.weatherapi.com/](https://www.weatherapi.com/) [https://www.visualcrossing.com/weather-api/](https://www.visualcrossing.com/weather-api/) 
Which api would suit the task provided best?, I will do the autocomplete myself, i just need a simple and good api
___
which would be the best to work with all cities in runtime web? and fastest?
sqlite, csv, json?
___
What would be a better way to transfer selected city? maybe through local storage?
___
Where error?

import React from "react"; import fetchWeather from "@/app/lib/fetchWeather"; import { useQuery } from "@tanstack/react-query"; import { WeatherCard } from "@/app/components/weather/WeatherCard"; import { useSearchParams } from "next/navigation"; const Weather = () => { const params = useSearchParams(); const lon = Number(params.get("lon")); const lat = Number(params.get("lat")); const name = params.get("name"); const country = params.get("country"); console.log(lat, lon, name, country); const { data, isFetching } = useQuery({ queryFn: async () => await fetchWeather(lat, lon), queryKey: ["weather", lon, lat], enabled: !!(lon && lat), }); if (isFetching || !data || !name || !country) return null; return <WeatherCard currentWeather={data} name={name} country={country} />; }; export default Weather;

```
    router.push(
      `/?lat=${city.lat}$lon=${city.lon}$name=${city.name}$country=${city.country}`,
    );
```
___
const lon = Number(params.get("lon")); const lat = Number(params.get("lat")); const name = params.get("name"); const country = params.get("country");

isnt there a better way to do this?
___
"use server"; //test no query //test invalid query //test normal query //test Upper Case //test ascii import { expect, test, vi } from "vitest"; import suggestCities from "@/app/lib/suggestCities"; import { TEST_BIGGEST_CITIES } from "@/tests/testingConstants"; vi.mock("server-only", () => ({})); test("1. Empty Query", async () => { const suggested = await suggestCities(""); expect(suggested).toBe(TEST_BIGGEST_CITIES); });

Error: Failed to resolve import "server-only" from "app/lib/serverLog.ts". Does the file exist? Plugin: vite:import-analysis File: /run/media/emcekus/Storage/Projects/Active/axiology-weather/app/lib/serverLog.ts:1:7 1 | import "server-only"; | ^  
2 | export const serverLog = (log, fileName) => {  
3 | console.log(`Error in ${fileName}: ${JSON.stringify(log)}`);

WHY doesnt this work?
___
Suggest, what would be the best way to implement weather condition summary?
___
Perfect, but now add emoji aswell
___
I need to create automated tests for this project, suggest, with what tool should I create them and what kind of automated tests would be the best (unit... and features...)
___
import { expect, type Page } from "@playwright/test"; export const testCityButton = async (page: Page, text: string) => { const button = page.getByRole("button", { name: text }); await expect(button).toBeVisible(); await button.click(); };

how do i make it so if there are two results, it would choose the first one?
___
I have pasted the github of the project and the task. Ignore the UI and responsive Design. How well have I managed to complete all of the task and what improvements (ranked by neccesity) could I add?
___
Create the whole UI for  the whole project, and  make it responsive. Dont change any logic I have written, only design. Make it very simple and clean.
___
Put all of the svgs you have written into components
___
How well have i completed the task (exclude readme), and what improvements could I do?
___
Use this Template and write the whole of README.md: {Template},  also include any  assumptions, tradeoffs, or known limitations: for not using debounce (makes it look laggy), create assumptions or tradeoffs if you find any
___
Optimize and make it so this algorithm would return limited results under 3 characters: {suggestCities.ts}
Also Benchmark your new algorithm against my old one
___