"use client";

import { useState } from "react";
import { CityType } from "@/app/types/CityType";
import { useQuery } from "@tanstack/react-query";
import suggestCities from "@/app/lib/suggestCities";
import { useRouter } from "next/navigation";

const AutocompleteCity = ({ city }: { city: CityType }) => {
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
        <div>Loading</div>
      ) : (
        <div className="flex flex-col gap-2">
          {data.map((c: CityType) => (
            <AutocompleteCity city={c} key={c.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Autocomplete;
