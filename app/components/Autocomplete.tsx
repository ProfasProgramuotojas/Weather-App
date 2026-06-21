"use client";

import { useState } from "react";
import { CityType } from "@/app/types/CityType";
import { useQuery } from "@tanstack/react-query";
import suggestCities from "@/app/lib/suggestCities";
import { useRouter } from "next/navigation";
import Loader from "@/app/components/Loader";
import { useLocalStorage } from "@/app/hooks/useLocalStorage";
import { LIMIT } from "@/app/constants/autocomplete";

const addPrevCity = (prevCities: CityType[], city: CityType) => {
  const newPrevCities = [...prevCities];
  newPrevCities.unshift(city);

  if (prevCities.length >= LIMIT) newPrevCities.pop();

  return newPrevCities;
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

const Autocomplete = () => {
  const [query, setQuery] = useState("");

  const { storedValue: prevCities, setValue: setPrevCities } = useLocalStorage(
    "autocomplete",
    [],
  );

  const { data, isFetching } = useQuery({
    queryKey: ["cities", query],
    queryFn: async () => await suggestCities(query),
  });

  console.log(data);

  return (
    <div>
      <input
        className={"border border-black"}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />
      {isFetching || !data ? (
        <Loader />
      ) : (
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
      )}
    </div>
  );
};

export default Autocomplete;
