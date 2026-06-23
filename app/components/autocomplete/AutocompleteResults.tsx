import { useLocalStorage } from "@/app/hooks/useLocalStorage";
import { CityType } from "@/app/types/CityType";
import { useRouter } from "next/navigation";
import { LIMIT } from "@/app/constants/autocomplete";
import { MapPinIcon } from "@/app/components/icons/MapPinIcon";
import { ChevronRightIcon } from "@/app/components/icons/ChevronRightIcon";

//exported for testing
export const addPrevCity = (prevCities: CityType[], city: CityType) => {
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
  setQuery,
}: {
  city: CityType;
  prevCities: CityType[];
  setPrevCities: (c: CityType[]) => void;
  setQuery: (q: string) => void;
}) => {
  const router = useRouter();

  return (
    <button
      className="group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition hover:cursor-pointer hover:bg-blue-50"
      onClick={() => {
        setQuery("");
        setPrevCities(addPrevCity(prevCities, city));
        const sp = new URLSearchParams({
          lat: String(city.lat),
          lon: String(city.lon),
          name: city.name,
          country: city.country,
        });
        router.push(`/?${sp}`);
      }}
    >
      <MapPinIcon className="h-5 w-5 shrink-0 text-blue-400" />
      <span className="min-w-0 flex-1 truncate">
        <span className="font-medium text-slate-800">{city.name}</span>{" "}
        <span className="text-sm text-slate-400">{city.country}</span>
      </span>
      <ChevronRightIcon className="h-4 w-4 shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-blue-400" />
    </button>
  );
};

function AutocompleteResults({
  query,
  data,
  setQuery,
}: {
  query: string;
  data: CityType[];
  setQuery: (q: string) => void;
}) {
  const { storedValue: prevCities, setValue: setPrevCities } = useLocalStorage<
    CityType[]
  >("autocomplete", []);

  //If no query and no prevCities, then shows the largest cities, if no query and there is prevCities, then show prevCities
  const itemsToShow =
    (!query && !prevCities.length) || query ? data : prevCities;
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/80 p-2 shadow-sm backdrop-blur">
      <div className="scroll-slim flex max-h-72 flex-col gap-1 overflow-y-auto">
        {itemsToShow.map((c: CityType) => (
          <AutocompleteOption
            setQuery={setQuery}
            city={c}
            key={c.id}
            prevCities={prevCities}
            setPrevCities={setPrevCities}
          />
        ))}
      </div>
    </div>
  );
}

export default AutocompleteResults;
