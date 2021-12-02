import * as React from 'react';

// Layout Import

const PageElement = ({ element, props }) => {
  return <div {...props}>{element}</div>;
};

export default PageElement;
