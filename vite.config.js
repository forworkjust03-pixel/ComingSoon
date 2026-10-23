import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";

// `npm run build`         -> dist/ for any static host
// `npm run build:single`  -> dist-single/index.html, everything inlined,
//                            opens straight from disk (file://) with no server.
export default defineConfig(({ mode }) => {
  const single = mode === "single";
  return {
    base: "./",
    plugins: [react(), single && viteSingleFile()].filter(Boolean),
    build: {
      outDir: single ? "dist-single" : "dist",
      assetsInlineLimit: single ? 100_000_000 : 4096,
    },
  };
});
