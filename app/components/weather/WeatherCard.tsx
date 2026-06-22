import { CurrentWeatherType } from "@/app/types/WeatherType";
import { WeatherDataCard } from "@/app/components/weather/WeatherDataCard";
import { WEATHER_CODES } from "@/app/constants/weather";

export const WeatherCard = ({
  currentWeather,
  name,
  country,
}: {
  currentWeather: CurrentWeatherType;
  name: string;
  country: string;
}) => {
  const weatherCodeKeys = Object.keys(WEATHER_CODES);
  const goal = currentWeather.weather_code;
  const closest = weatherCodeKeys.reduce(function (prev, curr) {
    return Math.abs(Number(curr) - goal) < Math.abs(Number(prev) - goal)
      ? curr
      : prev;
  });

  const weatherDesc = WEATHER_CODES[Number(closest)];

  return (
    <div
      className={
        "border w-full p-10 flex gap-10 flex-col justify-center items-center"
      }
    >
      <h1 className={"font-bold text-2xl"}>
        {name} {country}
      </h1>
      <p>
        {weatherDesc.label} {weatherDesc.emoji}
      </p>
      <div className={"flex gap-5 justify-center"}>
        {currentWeather.temperature_2m > 0 ? (
          <WeatherDataCard
            title={"Rain"}
            value={currentWeather.rain}
            units={"mm"}
          />
        ) : (
          <WeatherDataCard
            title={"Snow"}
            value={currentWeather.snowfall}
            units={"cm"}
          />
        )}

        <WeatherDataCard
          title={"Temperature"}
          value={currentWeather.temperature_2m}
          units={"°C"}
        />
        <WeatherDataCard
          title={"Wind"}
          value={currentWeather.wind_speed_10m}
          units={"km/h"}
        />
      </div>

      <div className={"flex"}>
        <WeatherDataCard
          title={"UV Index"}
          value={currentWeather.uv_index}
          units={"index"}
        />
        <WeatherDataCard
          title={"Apparent Temp"}
          value={currentWeather.apparent_temperature}
          units={"°C"}
        />
        <WeatherDataCard
          title={"Clouds"}
          value={currentWeather.cloud_cover}
          units={"%"}
        />
      </div>
    </div>
  );
};
