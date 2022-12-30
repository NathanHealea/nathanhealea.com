const Color = require('color');

const createLink = (name, color, e) => {
  const link = {
    [`.link-${name}`]: {
      color: color.DEFAULT,
    },
  };
  return link;
};

module.exports = createLink;
