import { defineConfig } from 'vite'

export default defineConfig({
    root: './',
    base: './', // Important for relative paths on static hosts
    build: {
        outDir: 'dist',
        emptyOutDir: true,
        sourcemap: true,
        chunkSizeWarningLimit: 1000
    },
    server: {
        host: true // Always expose to network
    }
})
