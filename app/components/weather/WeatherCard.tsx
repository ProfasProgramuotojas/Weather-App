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
    <div className="flex w-full flex-col items-center gap-6 rounded-3xl border border-slate-200 bg-white/80 p-6 text-center shadow-sm backdrop-blur sm:p-8">
      <h1
        className="text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl"
        data-testid={"weather-title"}
      >
        {name} {country}
      </h1>

      <p
        data-testid={"weather-description"}
        className="flex flex-col items-center gap-2"
      >
        <span aria-hidden={true} className="text-6xl leading-none sm:text-7xl">
          {weatherDesc.emoji}
        </span>
        <span className="text-lg font-medium text-slate-600">
          {weatherDesc.label}
        </span>
      </p>

      <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3">
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
        <WeatherDataCard
          title={"UV"}
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
