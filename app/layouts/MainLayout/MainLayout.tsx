import { ReactNode } from 'react';
import Header from './components/Header';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = (props: MainLayoutProps) => {
  const { children } = props;
  return (
    <>
      <Header />
      <div className="h-24 " />
      {children}
    </>
  );
};

export default MainLayout;
