"use client";

import { useEffect, useState } from "react";
import suggestCities from "@/app/lib/suggestCities";
import { CityType } from "@/app/types/CityType";

const Autocomplete = () => {
  const [query, setQuery] = useState("");
  const [suggestedCities, setSuggestedCities] = useState<CityType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      setSuggestedCities(await suggestCities(query));
      setLoading(false);
    };
    void fetch();
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
      {loading ? (
        <div>Loading</div>
      ) : (
        <div>
          {suggestedCities.map((c: CityType, i: number) => (
            <div key={i}>
              {c.ascii} {c.country}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Autocomplete;
