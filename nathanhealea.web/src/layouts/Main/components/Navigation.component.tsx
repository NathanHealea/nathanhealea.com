// --- Imports --- //
import React from 'react';
import { AnchorLink } from 'gatsby-plugin-anchor-links';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLinkedinIn,
  faGithubAlt,
  faInstagram
} from '@fortawesome/free-brands-svg-icons';
import {
  faBars,
  faFile,
  faHouse,
  faUser
} from '@fortawesome/free-solid-svg-icons';

import profilePicture from '../../../images/profile-picture-v3.jpg';

/**
 * Navigation Interface
 */
interface INavigation {}

/**
 * Navigation Default Properties
 */
const DefaultProps: INavigation = {};

/**
 * Navigation Component
 */
const Navigation = (props: INavigation = DefaultProps) => {
  return (
    <header className='header bg-primary text-white text-center'>
      <div className='force-overflow'>
        {/* Profile Name */}
        <h1 className='profile-name pt-md-4 mb-0'>Nathan Healea</h1>

        <nav className='navbar navbar-expand-md py-5 px-4'>
          {/* Navbar Toggler */}
          <button
            className='navbar-toggler text-white'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navigation'
            aria-controls='navigation'
            aria-expanded='false'
            aria-label='Toggle navigation'>
            <FontAwesomeIcon icon={faBars} />
          </button>

          <div id='navigation' className='navbar-collapse flex-column collapse'>
            {/* Profile Container */}
            <div className='profile-section pt-3 pt-md-0'>
              {/* Profile Image */}
              <img
                src={profilePicture}
                className='w-20 h-20 mb-3 rounded mx-auto'
              />

              {/* Profile Bio */}
              <div className='bio mb-3'>
                I'm Nathan Healea, thank you for visiting. I am a Software
                Engineer and Full Stack developer. Make sure to check out my
                GitHub, resume, and portfolio with the link below!
              </div>

              {/* Profile Social Media Links */}
              <ul className='social-list list-inline py-2 mx-auto'>
                <li className='list-inline-item'>
                  <a
                    href='https://www.linkedin.com/in/nathanhealea/'
                    target='_blank'
                    className=''>
                    <FontAwesomeIcon icon={faLinkedinIn} />
                  </a>
                </li>
                <li className='list-inline-item'>
                  <a
                    href='https://github.com/nathanhealea'
                    target='_blank'
                    className=''>
                    <FontAwesomeIcon icon={faGithubAlt} />
                  </a>
                </li>
                <li className='list-inline-item'>
                  <a
                    href='https://www.instagram.com/nathanhealea'
                    target='_blank'
                    className=''>
                    <FontAwesomeIcon icon={faInstagram} />
                  </a>
                </li>
              </ul>
              {/* ./profile-social-media-links */}

              {/* Divider */}
              <hr className='bg-white' />
            </div>
            {/* ./profile-container */}

            {/* Navigation Links */}
            <ul className='navbar-nav flex-column text-start'>
              <li className='nav-item'>
                <AnchorLink to='/' className='nav-link'>
                  <FontAwesomeIcon icon={faUser} className='me-2' />
                  About
                </AnchorLink>
              </li>

              <li className='nav-item'>
                <AnchorLink to='/' className='nav-link'>
                  <FontAwesomeIcon icon={faFile} className='me-2' />
                  Resume
                </AnchorLink>
              </li>
            </ul>
            {/* ./navigation-container */}
          </div>
          {/* ./navbar-collapse */}
        </nav>
      </div>
    </header>
  );
};

// Default Return
export default Navigation;
