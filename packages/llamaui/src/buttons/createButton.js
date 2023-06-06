const Color = require('color');

const createButton = (name, color, e) => {
  const button = {
    // Button
    [`.btn-${name}`]: {
      color: color.DEFAULT,
      transition: 'all 0.25s ease-in-out',
      '&:hover, &:active, &:focus, &.active': {
        backgroundColor: Color(color.light).alpha(0.1).rgb().string(),
        color: color.dark,
      },
    },

    // Contained
    [`.btn-contained.btn-${name}`]: {
      backgroundColor: color.DEFAULT,
      color: color.content,
    },
    [`.btn:hover.btn-contained.btn-${name}, .btn:active.btn-contained.btn-${name}, .btn:focus.btn-contained.btn-${name}, .btn.active.btn-contained.btn-${name}`]:
      {
        backgroundColor: color.dark,
      },

    // Outlined
    [`.btn-outlined.btn-${name}`]: {
      borderColor: color.DEFAULT,
      color: color.DEFAULT,
    },
    [`.btn:hover.btn-outlined.btn-${name}, .btn:active.btn-outlined.btn-${name}, .btn:focus.btn-outlined.btn-${name}, .btn.active.btn-outlined.btn-${name} `]:
      {
        backgroundColor: Color(color.light).alpha(0.1).rgb().string(),
        color: color.dark,
      },
  };
  return button;
};

module.exports = createButton;
