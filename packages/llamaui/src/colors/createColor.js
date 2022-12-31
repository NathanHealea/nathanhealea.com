const Color = require('color');

const COLOR_STEP = 0.05;

const generateColor = (colorValue) => {
  var color = new Color(colorValue);

  return {
    light: color.lighten(COLOR_STEP).hsl().toString(),
    DEFAULT: color.hsl().toString(),
    dark: color.darken(COLOR_STEP).hsl().toString(),
    content: color.isDark()
      ? color.lighten(0.75).hsl().toString()
      : color.darken(0.75).hsl().toString(),
  };
};

module.exports = generateColor;
