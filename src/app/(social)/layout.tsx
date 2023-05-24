import { FC, ReactNode } from 'react';

interface SocialLayoutProps {
  children: ReactNode;
}

const SocialLayout: FC<SocialLayoutProps> = (props) => {
  const { children } = props;

  return (
    <html lang='en'>
      <body className='flex justify-center items-center min-h-screen'>
        {children}
      </body>
    </html>
  );
};

export default SocialLayout;
