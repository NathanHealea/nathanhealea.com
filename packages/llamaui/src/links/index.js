const createLink = require('./createLink');

const addLinks = ({ addComponents, theme, e }) => {
  console.log('  Adding Links..');

  const colors = theme('colors');
  const colorClassNames = Object.keys(colors)
    .map((color) => `.link-${color}`)
    .join(', ');

  addComponents({
    '.link': {
      textTransform: 'Uppercase',
      letterSpacing: '.2rem',
    },
    '.link:hover, .link:active, .link:focus, .link.active': {},
  });

  Object.keys(colors).forEach((color) => {
    addComponents(createLink(color, colors[color], e));
  });
};

module.exports = addLinks;
