// --- Imports --- //
import React from 'react';
import { Disclosure } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faFileLines,
  faTimes,
  faUser
} from '@fortawesome/free-solid-svg-icons';
import { AnchorLink } from 'gatsby-plugin-anchor-links';

import { useWindowDimensions, up } from '../../theme';

import ProfilePictureCasual from '../../images/profile-picture-v3.jpg';
import {
  faGithubAlt,
  faInstagram,
  faLinkedinIn
} from '@fortawesome/free-brands-svg-icons';

/**
 * MainLayout Interface
 */
interface IMainLayoutProps extends React.HtmlHTMLAttributes<HTMLElement> {}

/**
 * MainLayout Component
 */
const MainLayout = (props: IMainLayoutProps) => {
  const { width, height } = useWindowDimensions();

  return (
    <>
      <Disclosure
        as='nav'
        className='static md:fixed md:top-0 md:left-0 w-full md:w-60 h-auto md:h-screen p-4 md:p-0 text-center text-white bg-gray-800'>
        {({ open }) => (
          <>
            {/* Navbar header */}
            <div className='flex items-center relative'>
              <Disclosure.Button className='md:hidden absolute inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
                <span className='sr-only'>Open main menu</span>
                {open ? (
                  <FontAwesomeIcon icon={faTimes} />
                ) : (
                  <FontAwesomeIcon icon={faBars} />
                )}
              </Disclosure.Button>

              {/* Navbar Title */}
              <div className='flex-grow text-center'>
                <h1 className='font-bold text-2xl mb-0 md:pt-4'>
                  Nathan Healea
                </h1>
              </div>
            </div>

            <Disclosure.Panel static={up('md', width)}>
              <div className='p-6'>
                {/* Profile Picture */}
                <img
                  src={ProfilePictureCasual}
                  alt='Casual Profile Picture of Nathan Healea'
                  className='rounded-lg w-40 h-40 mx-auto mb-3'
                />

                {/* Profile Bio */}
                <div className='text-sm mb-3'>
                  I'm Nathan Healea, thank you for visiting. I am a Software
                  Engineer and Full Stack developer. Make sure to check out my
                  GitHub, and Resume with the link below!
                </div>

                {/* Social Media Icon Links */}
                <div className='flex flex-row mx-auto justify-center mb-3'>
                  <a
                    href=''
                    className='bg-white text-gray-800 rounded-full h-8 w-8 flex justify-center items-center hover:bg-gray-300 mr-2'>
                    <FontAwesomeIcon icon={faLinkedinIn} />
                  </a>
                  <a
                    href=''
                    className='bg-white text-gray-800 rounded-full h-8 w-8 flex justify-center items-center hover:bg-gray-300 mr-2'>
                    <FontAwesomeIcon icon={faGithubAlt} />
                  </a>
                  <a
                    href=''
                    className='bg-white text-gray-800 rounded-full h-8 w-8 flex justify-center items-center hover:bg-gray-300 mr-2'>
                    <FontAwesomeIcon icon={faInstagram} />
                  </a>
                </div>

                {/* Divider */}
                <hr className='opacity-60 mb-3' />

                {/* Navigation Links */}
                <div className='flex flex-col justify-center items-center '>
                  <AnchorLink
                    to='/'
                    className=' flex justify-center rounded-lg w-40 py-2 px-4 mb-3 hover:bg-gray-600 bg-gray'
                    gatsbyLinkProps={{
                      activeClassName: 'bg-gray-700'
                    }}>
                    About
                  </AnchorLink>
                  <AnchorLink
                    to='/resume'
                    className=' flex justify-center rounded-lg w-40 py-2 px-4 mb-3 hover:bg-gray-600'
                    gatsbyLinkProps={{
                      activeClassName: 'bg-gray-700'
                    }}>
                    Resume
                  </AnchorLink>
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      {/* Main Wrapper */}
      <main className='ml-0 md:ml-60'>
        {props.children}
      </main>
    </>
  );
};

// Default Return
export default MainLayout;
