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
        className='static w-full h-auto p-4 text-center text-white bg-gray-800 lg:fixed lg:top-0 lg:left-0 lg:w-80 lg:h-screen lg:p-0'>
        {({ open }) => (
          <>
            {/* Navbar header */}
            <div className='relative flex items-center'>
              <Disclosure.Button className='absolute inline-flex items-center justify-center p-2 text-gray-400 rounded lg:hidden hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
                <span className='sr-only'>Open main menu</span>
                {open ? (
                  <FontAwesomeIcon icon={faTimes} />
                ) : (
                  <FontAwesomeIcon icon={faBars} />
                )}
              </Disclosure.Button>

              {/* Navbar Title */}
              <div className='flex-grow text-center'>
                <h1 className='mb-0 text-2xl font-bold lg:pt-4'>
                  Nathan Healea
                </h1>
              </div>
            </div>

            <Disclosure.Panel static={up('lg', width)}>
              <div className='p-6'>
                {/* Profile Picture */}
                <img
                  src={ProfilePictureCasual}
                  alt='Casual Profile Picture of Nathan Healea'
                  className='w-40 h-40 mx-auto mb-3 rounded'
                />

                {/* Profile Bio */}
                <div className='mb-3 text-sm'>
                  I'm Nathan Healea, thank you for visiting. I am a Software
                  Engineer and Full Stack developer. Make sure to check out my
                  GitHub, and Resume with the link below!
                </div>

                {/* Social Media Icon Links */}
                <div className='flex flex-row justify-center mx-auto mb-3'>
                  <a
                    href=''
                    className='flex items-center justify-center w-8 h-8 mr-2 text-gray-800 bg-white rounded-full hover:bg-gray-300'>
                    <FontAwesomeIcon icon={faLinkedinIn} />
                  </a>
                  <a
                    href=''
                    className='flex items-center justify-center w-8 h-8 mr-2 text-gray-800 bg-white rounded-full hover:bg-gray-300'>
                    <FontAwesomeIcon icon={faGithubAlt} />
                  </a>
                  <a
                    href=''
                    className='flex items-center justify-center w-8 h-8 mr-2 text-gray-800 bg-white rounded-full hover:bg-gray-300'>
                    <FontAwesomeIcon icon={faInstagram} />
                  </a>
                </div>

                {/* Divider */}
                <hr className='mb-3 opacity-60' />

                {/* Navigation Links */}
                <div className='flex flex-col items-center justify-center '>
                  <AnchorLink
                    to='/'
                    className='flex justify-center w-40 px-4 py-2 mb-3 rounded  hover:bg-gray-600 bg-gray'
                    gatsbyLinkProps={{
                      activeClassName: 'bg-gray-700'
                    }}>
                    About
                  </AnchorLink>
                  <AnchorLink
                    to='/resume'
                    className='flex justify-center w-40 px-4 py-2 mb-3 rounded  hover:bg-gray-600'
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
      <main className='ml-0 lg:ml-80'>
        {props.children}
      </main>
    </>
  );
};

// Default Return
export default MainLayout;
