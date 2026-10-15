import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import { defineConfig } from "vite";
import { githubPagesSpa } from "@sctg/vite-plugin-github-pages-spa";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    githubPagesSpa(),

    VitePWA({
      registerType: "autoUpdate",

      manifest: {
        name: "ServiceLoop",
        short_name: "ServiceLoop",
        description: "Offline motorcycle maintenance tracking.",

        theme_color: "#1976d2",
        background_color: "#ffffff",

        display: "standalone",
        start_url: "/ServiceLoop/",
        scope: "/ServiceLoop/",

        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
  optimizeDeps: {
    exclude: ["browser-fs-access"],
  },
  base: "/ServiceLoop/",
});
