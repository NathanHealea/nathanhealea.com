/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    colors: {
      black: {
        DEFAULT: '#212529',
        content: '#f6f6f7',
      },
      white: {
        DEFAULT: '#f6f6f7',
        content: '#f6f6f7',
      },
      strawberry: {
        DEFAULT: '#ffadad', // 300
        light: '#ffc8c8', // 200
        dark: '#fd6c6c', // 400
        content: '#9d1717', // 800
        50: '#fef2f2',
        100: '#ffe1e1',
        200: '#ffc8c8',
        300: '#ffadad', // Color used to generate pallette
        400: '#fd6c6c',
        500: '#f53e3e',
        600: '#e22020',
        700: '#be1717',
        800: '#9d1717',
        900: '#821a1a',
        950: '#470808',
      },
      apricot: {
        DEFAULT: '#ffbb72', // 300
        light: '#ffd6a5', // 200
        dark: '#fd943a', // 400
        content: '#9c3410', // 800
        50: '#fff7ed',
        100: '#ffedd5',
        200: '#ffd6a5', // Color used to generate pallette
        300: '#ffbb72',
        400: '#fd943a',
        500: '#fc7513',
        600: '#ed5909',
        700: '#c4420a',
        800: '#9c3410',
        900: '#7d2d11',
        950: '#441506',
      },
      lemon: {
        DEFAULT: '#fff744', // 300
        light: '#fffe88', // 200
        dark: '#fee911', // 400
        content: '#875b0c', // 800
        50: '#fefee8',
        100: '#fdffb6', // Color used to generate pallette
        200: '#fffe88',
        300: '#fff744',
        400: '#fee911',
        500: '#eecf04',
        600: '#cda201',
        700: '#a47404',
        800: '#875b0c',
        900: '#734a10',
        950: '#432705',
      },
      apple: {
        DEFAULT: '#8dfd78', // 300
        light: '#caffbf', // 200
        dark: '#53f236', // 400
        content: '#1a700b', // 800
        50: '#f2ffee',
        100: '#deffd8',
        200: '#caffbf', // Color used to generate pallette
        300: '#8dfd78',
        400: '#53f236',
        500: '#2cdb0c',
        600: '#1eb603',
        700: '#1b8e07',
        800: '#1a700b',
        900: '#165b0c',
        950: '#063300',
      },
      blueberry: {
        DEFAULT: '#62eefe', // 300
        light: '#9bf6ff', // 200
        dark: '#1bdbf5', // 400
        content: '#126178', // 800
        50: '#ebffff',
        100: '#cdfcff',
        200: '#9bf6ff', // Color used to generate pallette
        300: '#62eefe',
        400: '#1bdbf5',
        500: '#00bedb',
        600: '#0297b8',
        700: '#0a7994',
        800: '#126178',
        900: '#135066',
        950: '#063546',
      },
      plum: {
        DEFAULT: '#a0c4ff', // 300
        light: '#bed5ff', // 200
        dark: '#5d96fd', // 400
        content: '#214fef', // 800
        50: '#eff5ff',
        100: '#dae7ff',
        200: '#bed5ff',
        300: '#a0c4ff', // Color used to generate pallette
        400: '#5d96fd',
        500: '#376ffa',
        600: '#214fef',
        700: '#193adc',
        800: '#1b31b2',
        900: '#1c2f8c',
        950: '#161e55',
      },
      grape: {
        DEFAULT: '#bdb2ff', // 300
        light: '#d9d5ff', // 200
        dark: '#9d88fd', // 400
        content: '#501dba', // 800
        50: '#f4f3ff',
        100: '#ebe8ff',
        200: '#d9d5ff',
        300: '#bdb2ff', // Color used to generate pallette
        400: '#9d88fd',
        500: '#7e58fa',
        600: '#6f35f2',
        700: '#6023de',
        800: '#501dba',
        900: '#431a98',
        950: '#270e67',
      },
      peach: {
        DEFAULT: '#fea9fa', // 300
        light: '#ffc6ff', // 200
        dark: '#fc76f4', // 400
        content: '#921684', // 800
        50: '#fff4ff',
        100: '#ffe7ff',
        200: '#ffc6ff', // Color used to generate pallette
        300: '#fea9fa',
        400: '#fc76f4',
        500: '#f342e7',
        600: '#d722c8',
        700: '#b219a1',
        800: '#921684',
        900: '#771869',
        950: '#500246',
      },
    },
    extend: {},
  },
  plugins: [require('./packages/llamaui')],
};
