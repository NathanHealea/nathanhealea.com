import Image from 'next/image';
import { FC, useEffect, useState } from 'react';


interface LogoProps {
}


const Logo: FC<LogoProps> = (props) => {

  return (
    <Image
      src='/images/nathan-healea-logo.svg'
      alt='Nathan Healea Logo'
      height={96}
      width={48}
    />
  );
};

export default Logo;
