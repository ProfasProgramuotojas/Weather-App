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
      className={
        "border p-4 rounded-md flex flex-col items-center justify-center"
      }
    >
      <h6 className={"italic text-sm"}>{title}</h6>
      <h2 className={"font-bold text-xl"}>{value.toFixed(1)}</h2>
      <h6 className={"italic text-xs"}>{units}</h6>
    </div>
  );
};
