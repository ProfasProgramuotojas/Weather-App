"use client";

import { useEffect, useState } from "react";
import suggestCities from "@/app/lib/suggestCities";
import { CityType } from "@/app/types/CityType";

const AutocompleteCity = ({
  city,
  onSelect,
}: {
  city: CityType;
  onSelect: (c: CityType) => void;
}) => {
  return (
    <button
      className="hover:cursor-pointer border"
      onClick={() => onSelect(city)}
    >
      {city.ascii} {city.country}
    </button>
  );
};

const Autocomplete = ({
  onCitySelect,
}: {
  onCitySelect: (c: CityType) => void;
}) => {
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
        <div className="flex flex-col gap-2">
          {suggestedCities.map((c: CityType) => (
            <AutocompleteCity
              city={c}
              key={c.id}
              onSelect={(c) => {
                onCitySelect(c);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Autocomplete;
