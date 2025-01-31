import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    hmr: {
      protocol: 'ws', // Используем WebSocket
      host: 'localhost',
      port: 5173,
    },
  },
});
