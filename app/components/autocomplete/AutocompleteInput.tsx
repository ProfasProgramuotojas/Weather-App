import React from "react";

function AutocompleteInput({
  query,
  setQuery,
}: {
  query: string;
  setQuery: (q: string) => void;
}) {
  return (
    <input
      type="search"
      className={"border border-black"}
      value={query}
      onChange={(e) => {
        setQuery(e.target.value);
      }}
    />
  );
}

export default AutocompleteInput;
