const plugin = require('tailwindcss/plugin');

const colors = require('./src/colors');
const addButtons = require('./src/buttons');
const addLinks = require('./src/links');
const llmamauiPlugin = ({
  addUtilities,
  matchUtilities,
  addComponents,
  matchComponents,
  addBase,
  addVariant,
  matchVariant,
  theme,
  config,
  coreFPlugins,
  e,
}) => {
  console.log('🦙 LlamaUI');

  addButtons(addComponents, theme, e);
  addLinks(addComponents, theme, e);
};

module.exports = plugin(llmamauiPlugin, {
  theme: {
    colors: colors,
  },
});
