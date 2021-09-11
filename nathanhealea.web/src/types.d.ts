import React from 'react';

/**
 * Base Component Interface
 */
export interface IBaseComponent {
  children?: React.ReactNode | React.ReactNodeArray
  className?: string
}