// --- Imports --- //
import React from 'react';
/**
 * ListItem Interface
 */
interface IListItemProps {
  children: React.ReactNode | Array<React.ReactNode>;
}

/**
 * ListItem Component
 */
const ListItem = (props: IListItemProps) => {
  return <li className='mb-2 text-xs'>{props.children}</li>;
};

// Default Return
export default ListItem;
