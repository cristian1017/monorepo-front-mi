import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
  },
  resolve: {
    alias: {
      "@monorepo/popup-provider": path.resolve(
        __dirname,
        "../popupProvider/dist/popupProvider.es.js"
      ),
    },
  },
});
