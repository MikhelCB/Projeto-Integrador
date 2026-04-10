import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/tutores": { target: "http://localhost:3000", changeOrigin: true },
      "/animais": { target: "http://localhost:3000", changeOrigin: true },
      "/servico": { target: "http://localhost:3000", changeOrigin: true },
      "/agendamento": { target: "http://localhost:3000", changeOrigin: true },
    },
  },
});
