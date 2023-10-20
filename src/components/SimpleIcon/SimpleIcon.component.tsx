'use client';

// import theme from '../../../packages/llamaui/src/theme';
import { Color } from './SimpleIcon.types';
import Image from 'next/image';
import { FC } from 'react';

type SafeNumber = number | `${number}`;

const colors: { [key: string]: string } = {
  white: '',
  black: '',
  strawberry: 'FFADAD',
  apricot: 'FFBB72',
  lemon: 'FFF744',
  apple: '8DFD78',
  blueberry: '62EEFE',
  plum: 'A0C4FF',
  grape: 'BDB2FF',
  peach: 'FEA9FA',
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
