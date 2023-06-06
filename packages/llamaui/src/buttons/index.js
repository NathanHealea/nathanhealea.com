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
      borderWidth: theme('borderWidth.2'),
      borderColor: 'transparent',
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
