import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path';
import { viteCommonjs } from '@originjs/vite-plugin-commonjs';

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  plugins: [vue(), viteCommonjs(),],
  extensions:  [
    ".mjs", ".js", ".ts",
    ".jsx", ".tsx", ".json",
    ".vue"
  ]
})