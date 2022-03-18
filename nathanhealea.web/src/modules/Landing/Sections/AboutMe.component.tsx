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
    <section className='bg-gray-100'>
      <div className=' container mx-auto p-4 md:p-12'> 
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>

          {/* Left - About Me  */}
          <div className='flex flex-1 flex-col'>
            <h1 className='font-bold text-5xl mb-1'>Nathan Healea</h1>
            <p className=' text-2xl font-light mb-4'>Software Developer @ Maps <small className='text-sm'>Salem, Oregon</small></p>
            <p className='mb-6'>I'm a software engineer and full stack developer specializing in React and .Net Core applications. Want to know how I may help your project? Check out my <Link to="/" className=' text-gray-800 hover:text-gray-600 active:text-gray-700' > online resume</Link>.</p>
            <div className='mb-4'>
              <Link to="/resume" className="inline-block bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-600 active:bg-gray-700"><FontAwesomeIcon icon={faFileLines} className="mr-2" /> View Resume</Link>
            </div>
          </div>

          {/* Right - Profile Image */}
          <div className='flex md:justify-center items-center'>
            <img src={ProfilePicture} className='max-h-96 aspect-square rounded' />
          </div>
        </div>
      </div>
    </section>
  );
};

// Default Return
export default AboutMe;
