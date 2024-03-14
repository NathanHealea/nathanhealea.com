import { type MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export const loader = async () => {
  const env = process.env.NODE_ENV;

  if (env !== 'development') {
    throw new Response(null, {
      status: 401,
      statusText: 'Not Authorized',
    });
  }

  return null;
};

const TypographySection = () => {
  return (
    <section className='flex flex-col gap-4'>
      <h2>Typography</h2>
      <div className='flex flex-col gap-8'>
        <h1>Heading 1</h1>
        <h2>Heading 2</h2>
        <h3>Heading 3</h3>
        <h4>Heading 4</h4>
        <h5>Heading 5</h5>
        <h6>Heading 6</h6>
        <p>Body</p>
        <a href='#'>Link</a>
        <button className='w-fit'>Button</button>
      </div>
    </section>
  );
};

const StylesPage = () => {
  return (
    <div className='flex w-full max-w-7xl grow flex-col gap-32 px-4'>
      <TypographySection />
    </div>
  );
};

export default StylesPage;
