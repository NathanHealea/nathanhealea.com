// --- Imports --- //
import React from 'react';

import classNames from 'classnames';
/**
 * List Interface
 */
interface IListProps {
  children: React.ReactNode | Array<React.ReactNode>;
  className?: string | Array<string>;
}

/**
 * List Component
 */
const List = (props: IListProps) => {
  return <ul className={classNames('text-gray-600', props.className)}>{props.children}</ul>;
};

// Default Return
export default List;
