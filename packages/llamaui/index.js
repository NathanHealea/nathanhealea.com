const plugin = require('tailwindcss/plugin');

const colors = require('./src/colors');
const addTypography = require('./src/typography');
const addButtons = require('./src/buttons');
const addLinks = require('./src/links');
const llmamauiPlugin = (props) => {
  console.log('🦙 LlamaUI');
  addTypography(props);
  addButtons(props);
  addLinks(props);
};

module.exports = plugin(llmamauiPlugin, {
  theme: {
    extend: {
      colors,
    },
  },
});
