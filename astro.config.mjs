import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import node from '@astrojs/node'; // адаптер для Node.js

export default defineConfig({
  site: "https://uinuxblog.getuinux.com",
  integrations: [mdx()],
  markdown: {
    shikiConfig: {
      theme: "github-light",
    },
  },
  output: 'server', // Вмикає SSR для всього проєкту
  adapter: node({
    mode: 'standalone',
  }),
});
