import fetchWeather from "@/app/lib/fetchWeather";
import { useQuery } from "@tanstack/react-query";
import { WeatherCard } from "@/app/components/weather/WeatherCard";
import { useRouter, useSearchParams } from "next/navigation";
import Loader from "@/app/components/Loader";
import { Empty } from "@/app/components/Empty";
import { validateUrlCity } from "@/app/validation/validateWeatherURL";
import ErrorState from "@/app/components/ErrorState";

const Weather = () => {
  const params = useSearchParams();
  const router = useRouter();

  const res = validateUrlCity(params);
  const city = res.data!;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["weather", city?.lat, city?.lon],
    queryFn: () => {
      return fetchWeather(city.lat, city.lon);
    },
    enabled: res.success,
    retry: 1,
  });

  if (isError)
    return (
      <ErrorState
        onRetry={() => {
          router.push("/");
        }}
      />
    );
  if (isLoading) return <Loader />;
  if (!data || !city) return <Empty>Please Select a city</Empty>;

  return (
    <WeatherCard
      currentWeather={data}
      name={city.name}
      country={city.country}
    />
  );
};

export default Weather;
