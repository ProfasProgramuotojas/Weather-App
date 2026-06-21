import { CurrentWeatherType } from "@/app/types/WeatherType";
import { WeatherDataCard } from "@/app/components/weather/WeatherDataCard";

export const WeatherCard = ({
  currentWeather,
  name,
  country,
}: {
  currentWeather: CurrentWeatherType;
  name: string;
  country: string;
}) => {
  return (
    <div
      className={
        "border w-full p-10 flex gap-10 flex-col justify-center items-center"
      }
    >
      <h1 className={"font-bold text-2xl"}>
        {name} {country}
      </h1>
      <div className={"flex gap-5 justify-center"}>
        {currentWeather.temperature_2m > 0 ? (
          <WeatherDataCard
            title={"Rain"}
            value={currentWeather.rain}
            units={"CM"}
          />
        ) : (
          <WeatherDataCard
            title={"Snow"}
            value={currentWeather.snowfall}
            units={"CM"}
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
          units={"KM/H"}
        />
      </div>

      <div className={"flex"}>
        <WeatherDataCard
          title={"UV Index"}
          value={currentWeather.uv_index}
          units={"CM"}
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
