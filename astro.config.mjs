import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";
import tina from "@tinacms/astro/integration";
import { tinaAdminDevRedirect } from "@tinacms/astro/vite";

export default defineConfig({
  adapter: vercel(),
  devToolbar: {
    enabled: false
  },
  integrations: [tina()],
  output: "static",
  trailingSlash: "always",
  vite: {
    plugins: [tinaAdminDevRedirect()]
  }
});
