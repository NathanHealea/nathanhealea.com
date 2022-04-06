// --- Imports --- //
import React from 'react';
import AboutMe from './Sections/AboutMe.component';
import Skills from './Sections/Skills.component';
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
      <Skills />
    </>
  );
}

// Default Return
export default Landing;