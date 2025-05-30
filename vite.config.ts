import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    viteStaticCopy({
      targets: [
        {
          src: 'phishing_urls.json', // source file
          dest: ''                   // destination: root of dist
        }
      ]
    })
  ],
  root: '.', // Set the root to the project root
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, 'index.html'),
        background: path.resolve(__dirname, 'src/background/background.js'), // Add background.js
        warning: path.resolve(__dirname, 'warning.html'), // Add warning.html
        caution: path.resolve(__dirname, 'caution.html'), // Add caution.html
        educational: path.resolve(__dirname, 'education.html'), // Add education.html
        game: path.resolve(__dirname, 'game.html'), // Add game.html
      },
      output: {
        entryFileNames: '[name].js',
        assetFileNames: 'assets/[name][extname]',
      },
    },
  },
/*  optimizeDeps: {
    exclude: ["react-dom/client"]
  }*/
});
