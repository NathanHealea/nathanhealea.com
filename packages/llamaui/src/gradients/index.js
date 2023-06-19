const addGradient = ({ theme, addUtilities }) => {
  const color = theme('colors');
  addUtilities({
    '.bg-rainbow': {
      background: `linear-gradient(135deg, rgba(255,173,173,1) 0%, rgba(255,187,114,1) 14.28571%, rgba(255,247,68,1) 28.57143%, rgba(141,253,120,1) 42.85714%, rgba(98,238,254,1) 57.14286%, rgba(160,196,255,1) 71.42857%, rgba(171,189,255,1) 85.71429%, rgba(254,169,250,1) 100%);`,
    },
  });
};

module.exports = addGradient;
