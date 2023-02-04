import classname from 'classnames';
import Image from 'next/image';
import { FC } from 'react';

enum SizeEnum {
  xs = 0.5,
  sm = 1,
  md = 2,
  lg = 3,
  xl = 4,
}

interface LogoProps {
  size?: keyof typeof SizeEnum | undefined;
  animate?: boolean | undefined;
  className?: string | undefined;
}

const Logo: FC<LogoProps> = (props) => {
  const { size = 'lg', animate, className } = props;

  const width = SizeEnum[size] * 16;
  const height = SizeEnum[size] * 16 * 2;

  return (
    <Image
      src='/images/nathan-healea-logo.svg'
      alt='Nathan Healea Logo'
      height={height}
      width={width}
      className={classname(
        {
          'hover:flip-vertical-ltr cursor-pointer': animate,
        },
        className
      )}
    />
  );
};

Logo.defaultProps = {
  size: 'lg',
  animate: true,
};

export default Logo;
