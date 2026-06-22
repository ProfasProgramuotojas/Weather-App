"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import suggestCities from "@/app/lib/suggestCities";
import Loader from "@/app/components/Loader";
import AutocompleteInput from "@/app/components/autocomplete/AutocompleteInput";
import AutocompleteResults from "@/app/components/autocomplete/AutocompleteResults";

const Autocomplete = () => {
  const [query, setQuery] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["cities", query],
    queryFn: async () => await suggestCities(query),
  });

  return (
    <div>
      <AutocompleteInput query={query} setQuery={setQuery} />
      {isLoading ? (
        <Loader />
      ) : !data || !data.length ? (
        <p>It seems we can't find this city</p>
      ) : (
        <AutocompleteResults query={query} data={data} />
      )}
    </div>
  );
};

export default Autocomplete;
