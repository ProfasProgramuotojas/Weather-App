# Weather App

Search any city in the world and instantly see its current weather conditions.

## Description

Weather App is a small, fast Next.js application for looking up the current weather of any city. As you type, an autocomplete suggests matching cities from a bundled dataset of more than 33,000 cities (ranked by population); selecting one fetches live conditions from the free [Open-Meteo](https://open-meteo.com/) API and presents them in a clean, responsive UI.

## Getting Started

### Dependencies

* **Node.js 20 or later** and **npm** (Next.js 16 requires a modern Node LTS).

### Installing

* Clone the repository and install dependencies:
```
git clone git@github.com:ProfasProgramuotojas/Weather-App.git
cd Weather-App
npm install
```
* No further configuration is required — there are no environment variables or API keys to set. The city dataset ships with the app at `app/data/cities.json`.

### Executing program

* Start the development server:
```
npm run dev
```
* Or run the production build:
```
npm run build
npm start
```

* Open http://localhost:3000 in your browser.

## Tests
* To test a local build needs to be running,see [Getting Started](#getting-started)
* To change the builds url, go into `tests/testingConstants.ts`
* Running the tests:
```
npm run test                          # unit tests (Vitest)
npx playwright install                # one-time: install browsers for E2E
npx playwright test tests/e2e_tests   # E2E tests (start the app on :3000 first)
```
## AI Prompt history
* AI prompt history can be found at the root of the project `ai_prompt_history.md`

## Assumptions, Tradeoffs & Known Limitations

* **No debounce on the search input.** Every keystroke fires a new suggestion query. This keeps the code simple and makes results feel instant, but typing can look laggy because each character re-filters the full ~33,000-city dataset and re-renders the list. TanStack Query's caching and a 30-second `staleTime` soften repeated queries; adding a ~250 ms debounce would smooth typing at the cost of a slight delay before suggestions appear, but further UI development would be needed.
* **Suggestions are not capped.** A short or common query (e.g. a single letter) can match thousands of cities. The UI mitigates this with a fixed-height, scrollable results panel, but the list is not virtualized, so very large result sets still render a lot of DOM.
* **Search is prefix + substring matching over a static, local dataset.** There is no fuzzy matching or typo tolerance. Cities missing from `cities.json` cannot be found.
* **Rain vs. Snow is inferred from temperature** (`temperature_2m > 0`) rather than the API's precipitation type - a simplification for display.
* **Application state lives in the URL** (`lat`, `lon`, `name`, `country`). This makes links shareable and bookmarkable, but the displayed name and country come from the URL and are not re-validated against the API response.

## Authors

### Mykolas Mickus  
[@ProfasProgramuotojas](https://github.com/ProfasProgramuotojas) · mykolas.mickus@gmail.com

## Acknowledgments

Data:
* [Open-Meteo](https://open-meteo.com/) - free weather API
* [GeoNames](https://download.geonames.org/export/dump/) - free world cities database