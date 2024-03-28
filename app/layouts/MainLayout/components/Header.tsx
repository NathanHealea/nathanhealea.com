import clsx from 'clsx';
import { ComponentProps } from 'react';

export interface HeaderProps extends ComponentProps<'header'> {}

const Header = (props: HeaderProps) => {
  const { children, className, ...rest } = props;

  return (
    <header className={clsx('fixed	flex h-24 w-full items-center justify-center px-8', className)} {...rest}>
      {children}
    </header>
  );
};

export default Header;
