import clsx from 'clsx';
import { HTMLAttributes } from 'react';

export interface SectionProps extends HTMLAttributes<'main'> {
  as?: 'div' | 'section' | 'header' | 'footer';
}

const Section = (props: SectionProps) => {
  const { as: Component = 'div', className, children } = props;

  return <Component className={clsx('section', className)}>{children}</Component>;
};

export default Section;
