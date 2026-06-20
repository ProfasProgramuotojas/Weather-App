"use client";

import { useMemo, useState } from "react";
import suggestCities from "@/app/lib/suggestCities";
import { CityType } from "@/app/types/CityType";

const Autocomplete = () => {
  const [query, setQuery] = useState("");

  const suggestedCities = useMemo(() => {
    return suggestCities(query);
  }, [query]);

  return (
    <div>
      <input
        className={"border border-black"}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />
      <div>
        {suggestedCities.map((c: CityType) => (
          <div key={c.name}>{c.ascii}</div>
        ))}
      </div>
    </div>
  );
};

export default Autocomplete;
