import { expect, test } from "vitest";
import fetchWeather from "@/app/lib/fetchWeather";

test("1. API returns valid results", async () => {
  const randLat = Math.random() * 180 - 90;
  const randLon = Math.random() * 360 - 180;

  const weather = await fetchWeather(randLat, randLon);

  expect(weather).not.toBeNull();
  if (!weather) return;

  Object.keys(weather).forEach((k) => {
    const key = k as keyof typeof weather;
    switch (key) {
      case "time":
        expect(weather[key]).toBeTypeOf("object");
        break;
      default:
        expect(weather[key]).toBeTypeOf("number");
        break;
    }
  });
});
