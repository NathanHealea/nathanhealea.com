// --- Imports --- //
import { faFileLines } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'gatsby';
import React from 'react';

import ProfilePicture from '../../../images/profile-picture-v4.jpg';

/**
 * AboutMe Interface
 */
interface IAboutMeProps {}

/**
 * AboutMe Component
 */
const AboutMe = (props: IAboutMeProps) => {
  return (
    <section className='flex items-center h-full min-h-[450px] bg-gray-100'>
      <div className='container p-4 mx-auto md:p-12'>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          {/* Left - About Me  */}
          <div className='flex items-center h-full align-center'>
            <div className='flex flex-col'>
              <h1 className='mb-1 text-5xl font-bold'>Nathan Healea</h1>
              <p className='mb-4 text-2xl font-light '>
                Software Developer @ Maps{' '}
                <small className='text-sm'>Salem, Oregon</small>
              </p>
              <p className='mb-6'>
                I'm a software engineer and full stack developer specializing in
                React and .Net Core applications. Want to know how I may help
                your project? 
                Check out my{' '}
                <Link
                  to='/resume'
                  className='text-gray-800 hover:text-gray-600 active:text-gray-700'>
                  online resume
                </Link>
                .
              </p>
              <div className='mb-4'>
                <Link
                  to='/resume'
                  className='inline-block px-4 py-2 text-white bg-gray-800 rounded hover:bg-gray-600 active:bg-gray-700'>
                  <FontAwesomeIcon icon={faFileLines} className='mr-2' /> View
                  Resume
                </Link>
              </div>
            </div>
          </div>

          {/* Right - Profile Image */}
          <div className='flex items-center md:justify-center'>
            <img
              src={ProfilePicture}
              className='rounded max-h-96 aspect-square'
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// Default Return
export default AboutMe;
