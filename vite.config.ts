import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        icon: true,
      },
    }),
  ],
  server: {
    port: 3000,
    open: true,
  },
  // 👇 вот это нужно, чтобы импорты SVG работали корректно
  esbuild: {
    loader: 'tsx',
    include: /src\/.*\.tsx?$/,
  },
});