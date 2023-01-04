const Color = require('color');

const createLink = (name, color, e) => {
  const link = {
    [`.link-${name}`]: {
      color: color.DEFAULT,
    },
    [`.link-${name}:hover, .link-${name}:active, .link-${name}:focus, .link-${name}.active`]:
      {
        color: color.dark,
      },
  };
  return link;
};

module.exports = createLink;
