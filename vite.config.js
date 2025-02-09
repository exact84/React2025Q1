import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig(({ command }) => ({
    base: command === 'serve' ? '/' : '/React2025Q1/',
    plugins: [react()],
    test: {
        globals: true,
        environment: 'jsdom',
    },
    server: {
        hmr: {
            protocol: 'ws',
            host: 'localhost',
            port: 5173,
        },
    },
}));
