import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Served from https://kavinparithi-works.github.io/portfolio/ by default.
// Set VITE_BASE_PATH=/ when deploying to a custom domain.
export default defineConfig({
  base: process.env.VITE_BASE_PATH || '/portfolio/',
  plugins: [react(), tailwindcss()],
  build: {
    target: 'es2022',
    // Inline the headline font so the first layout uses its real metrics.
    assetsInlineLimit: (filePath) => (filePath.endsWith('barlow-condensed-900.woff2') ? true : undefined),
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (/node_modules[\\/](react|react-dom|scheduler)[\\/]/.test(id)) return 'react'
          return undefined
        },
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.js',
    css: false,
    include: ['src/**/*.test.{js,jsx}'],
  },
})
