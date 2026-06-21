"use client";

import { useState } from "react";
import { CityType } from "@/app/types/CityType";
import { useQuery } from "@tanstack/react-query";
import suggestCities from "@/app/lib/suggestCities";
import { useRouter } from "next/navigation";
import Loader from "@/app/components/Loader";
import useLocalStorage from "@/app/hooks/useLocalStorage";

const AutocompleteOption = ({ city }: { city: CityType }) => {
  const router = useRouter();
  return (
    <button
      className="hover:cursor-pointer border"
      onClick={() => {
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
  const { set, get, remove } = useLocalStorage("autocomplete");
  const [query, setQuery] = useState("");

  const { data, isFetching } = useQuery({
    queryKey: ["cities", query],
    queryFn: async () => await suggestCities(query),
  });

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
          {data.map((c: CityType) => (
            <AutocompleteOption city={c} key={c.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Autocomplete;
