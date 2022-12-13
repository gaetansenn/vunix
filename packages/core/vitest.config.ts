import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    plugins: [vue()],
    test: {
        reporters: ["verbose"], 
        include: ['src/**/*.test.ts'],
        globals: true,
        environment: 'jsdom'
    }
})