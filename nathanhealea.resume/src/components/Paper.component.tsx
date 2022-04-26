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

  return <div className='sheet p-[10mm] print:p-0 m-[10mm] print:pb-[25mm]'>{props.children}</div>;
};

// Default Return
export default Paper;
