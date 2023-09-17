/* eslint-disable global-require */
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', '../../packages/**/*.{js,ts,jsx,tsx,mdx}'],
  presets: [require('@xipkg/tailwind/design-system-preset.js')],
};
