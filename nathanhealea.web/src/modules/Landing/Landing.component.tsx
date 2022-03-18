// --- Imports --- //
import React from 'react';
import AboutMe from './Sections/AboutMe.component';
/**
 * Landing Interface
 */
interface ILandingProps { }
 
/**
 * Landing Component
 */
const Landing = (props:ILandingProps) => {

  return (
    <>
      <AboutMe />
    </>
  );
}

// Default Return
export default Landing;