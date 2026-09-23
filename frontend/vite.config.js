import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tailwnidcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwnidcss()],
  server: {
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
});
