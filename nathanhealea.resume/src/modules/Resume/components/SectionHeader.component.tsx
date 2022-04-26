// --- Imports --- //
import React from 'react';
/**
 * SectionHeader Interface
 */
interface ISectionHeaderProps { 
  children: React.ReactNode;
}
 
/**
 * SectionHeader Component
 */
const SectionHeader = (props:ISectionHeaderProps) => {

  return (<h3 className='relative pl-4 mb-2 text-lg font-bold tracking-widest uppercase text-slate-700 before:w-2 before:h-full before:bg-slate-700 before:absolute before:top-0 before:left-0 '>{props.children}</h3>);
}

// Default Return
export default SectionHeader;