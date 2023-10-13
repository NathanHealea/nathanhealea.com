'use client';

// import theme from '../../../packages/llamaui/src/theme';
import { Color } from './SimpleIcon.types';
import Image from 'next/image';
import { FC } from 'react';

type SafeNumber = number | `${number}`;

// const colors: { [key: string]: string } = Object.keys(theme.colors).reduce(
//   (colorsDic, currentColor: string) => {
//     const color = theme.colors[currentColor] as { [key: string]: string };
//     return {
//       ...colorsDic,
//       ...Object.keys(color).reduce(
//         (colorValueDic, currentColorValue: string) => {
//           const value = color[currentColorValue];

//           if (currentColorValue === 'DEFAULT') {
//             return {
//               ...colorValueDic,
//               [`${currentColor}`]: value.replace('#', ''),
//             };
//           }

//           return {
//             ...colorValueDic,
//             [`${currentColor}-${currentColorValue}`]: value.replace('#', ''),
//           };
//         },
//         {}
//       ),
//     };
//   },
//   {}
// );

const colors: { [key: string]: string } = {
  white: '',
  black: '',
  strawberry: '',
  apricot: '',
  lemon: '',
  apple: '',
  blueberry: '',
  plum: '',
  grape: '',
  peach: '',
};

interface SimpleIconProps {
  name: string;
  slug: string;
  color?: Color;
  width?: SafeNumber | undefined;
  height?: SafeNumber | undefined;
}

const SimpleIcon: FC<SimpleIconProps> = (props) => {
  const { name, slug, color = 'white', width = 32, height = 32 } = props;

  // console.log(colors);

  const getSimpleIconUrl = () => {
    const baseURL = 'https://cdn.simpleicons.org';

    console.log([baseURL, slug, colors[color]].join('/'));

    return [baseURL, slug, colors[color]].join('/');
  };

  return (
    <Image
      alt={`${name} Simple Icon`}
      src={getSimpleIconUrl()}
      width={width}
      height={height}
    />
  );
};

export default SimpleIcon;
