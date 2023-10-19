/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './.ladle/**/*.stories.{js,ts,jsx,tsx}',
  ],
  safelist: [
    {
      pattern: /(bg|border|text|color)-.+/,
    },
  ],
  darkMode: 'class',
  theme: {
    colors: {
      black: {
        DEFAULT: '#212529',
        content: '#f6f6f7',
      },
      white: {
        DEFAULT: '#f6f6f7',
        content: '#212529',
      },
      strawberry: {
        DEFAULT: 'rgb(var(--strawberry-default))', // 300
        light: 'rgb(var(--strawberry-light))', // 200
        dark: 'rgb(var(--strawberry-dark))', // 400
        content: 'rgb(var(--strawberry-content))', // 800
        50: 'rgb(var(--strawberry-50))',
        100: 'rgb(var(--strawberry-100))',
        200: 'rgb(var(--strawberry-200))',
        300: 'rgb(var(--strawberry-300))', // Color used to generate pallette
        400: 'rgb(var(--strawberry-400))',
        500: 'rgb(var(--strawberry-500))',
        600: 'rgb(var(--strawberry-600))',
        700: 'rgb(var(--strawberry-700))',
        800: 'rgb(var(--strawberry-800))',
        900: 'rgb(var(--strawberry-900))',
        950: 'rgb(var(--strawberry-950))',
      },
      apricot: {
        DEFAULT: 'rgb(var(--apricot-default))', // 300
        light: 'rgb(var(--apricot-light))', // 200
        dark: 'rgb(var(--apricot-dark))', // 400
        content: 'rgb(var(--apricot-content))', // 800
        50: 'rgb(var(--apricot-50))',
        100: 'rgb(var(--apricot-100))',
        200: 'rgb(var(--apricot-200))',
        300: 'rgb(var(--apricot-300))', // Color used to generate pallette
        400: 'rgb(var(--apricot-400))',
        500: 'rgb(var(--apricot-500))',
        600: 'rgb(var(--apricot-600))',
        700: 'rgb(var(--apricot-700))',
        800: 'rgb(var(--apricot-800))',
        900: 'rgb(var(--apricot-900))',
        950: 'rgb(var(--apricot-950))',
      },
      lemon: {
        DEFAULT: 'rgb(var(--lemon-default))', // 300
        light: 'rgb(var(--lemon-light))', // 200
        dark: 'rgb(var(--lemon-dark))', // 400
        content: 'rgb(var(--lemon-content))', // 800
        50: 'rgb(var(--lemon-50))',
        100: 'rgb(var(--lemon-100))',
        200: 'rgb(var(--lemon-200))',
        300: 'rgb(var(--lemon-300))', // Color used to generate pallette
        400: 'rgb(var(--lemon-400))',
        500: 'rgb(var(--lemon-500))',
        600: 'rgb(var(--lemon-600))',
        700: 'rgb(var(--lemon-700))',
        800: 'rgb(var(--lemon-800))',
        900: 'rgb(var(--lemon-900))',
        950: 'rgb(var(--lemon-950))',
      },
      apple: {
        DEFAULT: 'rgb(var(--apple-default))', // 300
        light: 'rgb(var(--apple-light))', // 200
        dark: 'rgb(var(--apple-dark))', // 400
        content: 'rgb(var(--apple-content))', // 800
        50: 'rgb(var(--apple-50))',
        100: 'rgb(var(--apple-100))',
        200: 'rgb(var(--apple-200))',
        300: 'rgb(var(--apple-300))', // Color used to generate pallette
        400: 'rgb(var(--apple-400))',
        500: 'rgb(var(--apple-500))',
        600: 'rgb(var(--apple-600))',
        700: 'rgb(var(--apple-700))',
        800: 'rgb(var(--apple-800))',
        900: 'rgb(var(--apple-900))',
        950: 'rgb(var(--apple-950))',
      },
      blueberry: {
        DEFAULT: 'rgb(var(--blueberry-default))', // 300
        light: 'rgb(var(--blueberry-light))', // 200
        dark: 'rgb(var(--blueberry-dark))', // 400
        content: 'rgb(var(--blueberry-content))', // 800
        50: 'rgb(var(--blueberry-50))',
        100: 'rgb(var(--blueberry-100))',
        200: 'rgb(var(--blueberry-200))',
        300: 'rgb(var(--blueberry-300))', // Color used to generate pallette
        400: 'rgb(var(--blueberry-400))',
        500: 'rgb(var(--blueberry-500))',
        600: 'rgb(var(--blueberry-600))',
        700: 'rgb(var(--blueberry-700))',
        800: 'rgb(var(--blueberry-800))',
        900: 'rgb(var(--blueberry-900))',
        950: 'rgb(var(--blueberry-950))',
      },
      plum: {
        DEFAULT: 'rgb(var(--plum-default))', // 300
        light: 'rgb(var(--plum-light))', // 200
        dark: 'rgb(var(--plum-dark))', // 400
        content: 'rgb(var(--plum-content))', // 800
        50: 'rgb(var(--plum-50))',
        100: 'rgb(var(--plum-100))',
        200: 'rgb(var(--plum-200))',
        300: 'rgb(var(--plum-300))', // Color used to generate pallette
        400: 'rgb(var(--plum-400))',
        500: 'rgb(var(--plum-500))',
        600: 'rgb(var(--plum-600))',
        700: 'rgb(var(--plum-700))',
        800: 'rgb(var(--plum-800))',
        900: 'rgb(var(--plum-900))',
        950: 'rgb(var(--plum-950))',
      },
      grape: {
        DEFAULT: 'rgb(var(--grape-default))', // 300
        light: 'rgb(var(--grape-light))', // 200
        dark: 'rgb(var(--grape-dark))', // 400
        content: 'rgb(var(--grape-content))', // 800
        50: 'rgb(var(--grape-50))',
        100: 'rgb(var(--grape-100))',
        200: 'rgb(var(--grape-200))',
        300: 'rgb(var(--grape-300))', // Color used to generate pallette
        400: 'rgb(var(--grape-400))',
        500: 'rgb(var(--grape-500))',
        600: 'rgb(var(--grape-600))',
        700: 'rgb(var(--grape-700))',
        800: 'rgb(var(--grape-800))',
        900: 'rgb(var(--grape-900))',
        950: 'rgb(var(--grape-950))',
      },
      peach: {
        DEFAULT: 'rgb(var(--peach-default))', // 300
        light: 'rgb(var(--peach-light))', // 200
        dark: 'rgb(var(--peach-dark))', // 400
        content: 'rgb(var(--peach-content))', // 800
        50: 'rgb(var(--peach-50))',
        100: 'rgb(var(--peach-100))',
        200: 'rgb(var(--peach-200))',
        300: 'rgb(var(--peach-300))', // Color used to generate pallette
        400: 'rgb(var(--peach-400))',
        500: 'rgb(var(--peach-500))',
        600: 'rgb(var(--peach-600))',
        700: 'rgb(var(--peach-700))',
        800: 'rgb(var(--peach-800))',
        900: 'rgb(var(--peach-900))',
        950: 'rgb(var(--peach-950))',
      },
    },
    extend: {
      letterSpacing: {
        '2x': '.2rem',
      },
    },
  },
};
