import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/main.ts'],
  outDir: './dist',
  platform: 'browser',
  format: ['iife'],
  splitting: false,
  sourcemap: false,
  clean: false,
  watch: true
});