import React from "react";
import { SearchIcon } from "@/app/components/icons/SearchIcon";

function AutocompleteInput({
  query,
  setQuery,
}: {
  query: string;
  setQuery: (q: string) => void;
}) {
  return (
    <div className="relative">
      <SearchIcon className="pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-slate-400" />
      <input
        type="search"
        placeholder="Search for a city…"
        aria-label="Search for a city"
        className="w-full rounded-2xl border border-slate-200 bg-white/80 py-3.5 pr-4 pl-12 text-base text-slate-800 shadow-sm backdrop-blur transition outline-none placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />
    </div>
  );
}

export default AutocompleteInput;
