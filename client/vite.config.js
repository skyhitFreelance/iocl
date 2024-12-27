import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteCompression from "vite-plugin-compression";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteCompression({
      algorithm: "gzip",
      ext: ".gz", // The extension for compressed files
    }),
  ],
  server: {
    proxy: {
      "/api": {
        target: "https://demo.skyhitmedia.website", // Your backend API URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // Optional: Remove "/api" prefix
      },
    },
  },
});
