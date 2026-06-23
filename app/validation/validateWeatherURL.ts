import * as z from "zod";

const CityDataSchema = z.object({
  lon: z.coerce.number().min(-180).max(180),
  lat: z.coerce.number().min(-90).max(90),
  name: z.string(),
  country: z.string().length(2),
});

export const validateUrlCity = (cityUrl: URLSearchParams) =>
  CityDataSchema.safeParse(Object.fromEntries(cityUrl.entries()));
