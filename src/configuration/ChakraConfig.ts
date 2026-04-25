import { defaultConfig, defineConfig, createSystem } from '@chakra-ui/react';

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        homeBg: { value: '#0f172a' },
        homeBgSecondary: { value: '#1e3a5f' },
        textPrimary: { value: '#f8fafc' },
        textSecondary: { value: '#94a3b8' },
        accentBlue: { value: '#3b82f6' },
        blue: {
          50: { value: '#E6F0FF' },
          100: { value: '#B3D1FF' },
          200: { value: '#80B3FF' },
          300: { value: '#4D94FF' },
          400: { value: '#1E75FF' },
          500: { value: '#3b82f6' },
          600: { value: '#2563EB' },
          700: { value: '#1D4ED8' },
          800: { value: '#1E40AF' },
          900: { value: '#1E3A8A' },
          950: { value: '#0C1929' },
        },
      },
    },
  },
  globalCss: {
    body: {
      color: 'white',
    },
  },
});

export const system = createSystem(defaultConfig, config);
