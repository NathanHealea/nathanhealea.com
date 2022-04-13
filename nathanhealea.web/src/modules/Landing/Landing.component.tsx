// --- Imports --- //
import React from 'react';
import AboutMe from './Sections/AboutMe.component';
import Contact from './Sections/Contact.component';
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
      <Contact />
    </>
  );
}

// Default Return
export default Landing;