// --- Imports --- //
import React from 'react';
/**
 * MainLayout Interface
 */
interface IMainLayoutProps {
  children: React.ReactNode | Array<React.ReactNode>;
}

/**
 * MainLayout Component
 */
const MainLayout = (props: IMainLayoutProps) => {
  return (
    <div className='flex items-center justify-center min-h-screen h-100'>
      {props.children}
    </div>
  );
};

// Default Return
export default MainLayout;
