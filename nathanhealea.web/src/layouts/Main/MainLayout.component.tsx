// --- Imports --- //
import * as React from 'react';
import { IBaseComponent } from '../../types';
import Navigation from './components/Navigation.component';

/**
 * MainLayout Interface
 */
interface IMainLayout extends IBaseComponent {}

/**
 * MainLayout Default Properties
 */
const DefaultProps: IMainLayout = {};

/**
 * MainLayout Component
 */
const MainLayout = (props: IMainLayout = DefaultProps) => {
  return (
    <>
        {/* Navigation */}
        <Navigation />

        {/*  Main */}
        <main className='main-wrapper'>
          {props.children}
        </main>
    </>
  );
};

// Default Return
export default MainLayout;
