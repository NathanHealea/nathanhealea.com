import type { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

const IndexPage = () => {
  return (
    <>
      <h1>Nathan Healea.com</h1>
    </>
  );
};

export default IndexPage;
