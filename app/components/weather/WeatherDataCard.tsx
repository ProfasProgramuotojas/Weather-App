import React from "react";

export const WeatherDataCard = ({
  title,
  value,
  units,
}: {
  title: string;
  value: number;
  units: string;
}) => {
  return (
    <div
      data-testid={"weather-data-card"}
      className="flex flex-col items-center justify-center gap-0.5 rounded-2xl border border-slate-100 bg-slate-50/70 p-4 text-center"
    >
      <span className="text-xs font-medium tracking-wide text-slate-400 uppercase">
        {title}
      </span>
      <span className="text-2xl font-semibold text-slate-800">
        {value.toFixed(1)}
      </span>
      <span className="text-xs text-slate-400">{units}</span>
    </div>
  );
};
