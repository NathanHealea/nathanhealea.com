import type { LinksFunction } from '@remix-run/node';
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from '@remix-run/react';

import stylesheet from '~/styles/global.css';
import Page from './components/Page';
import Section, { SectionBody, SectionTitle } from './components/Section';
import SectionContent from './components/Section/SectionContent';
import MainLayout from './layouts/MainLayout/MainLayout';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet },
];

export function ErrorBoundary() {
  const error = useRouteError();
  return (
    <html lang="en">
      <head>
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body className="min-width-[360px]">
        <MainLayout>
          {/* add the UI you want your users to see */}
          <Page>
            <Section as="header">
              <SectionContent className=" flex flex-col items-center justify-center gap-8 text-center">
                <SectionTitle>
                  <h1>Well this is awkward 😳</h1>

                  {error.status === 404 && (
                    <h2 className="text-h4">
                      It appears I have not created the page you are looking
                      for.
                    </h2>
                  )}
                </SectionTitle>
                <SectionBody className="flex-col items-center justify-center gap-4">
                  <h3>Lets try one of these links ⛛</h3>
                  <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
                    <Link to={'/'} className="btn btn-ghost max-w-fit">
                      Home
                    </Link>
                    <Link to={'/projects'} className="btn btn-ghost max-w-fit">
                      Projects
                    </Link>
                    <Link
                      to={'/work-experience'}
                      className="btn btn-ghost max-w-fit"
                    >
                      Work Experience
                    </Link>
                    <Link to={'/skills'} className="btn btn-ghost max-w-fit">
                      Skills
                    </Link>
                  </div>
                </SectionBody>
              </SectionContent>
            </Section>
          </Page>
          <Scripts />
          <LiveReload />
        </MainLayout>
      </body>
    </html>
  );
}

export default function App() {
  return (
    <html lang="en" className="scrollbar-hide">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="min-width-[360px]">
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
