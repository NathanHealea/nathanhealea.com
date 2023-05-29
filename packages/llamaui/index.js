const plugin = require('tailwindcss/plugin');
const addTypography = require('./src/typography');
const addButtons = require('./src/buttons');
const addLinks = require('./src/links');
const addGradients = require('./src/gradients');
const theme = require('./src/theme');

const llmamauiPlugin = (props) => {
  console.log('🦙 LlamaUI');
  addTypography(props);
  addButtons(props);
  addLinks(props);
  addGradients(props);
};

module.exports = plugin(llmamauiPlugin, {
  theme: {
    colors: theme.colors,
    extend: {
      spacing: {
        '1/7': '14.286%',
      },
    },
  },
});
