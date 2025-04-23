// apps/frontend/vite.config.js

// Полифилл для getRandomValues в среде Node
import { webcrypto as crypto } from 'crypto';
if (typeof globalThis.crypto === 'undefined') {
  globalThis.crypto = crypto;
}

// дальше уже ваши импорты
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@lab-gym/types': path.resolve(__dirname, '../../libs/types/src'),
    },
  },
});
