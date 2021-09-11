// --- Imports --- //
import * as React from 'react';
import { IBaseComponent } from '../../types';
/**
 * Main Interface
 */
interface IMain extends IBaseComponent{ }
 
/**
 * Main Default Properties
 */
const DefaultProps: IMain = { }
 
/**
 * Main Component
 */
const Main = (props:IMain = DefaultProps) => {

  return (
    <>
    {props.children}
    </>
  );
}

// Default Return
export default Main;