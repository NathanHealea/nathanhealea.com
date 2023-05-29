import Image from 'next/image';
import { FC, useEffect, useState } from 'react';

interface LogoProps {}

const Logo: FC<LogoProps> = (props) => {
  return (
    <Image
      className='h-[64px] w-[64px]'
      src='/images/nathan-healea-logo.png'
      alt='Nathan Healea Logo'
      height={1024}
      width={1024}
    />
  );
};

export default Logo;
