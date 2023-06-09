/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  safelist: [
    {
      pattern: /(bg|border|text|color)-.+/,
    },
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [require('./packages/llamaui')],
};
