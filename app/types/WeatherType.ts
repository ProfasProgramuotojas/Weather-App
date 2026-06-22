export type CurrentWeatherType = {
  apparent_temperature: number;
  cloud_cover: number;
  rain: number;
  snowfall: number;
  temperature_2m: number;
  uv_index: number;
  wind_speed_10m: number;
  weather_code: number;
  time: Date;
};

export type WeatherCondition = {
  label: string;
  emoji: string;
};
