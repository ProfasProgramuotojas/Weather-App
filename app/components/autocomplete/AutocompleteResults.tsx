import { useLocalStorage } from "@/app/hooks/useLocalStorage";
import { CityType } from "@/app/types/CityType";
import { useRouter } from "next/navigation";
import { LIMIT } from "@/app/constants/autocomplete";

const addPrevCity = (prevCities: CityType[], city: CityType) => {
  const newPrevCities = [...prevCities];
  const i = newPrevCities.findIndex((c) => c.id === city.id);
  if (i !== -1) {
    newPrevCities.splice(i, 1);
  } else if (prevCities.length >= LIMIT) newPrevCities.pop();

  return [city, ...newPrevCities];
};

const AutocompleteOption = ({
  city,
  prevCities,
  setPrevCities,
}: {
  city: CityType;
  prevCities: CityType[];
  setPrevCities: (c: CityType[]) => void;
}) => {
  const router = useRouter();

  return (
    <button
      className="hover:cursor-pointer border"
      onClick={() => {
        setPrevCities(addPrevCity(prevCities, city));
        router.push(
          `/?lat=${city.lat}&lon=${city.lon}&name=${city.name}&country=${city.country}`,
        );
      }}
    >
      {city.ascii} {city.country}
    </button>
  );
};

function AutocompleteResults({
  query,
  data,
}: {
  query: string;
  data: CityType[];
}) {
  const { storedValue: prevCities, setValue: setPrevCities } = useLocalStorage(
    "autocomplete",
    [],
  );

  return (
    <div className="flex flex-col gap-2">
      {/*If no query and no prevCities, then shows the largest cities, if no query and there is prevCities, then show prevCities*/}
      {((!query && !prevCities.length) || query ? data : prevCities).map(
        (c: CityType) => (
          <AutocompleteOption
            city={c}
            key={c.id}
            prevCities={prevCities}
            setPrevCities={setPrevCities}
          />
        ),
      )}
    </div>
  );
}

export default AutocompleteResults;
