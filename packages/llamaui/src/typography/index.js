const addTypography = ({ addBase, addComponents, addUtilities, theme, e }) => {
  const headingFontFamily =
    "'Comfortaa','Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Open Sans','Helvetica Neue',sans-serif";

  const typography = {
    h1: {
      fontSize: theme('fontSize.6xl'),
      fontFamily: headingFontFamily,
    },
    h2: {
      fontSize: theme('fontSize.5xl'),
      fontFamily: headingFontFamily,
    },
    h3: {
      fontSize: theme('fontSize.4xl'),
      fontFamily: headingFontFamily,
    },
    h4: {
      fontSize: theme('fontSize.3xl'),
      fontFamily: headingFontFamily,
    },
    h5: {
      fontSize: theme('fontSize.2xl'),
      fontFamily: headingFontFamily,
    },
    h6: {
      fontSize: theme('fontSize.xl'),
      fontFamily: headingFontFamily,
    },
    P: {
      fontSize: theme('fontSize.base'),
    },
  };

  Object.keys(typography).forEach((type) => {
    addBase({
      [type]: typography[type],
    });

    addComponents({
      [`.text-${type}`]: type,
    });
  });

  addBase({
    html: {
      fontFamily: "'Space Mono', monospace",
    },
    button: {
      textTransform: 'uppercase',
      letterSpacing: '.2rem',
    },
    a: {
      textTransform: 'uppercase',
      letterSpacing: '.2rem',
    },
    'a:hover, a:active, a:focus, a.active': {},
  });

  addComponents({
    '.text-body': {
      fontSize: theme('fontSize.base'),
    },
    '.text-sub': {
      fontSize: theme('fontSize.lg'),
    },
    '.text-overline': {
      fontSize: theme('fontSize.sm'),
      textTransform: 'uppercase',
      letterSpacing: '.2rem',
    },
  });
};

module.exports = addTypography;
