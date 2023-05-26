import '../styles/globals.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { faCopyright } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Logo } from 'components/Logo';
import { Metadata } from 'next';
import Link from 'next/link';
import { FC, ReactNode } from 'react';

config.autoAddCss = false;

interface LayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: 'Nathan Healea - Full Stack Developer & Software Engineer',
  description:
    'Experienced Full Stack Developer, engineering solutions in healthcare, fiance, and education. Passion for transforming ideas into feature rich applications.',
    themeColor: '#f8f9fa',
    // manifest: '',
    // twitter: {
    //   card: 'summary_large_image',
    //   title: 'Next.js',
    //   description: 'The React Framework for the Web',
    //   siteId: '1467726470533754880',
    //   creator: '@nextjs',
    //   creatorId: '1467726470533754880',
    //   images: ['https://nextjs.org/og.png'],
    // },
    viewport: {
      width: 'device-width',
      initialScale: 1,
      maximumScale: 1,
    },
    other: {
      'msapplicatoin-Title-Color': '#f8f9fa' 
    }
};


const Layout: FC<LayoutProps> = (props) => {
  const { children } = props;

  return (
    <html lang='en'>
      <body className='flex flex-col min-h-screen w-ful'>
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
        {children}
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
