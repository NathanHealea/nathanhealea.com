import '../styles/main.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { faCopyright } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import GoogleAnalytics from 'components/GoogleAnalytics';
import { Logo } from 'components/Logo';
import { Metadata } from 'next';
import Link from 'next/link';
import { FC, ReactNode } from 'react';

config.autoAddCss = false;

interface LayoutProps {
  children: ReactNode;
}

const DEFAULT_TITLE =
  'Nathan Healea - Full Stack Developer & Software Engineer';
const DEFAULT_DESCRIPTION =
  'Experienced Full Stack Developer, engineering solutions in healthcare, fiance, and education. Passion for transforming ideas into feature rich applications.';
const DEFAULT_SITE_COLOR = '#f8f9fa';

export const metadata: Metadata = {
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  themeColor: DEFAULT_SITE_COLOR,
  // manifest: '',
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    site: '@nathanhealea',
    siteId: '2654889620',
    creator: '@nathanhealea',
    creatorId: '2654889620',
    images: [], // TODO: find photos for my twitter card,
  },
  openGraph: {
    type: 'website',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: 'https://nathanhealea.com',
    images: [], // TODO: find images for my open Graph.
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  other: {
    'msapplicatoin-Title-Color': DEFAULT_SITE_COLOR,
  },
};

const Layout: FC<LayoutProps> = (props) => {
  const { children } = props;

  return (
    <html lang='en' className='dark scroll-smooth'>
      <GoogleAnalytics gaTrackingID={process.env.GOOGLE_ANALYTICS} />
      <body className='flex flex-col min-h-screen w-ful'>
        <header className=' bg-gradient-rainbow'>
          <div className='w-full bg-white text-white-content dark:bg-black dark:text-black-content mb-1'>
            <div className='content flex flex-row items-center h-32 py-0'>
              <div className='flex flex-row items-center gap-x-4'>
                <Link href='/'>
                  <Logo />
                </Link>
              </div>
              <nav className='flex-1 gap-x-4 justify-end items-center flex'>
                <Link
                  href='/'
                  className='hover:text-strawberry hover:underline  hover:underline-offset-8 transition-all duration-300 ease-in-out'
                >
                  Home
                </Link>
                {/* <Link
                href='/projects'
                className='hover:text-apricot hover:underline hover:underline-offset-8 transition-all duration-300 ease-in-out'
              >
                Projects
              </Link> */}
                {/* <Link
                href='/Notebook'
                className='hover:text-lemon hover:underline hover:underline-offset-8 transition-all duration-300 ease-in-out'
              >
                Notebook
              </Link> */}
                {/* <Link href='/Resume'>Resume</Link> */}
                {/* <Link href='/lets-connect' className='btn btn-outlined btn-plum'>
              Lets Connect
            </Link> */}
              </nav>
            </div>
          </div>
        </header>
        {children}
        <footer className=''>
          <div className='content flex flex-col items-center text-center'>
            <p className='p-2'>
              Copyright <FontAwesomeIcon icon={faCopyright} />{' '}
              {new Date().getFullYear()} Nathan Healea
            </p>
            <p className='p-2'>Built with TailwindCSS, NextJS, &amp; ❤️</p>
          </div>
        </footer>
      </body>
    </html>
  );
};

export default Layout;
