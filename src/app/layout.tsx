import '../styles/globals.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';

import { FC, ReactNode } from 'react';

config.autoAddCss = false;

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = (props) => {
  const { children } = props;

  return (
    <html lang='en'>
      <body className='flex flex-col min-h-screen'>
        {children}
      </body>
    </html>
  );
};

export default Layout;
