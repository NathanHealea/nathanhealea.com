import MainLayout from 'layouts/Main';
import { NextPage } from 'next.types';
import Head from 'next/head';

interface HomePageProps {}

const HomePage: NextPage<HomePageProps> = (props) => {
  return (
    <>
      <Head>
        <title>Nathan Healea - Full Stack Developer & Software Engineer</title>
        <meta
          name='description'
          content='Nathan Healea: Full Stack Developer and Software Engineer'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main></main>
    </>
  );
};

HomePage.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};

export default HomePage;
