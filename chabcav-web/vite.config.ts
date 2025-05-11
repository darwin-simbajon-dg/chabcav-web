import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server : {
    host: '0.0.0.0',
    port: 5173,
  },
  publicDir: "public",
  build: {
    outDir: 'build',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: 'index.html',
      },
      output: {
        assetFileNames: ({ name }) => {
          if (name) {
            // Keep the directory structure
            const parts = name.split('/');
            // parts.shift(); // Remove the first segment (e.g., 'src' or 'public')
            return `assets/${parts.join('/')}`;
          }
          return 'assets/[name].[ext]';
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  },
})
