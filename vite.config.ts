import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsConfigPaths from 'vite-tsconfig-paths';

import path from 'path';

export default defineConfig({
  plugins: [react(), viteTsConfigPaths()],
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @use "@/styles/mixins" as *;
        @use "@/styles/vars" as *;`,
      },
    },
  },
});
