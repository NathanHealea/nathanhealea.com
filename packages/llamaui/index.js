const plugin = require('tailwindcss/plugin');

const colors = require('./src/colors');
const addButton = require('./src/buttons');

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

  addButton(addComponents, theme, e);
};

module.exports = plugin(llmamauiPlugin, {
  theme: {
    colors: colors,
  },
});
