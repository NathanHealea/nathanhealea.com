const createLink = require('./createLink');

const addLinks = (addComponents, theme, e) => {
  console.log('  Adding Links..');

  const colors = theme('colors');
  const colorClassNames = Object.keys(colors)
    .map((color) => `.link-${color}`)
    .join(', ');

  addComponents({
    'a, .link': {
      textTransform: 'uppercase',
      letterSpacing: '.2rem',
    },
    'a:hover, a:active, a:focus, a.active, .link:hover, .link:active, .link:focus, .link.active':
      {
        fontWeight: 'bold',
      },
  });

  Object.keys(colors).forEach((color) => {
    addComponents(createLink(color, colors[color], e));
  });
};

module.exports = addLinks;
