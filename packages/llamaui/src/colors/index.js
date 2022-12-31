const generateColor = require('./createColor');

const white = {
  DEFAULT: '#F8F9FA',
  content: '#212529',
};

const black = {
  DEFAULT: '#212529',
  content: '#F8F9FA',
};

const strawberry = generateColor('#FFADAD');
const apricot = generateColor('#FFD6A5');
const lemon = generateColor('#FDFFB6');
const apple = generateColor('#CAFFBF');
const blueberry = generateColor('#9BF6FF');
const plum = generateColor('#A0C4FF');
const grape = generateColor('#BDB2FF');
const peach = generateColor('#FFC6FF');

module.exports = {
  white,
  black,
  strawberry,
  apricot,
  lemon,
  apple,
  blueberry,
  plum,
  grape,
  peach,
};
