/* eslint-disable import/extensions */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable global-require */
/** @type {import('tailwindcss').Config} */
module.exports = {
  relative: true,
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/!(*node_modules)/**/*.{js,ts,jsx,tsx,mdx}',
    '../../node_modules/@xipkg/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        'marker-hand': ['var(--font-marker-hand)'],
      },
    },
  },
  presets: [require('@xipkg/tailwind/design-system-preset.js')],
};
