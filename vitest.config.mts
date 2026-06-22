// vitest.config.ts
import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: "node",
    alias: {
      "server-only": new URL(
        "./tests/unit_tests/testSuggestCities.test.ts",
        import.meta.url,
      ).pathname,
    },
  },
});
