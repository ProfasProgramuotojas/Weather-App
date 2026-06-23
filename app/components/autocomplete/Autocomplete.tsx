"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import suggestCities from "@/app/lib/suggestCities";
import Loader from "@/app/components/Loader";
import AutocompleteInput from "@/app/components/autocomplete/AutocompleteInput";
import AutocompleteResults from "@/app/components/autocomplete/AutocompleteResults";
import { Empty } from "@/app/components/Empty";

const Autocomplete = () => {
  const [query, setQuery] = useState("");

  const { data, isFetching } = useQuery({
    queryKey: ["cities", query],
    queryFn: async () => await suggestCities(query),
    staleTime: 1000 * 30,
  });

  return (
    <div className="flex flex-col gap-3">
      <AutocompleteInput query={query} setQuery={setQuery} />
      {isFetching ? (
        <Loader />
      ) : !data || !data.length ? (
        <Empty>{`It seems we can\'t find this city`}</Empty>
      ) : (
        <AutocompleteResults query={query} setQuery={setQuery} data={data} />
      )}
    </div>
  );
};

export default Autocomplete;
