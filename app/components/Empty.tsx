import { ReactNode } from "react";
import { MapPinIcon } from "@/app/components/icons/MapPinIcon";

export const Empty = ({ children }: { children: ReactNode }) => {
  return (
    <div
      data-testid={"empty-state"}
      className="flex flex-col items-center justify-center gap-3 py-10 text-center text-slate-500"
    >
      <MapPinIcon strokeWidth={1.5} className="h-9 w-9 text-slate-300" />
      <p className="text-sm">{children}</p>
    </div>
  );
};
