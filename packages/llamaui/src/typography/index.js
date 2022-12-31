const addTypography = ({ addBase, addUtilities, theme, e }) => {
  const headingFontFamily =
    "'Comfortaa','Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Open Sans','Helvetica Neue',sans-serif";

  const typography = [
    {
      name: 'h1',
      styles: {
        fontSize: theme('fontSize.6xl'),
        fontFamily: headingFontFamily,
      },
    },
    {
      name: 'h2',
      styles: {
        fontSize: theme('fontSize.5xl'),
        fontFamily: headingFontFamily,
      },
    },
    {
      name: 'h3',
      styles: {
        fontSize: theme('fontSize.4xl'),
        fontFamily: headingFontFamily,
      },
    },
    {
      name: 'h4',
      styles: {
        fontSize: theme('fontSize.3xl'),
        fontFamily: headingFontFamily,
      },
    },
    {
      name: 'h5',
      styles: {
        fontSize: theme('fontSize.2xl'),
        fontFamily: headingFontFamily,
      },
    },
    {
      name: 'h6',
      styles: {
        fontSize: theme('fontSize.xl'),
        fontFamily: headingFontFamily,
      },
    },
    {
      name: 'p',
      styles: {
        fontSize: theme('fontSize.base'),
      },
    },
  ];

  typography.forEach((type) => {
    addBase({
      [type.name]: type.styles,
    });

    addUtilities({
      [`.text-${type.name}`]: type.styles,
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
    'a:hover, a:active, a:focus, a.active': {
      fontWeight: 'bold',
    },
  });

  addUtilities({
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
