// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { SITE_BASE } from "./src/config/site.ts";
import { staticRoutesPlugin } from "./scripts/static-routes.ts";
import { thirdPartyNoticesPlugin } from "./scripts/third-party-notices.ts";
import { vendorDashesPlugin, isKatexModule } from "./scripts/vendor-dashes.ts";

// https://vitejs.dev/config/
export default defineConfig({
  // Déployé sur https://hylst.fr/explorons_l_ia/ (voir src/config/site.ts).
  base: SITE_BASE,
  // Ce site n'utilise aucune variable d'environnement. Le préfixe par défaut (VITE_) est remplacé
  // exprès : certaines bibliothèques (zustand, via React Flow) lisent l'objet d'environnement en
  // entier et Vite l'inline dans le JS public, avec tout ce qu'un .env local pourrait contenir.
  envPrefix: "EXPLORER_PUBLIC_",
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    staticRoutesPlugin({ appFile: path.resolve(import.meta.dirname, "src/App.tsx") }),
    // La police est importée en CSS : elle n'apparaît pas dans les modules JS, on l'ajoute à la main.
    thirdPartyNoticesPlugin({ rootDir: import.meta.dirname, alwaysInclude: ["@fontsource-variable/inter"] }),
    vendorDashesPlugin(),
  ],
  build: {
    rolldownOptions: {
      output: {
        // KaTeX (formules des cours approfondis) dans son propre fichier : chargé seulement par ces cours, et seul
        // fichier où vendorDashesPlugin réécrit les tirets de sa table de symboles.
        codeSplitting: { groups: [{ name: "katex", test: (id: string) => isKatexModule(id) }] },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
});
