const createButton = require('./createButton');

const addButton = ({ addComponents, theme, e }) => {
  console.log('  Adding Buttons..');

  const colors = theme('colors');

  addComponents({
    '.btn': {
      borderRadius: theme('borderRadius.md'),
      borderColor: 'transparent',
      borderWidth: theme('borderWidth.2'),
      cursor: 'pointer',
      letterSpacing: '.2rem',
      padding: theme('spacing.2'),
      paddingLeft: theme('spacing.4'),
      paddingRight: theme('spacing.4'),
      textTransform: 'uppercase',
      transition: 'all 0.25s ease-in-out',
    },
    ['.btn-square']: {
      paddingLeft: theme('spacing.2'),
      paddingRight: theme('spacing.2'),
    },
  });

  Object.keys(colors).forEach((color) => {
    addComponents(createButton(color, colors[color], e));
  });
};

module.exports = addButton;
