import Link from 'next/link';
import { FC, ReactNode } from 'react';

interface MainLayoutProps {
  children?: ReactNode | undefined;
}

const MainLayout: FC<MainLayoutProps> = (props) => {
  const { children } = props;

  return (
    <>
      <header className='bg-white text-white-content sticky'>
        <div className=' flex flex-row justify-center items-center max-w-7xl mx-auto p-4 py-8'>
          <span className=' text-h4'>Nathan Healea</span>
          <nav className='flex-1 gap-x-4 justify-end items-center hidden lg:flex'>
            <Link href='/'>Home</Link>
            <Link href='/projects'>Projects</Link>
            <Link href='/'>Notebook</Link>
            <Link href='/'>Resume</Link>
            <Link href='/' className='btn btn-outlined btn-plum'>
              Lets Connect
            </Link>
          </nav>
        </div>
      </header>
      <main className='flex-1'>{children}</main>
      <footer className='bg-black text-black-content'>
        <div className=' flex flex-col justify-center items-center max-w-7xl mx-auto p-4 py-8 '>
          <p>Copyright &copy; {new Date().getFullYear()} Nathan Healea</p>
          <p>Built with LLamaUI, TailwindCSS, NextJS, &amp; ❤️</p>
        </div>
      </footer>
    </>
  );
};

export default MainLayout;
