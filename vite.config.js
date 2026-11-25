import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // Relative paths work both on GitHub Pages (a sub-folder) and on Vercel (the root).
  base: "./",
  plugins: [react()],
  build: { chunkSizeWarningLimit: 700 },
  test: {
    environment: "jsdom",
    setupFiles: "./src/setupTests.js",
  },
});
