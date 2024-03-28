import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontSize: {
      sm: 'var(--font-size-sm)',
      base: 'var(--font-size-base)',
      md: 'var(--font-size-md)',
      lg: 'var(--font-size-lg)',
      lgp: 'var(--font-size-lgp)',
      xl: 'var(--font-size-xl)',
      '2xl': 'var(--font-size-2xl)',
      '3xl': 'var(--font-size-3xl)',
      '4xl': 'var(--font-size-4xl)',
      '5xl': 'var(--font-size-5xl)',
      '6xl': 'var(--font-size-6xl)',
    },
    lineHeight: {
      sm: 'var(--line-height-sm)',
      base: 'var(--line-height-base)',
      md: 'var(--line-height-md)',
      lg: 'var(--line-height-lg)',
      lgp: 'var(--line-height-lgp)',
      xl: 'var(--line-height-xl)',
      '2xl': 'var(--line-height-2xl)',
      '3xl': 'var(--line-height-3xl)',
      '4xl': 'var(--line-height-4xl)',
      '5xl': 'var(--line-height-5xl)',
      '6xl': 'var(--line-height-6xl)',
      '7xl': 'var(--line-height-7xl)',
    },
    letterSpacing: {
      '-2xl': 'var(--letter-spacing--2xl)',
      '-xl': 'var(--letter-spacing--xl)',
      '-lg': 'var(--letter-spacing--lg)',
      '-md': 'var(--letter-spacing--md)',
      base: 'var(--letter-spacing-base)',
      md: 'var(--letter-spacing-md)',
      lg: 'var(--letter-spacing-lg)',
      xl: 'var(--letter-spacing-xl)',
      '2xl': 'var(--letter-spacing-2xl)',
    },

    extend: {},
  },
  plugins: [require('daisyui'), require('@headlessui/tailwindcss')],

  daisyui: {
    themes: ['light'],
  },
} satisfies Config;
