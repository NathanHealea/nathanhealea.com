import { Head } from 'components';
import Link from 'next/link';
import { FC, ReactNode } from 'react';

interface MainLayoutProps {
  children?: ReactNode | undefined;
}

const MainLayout: FC<MainLayoutProps> = (props) => {
  const { children } = props;

  return (
    <>
      <Head />

      <header className='bg-white text-white-content sticky'>
        <div className='flex flex-row justify-center items-center max-w-7xl mx-auto p-4 py-8'>
          <span className='text-h4'>Nathan Healea</span>
          <nav className='flex-1 gap-x-4 justify-end items-center flex'>
            {/* <Link href='/'>Home</Link> */}
            {/* <Link href='/projects'>Projects</Link> */}
            {/* <Link href='/Notebook'>Notebook</Link> */}
            {/* <Link href='/Resume'>Resume</Link> */}
            {/* <Link href='/lets-connect' className='btn btn-outlined btn-plum'>
              Lets Connect
            </Link> */}
          </nav>
        </div>
      </header>
      <main className='flex flex-1'>{children}</main>
      <footer className='bg-black text-black-content'>
        <div className=' flex flex-col justify-center items-center max-w-7xl mx-auto p-4 py-8 text-center'>
          <p className='p-2'>
            Copyright &copy; {new Date().getFullYear()} Nathan Healea
          </p>
          <p className='p-2'>
            Built with LLamaUI, TailwindCSS, NextJS, &amp; ❤️
          </p>
        </div>
      </footer>
    </>
  );
};

export default MainLayout;
