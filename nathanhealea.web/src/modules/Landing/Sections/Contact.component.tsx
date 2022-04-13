// --- Imports --- //
import {
  faGithubAlt,
  faInstagram,
  faLinkedinIn
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
/**
 * Contact Interface
 */
interface IContactProps {}

/**
 * Contact Component
 */
const Contact = (props: IContactProps) => {
  return (
    <section className='flex items-center text-center text-white bg-slate-500 min-h-[450px]'>
      <div className='content-center p-4 mx-auto md:p-12'>
        <h2 className='mb-4 text-4xl font-bold'>Lets Chat!</h2>
        <p className='mb-4'>
          Interested in hiring me for your project or just want to say hi? Send
          me an email to{' '}
          <a
            href='mailto:contact@nathanhealea.com'
            className='text-gray-800 hover:text-gray-600 active:text-gray-800'>
            contact@nathanhealea.com
          </a>
        </p>

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
      </div>
    </section>
  );
};

// Default Return
export default Contact;
