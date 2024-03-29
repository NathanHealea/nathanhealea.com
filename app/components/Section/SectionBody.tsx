import clsx from 'clsx';
import { HTMLAttributes } from 'react';

export interface SectionBodyProps extends HTMLAttributes<HTMLDivElement> {}

const SectionBody = (props: SectionBodyProps) => {
  const { className, children } = props;

  return <div className={clsx('section__body', className)}>{children}</div>;
};

export default SectionBody;
