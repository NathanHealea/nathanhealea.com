import clsx from 'clsx';
import { HTMLAttributes } from 'react';

export interface SectionContentProps extends HTMLAttributes<'main'> {}

const SectionContent = (props: SectionContentProps) => {
  const { className, children } = props;

  return <div className={clsx('section__content', className)}>{children}</div>;
};

export default SectionContent;
