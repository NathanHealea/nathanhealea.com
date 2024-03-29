import clsx from 'clsx';
import { HTMLAttributes } from 'react';

export interface SectionTitleProps extends HTMLAttributes<HTMLDivElement> {}

const SectionTitle = (props: SectionTitleProps) => {
  const { children, className, ...rest } = props;

  return (
    <div className={clsx('section__title', className)} {...rest}>
      {children}
    </div>
  );
};

export default SectionTitle;
