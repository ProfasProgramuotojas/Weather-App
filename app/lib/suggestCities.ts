"use server";
import { CityType } from "@/app/types/CityType";
import citiesData from "../data/cities.json";
import { LIMIT } from "@/app/constants/autocomplete";
import { serverLog } from "@/app/lib/serverLog";

const cities = citiesData as CityType[];

// Tunables: short queries (potentially huge match sets) get capped;
// longer queries return the full match set.
const SHORT_MAX_LEN = 3; // queries <= this length are capped
const SHORT_CAP = 50; // ...to at most this many results

// ----- indices, built once at module load -----
const nameLC: string[] = new Array(cities.length);
const asciiLC: string[] = new Array(cities.length);

// sorted prefix index: { key, idx } entries for both name and ascii
const prefixIndex: { key: string; idx: number }[] = [];
// trigram inverted index: trigram -> ascending list of city indices
const trigramIndex = new Map<string, number[]>();

for (let idx = 0; idx < cities.length; idx++) {
  const n = cities[idx].name.toLowerCase();
  const a = cities[idx].ascii.toLowerCase();
  nameLC[idx] = n;
  asciiLC[idx] = a;

  prefixIndex.push({ key: n, idx });
  if (a !== n) prefixIndex.push({ key: a, idx });

  const grams = new Set<string>();
  for (let i = 0; i + 3 <= n.length; i++) grams.add(n.slice(i, i + 3));
  if (a !== n) for (let i = 0; i + 3 <= a.length; i++) grams.add(a.slice(i, i + 3));
  for (const g of grams) {
    let list = trigramIndex.get(g);
    if (list === undefined) trigramIndex.set(g, (list = []));
    list.push(idx); // idx increasing -> list stays sorted (= population order)
  }
}
prefixIndex.sort((x, y) => (x.key < y.key ? -1 : x.key > y.key ? 1 : x.idx - y.idx));

const topCities = cities.slice(0, LIMIT);

// leftmost index in prefixIndex whose key >= q
function lowerBound(q: string): number {
  let lo = 0,
      hi = prefixIndex.length;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (prefixIndex[mid].key < q) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}

// substring matches (excluding already-seen prefix matches), in population order
function substringMatches(q: string, len: number, seen: Set<number>): number[] {
  const out: number[] = [];
  if (len >= 3) {
    // any city containing q contains every trigram of q -> use the rarest
    // trigram's posting list as a candidate superset, then verify.
    let best: number[] | null = null;
    for (let i = 0; i + 3 <= len; i++) {
      const list = trigramIndex.get(q.slice(i, i + 3));
      if (list === undefined) return out; // a trigram is absent -> no matches
      if (best === null || list.length < best.length) best = list;
    }
    if (best) {
      for (const idx of best) {
        if (seen.has(idx)) continue;
        if (nameLC[idx].includes(q) || asciiLC[idx].includes(q)) out.push(idx);
      }
    }
  } else {
    // 1-2 char substring query: trigram index can't help. Rarely reached,
    // since such short queries almost always fill on prefix matches.
    for (let idx = 0; idx < cities.length; idx++) {
      if (seen.has(idx)) continue;
      if (nameLC[idx].includes(q) || asciiLC[idx].includes(q)) out.push(idx);
    }
  }
  return out;
}

const suggestCities = async (query: string): Promise<CityType[]> => {
  try {
    if (!query) return topCities;
    const q = query.toLowerCase();
    const len = q.length;

    // --- short queries: cheap front-to-back scan, capped ---
    // Dataset is population-descending, so the first matches found are the
    // most populous; breaking at the cap keeps this near-instant.
    if (len <= SHORT_MAX_LEN) {
      const out: CityType[] = [];
      const seen = new Set<number>();
      for (let idx = 0; idx < cities.length; idx++) {
        if (nameLC[idx].slice(0, len) === q || asciiLC[idx].slice(0, len) === q) {
          out.push(cities[idx]);
          seen.add(idx);
          if (out.length >= SHORT_CAP) return out;
        }
      }
      if (out.length < LIMIT) {
        for (const idx of substringMatches(q, len, seen)) {
          out.push(cities[idx]);
          if (out.length >= SHORT_CAP) break;
        }
      }
      return out;
    }

    // --- longer queries: full result set, indexed ---
    const seen = new Set<number>();
    for (let i = lowerBound(q); i < prefixIndex.length; i++) {
      const e = prefixIndex[i];
      if (!e.key.startsWith(q)) break; // matched range is contiguous
      seen.add(e.idx);
    }
    const autocompleted = [...seen].sort((a, b) => a - b); // population order
    if (autocompleted.length >= LIMIT) return autocompleted.map((i) => cities[i]);

    const searched = substringMatches(q, len, seen);
    return [
      ...autocompleted.map((i) => cities[i]),
      ...searched.map((i) => cities[i]),
    ];
  } catch (e) {
    return serverLog(e, "suggestCities.ts");
  }
};

export default suggestCities;