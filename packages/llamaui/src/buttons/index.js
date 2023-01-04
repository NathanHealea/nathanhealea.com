const Color = require('color');
const createButton = require('./createButton');

const addButton = ({ addComponents, theme, e }) => {
  console.log('  Adding Buttons..');

  const colors = theme('colors');
  const colorClassNames = Object.keys(colors)
    .map((color) => `.btn-${color}`)
    .join(', ');

  addComponents({
    '.btn': {
      paddingTop: theme('spacing.2'),
      paddingBottom: theme('spacing.2'),
      paddingLeft: theme('spacing.4'),
      paddingRight: theme('spacing.4'),
      borderTopRightRadius: theme('borderRadius.md'),
      borderTopLeftRadius: theme('borderRadius.md'),
      borderBottomRightRadius: theme('borderRadius.md'),
      borderBottomLeftRadius: theme('borderRadius.md'),
      textTransform: 'uppercase',
      letterSpacing: '.2rem',
      cursor: 'pointer',
    },
    '.btn:hover, .btn:focus, .btn:active, .btn.active': {
      backgroundColor: Color(theme('colors.black.DEFAULT'))
        .alpha(0.2)
        .hsl()
        .toString(),
      // fontWeight: 'bold',
    },

    '.btn.btn-contained': {
      color: theme('colors.white.DEFAULT'),
      backgroundColor: Color(theme('colors.black.DEFAULT'))
        .alpha(0.8)
        .hsl()
        .toString(),
    },
    [`.btn:hover.btn-contained:not(${colorClassNames}), .btn:active.btn-contained:not(${colorClassNames}), .btn:focus.btn-contained:not(${colorClassNames}), .btn.active.btn-contained:not(${colorClassNames})`]:
      {
        backgroundColor: theme('colors.black.DEFAULT'),
      },

    '.btn.btn-outlined': {
      borderWidth: theme('borderWidth.2'),
    },
    [`.btn:hover.btn-outlined:not(${colorClassNames})`]: {
      color: theme('colors.black.DEFAULT'),
      borderColor: theme('colors.black.DEFAULT'),
    },
    ['.btn-square']: {
      paddingTop: theme('spacing.2'),
      paddingBottom: theme('spacing.2'),
      paddingLeft: theme('spacing.2'),
      paddingRight: theme('spacing.2'),
    },
  });

  Object.keys(colors).forEach((color) => {
    addComponents(createButton(color, colors[color], e));
  });
};

module.exports = addButton;
