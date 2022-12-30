const Color = require('color');

const createButton = (name, color, e) => {
  const button = {
    [`.btn-${name}`]: {
      color: color.DEFAULT,
      '&:hover, &:active, &:focus, &.active': {
        backgroundColor: Color(color.DEFAULT).alpha(0.2).hsl().toString(),
      },
    },
    [`.btn-contained.btn-${name}`]: {
      backgroundColor: color.DEFAULT,
      color: color.content,
    },
    [`.btn:hover.btn-contained.btn-${name}, .btn:active.btn-contained.btn-${name}, .btn:focus.btn-contained.btn-${name}, .btn.active.btn-contained.btn-${name}`]:
      {
        backgroundColor: color.dark,
        color: color.content,
      },
  };
  return button;
};

module.exports = createButton;
