import type { LinksFunction, MetaFunction } from '@remix-run/node';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useRouteError } from '@remix-run/react';

import stylesheet from '~/styles/global.css';
import MainLayout from './layouts/MainLayout/MainLayout';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: stylesheet }];

export function ErrorBoundary() {
  const error = useRouteError();
  return (
    <html lang='en'>
      <head>
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body className=''>
        <MainLayout>
          {/* add the UI you want your users to see */}
          <main className='page'>
            <section className='section items-center justify-center'>
              <div className='section__content text-center'>
                <h1>{error.status}</h1>
                <h2>{error.statusText}</h2>
              </div>
            </section>
          </main>
          <Scripts />
          <LiveReload />
        </MainLayout>
      </body>
    </html>
  );
}

export default function App() {
  return (
    <html lang='en' className='scrollbar-hide'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <Meta />
        <Links />
      </head>
      <body>
        <MainLayout>
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </MainLayout>
      </body>
    </html>
  );
}
