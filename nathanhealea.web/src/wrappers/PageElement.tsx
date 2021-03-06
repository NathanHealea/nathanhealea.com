import * as React from 'react';
import MainLayout from '../layouts/MainLayout/MainLayout.component';

// Layout Import

const PageElement = ({ element, props }) => {
  return <MainLayout {...props}>{element}</MainLayout>;
};

export default PageElement;
