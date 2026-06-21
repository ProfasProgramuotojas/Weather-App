export type WeatherType = {
  current: {
    apparent_temperature: number;
    cloud_cover: number;
    rain: number;
    snowfall: number;
    temperature_2m: number;
    uv_index: number;
    wind_speed_10m: number;
    time: Date;
  };
  hourly: {
    apparent_temperature: Float32Array[];
    cloud_cover: Float32Array[];
    rain: Float32Array[];
    snowfall: Float32Array[];
    temperature_2m: Float32Array[];
    uv_index: Float32Array;
    wind_speed_10m: Float32Array;
    time: Date[];
  };
};
