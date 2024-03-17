import clsx from 'clsx';
import { HTMLAttributes } from 'react';

export interface PageProps extends HTMLAttributes<'main'> {}

const Page = (props: PageProps) => {
  const { className, children } = props;

  return <main className={clsx('page', className)}>{children}</main>;
};

export default Page;
