import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  envDir: './environment',
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    host: true,
    allowedHosts: ['https://candidate-search-pec3.onrender.com', 'candidate-search-pec3.onrender.com']
  },
});
