import React from "react";
import { SpinnerIcon } from "@/app/components/icons/SpinnerIcon";

function Loader() {
  return (
    <div
      role="status"
      className="flex items-center justify-center gap-3 py-8 text-slate-500"
    >
      <SpinnerIcon className="h-5 w-5 animate-spin text-blue-500" />
      <span className="text-sm font-medium">Loading…</span>
    </div>
  );
}

export default Loader;
