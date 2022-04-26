// --- Imports --- //
import React from 'react';
/**
 * SubSectionHeader Interface
 */
interface ISubSectionHeaderProps { 
  children: React.ReactNode
}
 
/**
 * SubSectionHeader Component
 */
const SubSectionHeader = (props:ISubSectionHeaderProps) => {

  return (<h5 className='mb-2 text-sm font-bold '>{props.children}</h5>);
}

// Default Return
export default SubSectionHeader;