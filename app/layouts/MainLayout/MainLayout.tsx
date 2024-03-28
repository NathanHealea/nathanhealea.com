import { ReactNode } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import { routes, Route } from '~/routes.config';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = (props: MainLayoutProps) => {
  const { children } = props;
  return (
    <>
      <Header>
        <Navigation>
          {routes.map((route: Route) => {
            return (
              <Link key={uuid()} to={route.getPath()}>
                {route.title}
              </Link>
            );
          })}
        </Navigation>
      </Header>
      <div className='h-24 ' />
      {children}
    </>
  );
};

export default MainLayout;
