import { faCopyright } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Logo } from 'components/Logo';
import Link from 'next/link';
import { FC, ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = (props) => {
  const { children } = props;

  return (
    <html lang='en'>
      <body>
        <header className='nav bg-white text-white-content sticky'>
          <div className='content flex flex-row flex-center h-32 py-0'>
            <div className='flex flex-row flex-center gap-x-4'>
              <Link href='/'>
                <Logo />
              </Link>
            </div>
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
        <main className='flex flex-1 flex-col w-full'>{children}</main>
        <footer className='bg-black text-black-content'>
          <div className='content flex flex-col flex-center text-center'>
            <p className='p-2'>
              Copyright <FontAwesomeIcon icon={faCopyright} />{' '}
              {new Date().getFullYear()} Nathan Healea
            </p>
            <p className='p-2'>
              Built with LLamaUI, TailwindCSS, NextJS, &amp; ❤️
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
};

export default Layout;
