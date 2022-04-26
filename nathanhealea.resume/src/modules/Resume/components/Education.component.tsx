// --- Imports --- //
import React from 'react';
/**
 * Education Interface
 */
interface IEducationProps { 
  title: string,
  institution: string
}
 
/**
 * Education Component
 */
const Education = (props:IEducationProps) => {

  return (
    <div className='mb-2'>
      <h6 className='text-xs font-bold'>{props.title}</h6>
      <p className='text-xs text-gray-800'>{props.institution}</p>
  </div>
  );
}

// Default Return
export default Education;