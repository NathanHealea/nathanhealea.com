import clsx from 'clsx';
import { HTMLAttributes } from 'react';

export interface SectionFooterProps extends HTMLAttributes<HTMLDivElement> {}

const SectionFooter = (props: SectionFooterProps) => {
  const { children, className, ...rest } = props;

  return (
    <div className={clsx('section__footer', className)} {...rest}>
      {children}
    </div>
  );
};

export default SectionFooter;
