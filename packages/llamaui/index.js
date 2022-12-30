const plugin = require('tailwindcss/plugin');

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
};

module.exports = plugin(llmamauiPlugin, {
  theme: {},
});
