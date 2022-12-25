/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/modules/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    styled: false,
    base: true,
    utils: true,
    theme: ['light', 'dark'],
    logs: true,
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
};
