import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/main.ts"),
      name: "MiniPlayer",
      fileName: (format) => `mini-player.${format}.js`,
      formats: ["es", "umd"],
    },
    rollupOptions: {
      output: {
        globals: {
          vue: "Vue",
        },
        exports: "named",
      },
      external: ["vue"],
    },
  },
  plugins: [
    vue({}),
    dts({
      outputDir: "types",
    }),
  ],
});
