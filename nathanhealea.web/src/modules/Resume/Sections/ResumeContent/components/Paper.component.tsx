// --- Imports --- //
import { NONAME } from 'dns';
import React, { useEffect } from 'react';
import { createUseStyles } from 'react-jss';
/**
 * Paper Interface
 */
interface IPaperProps {
  children: React.ReactNode | Array<React.ReactNode>;
}

/**
 * Paper Component
 */
const Paper = (props: IPaperProps) => {
  useEffect(() => {
    document.body.classList.add('letter');
  }, []);

  return (
    <div className='shadow-2xl'>
      <div className='m-12'>{props.children}</div>
    </div>
  );
};

// Default Return
export default Paper;
