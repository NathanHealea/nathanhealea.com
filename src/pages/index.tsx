import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
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
      <main className='flex flex-col items-center justify-center min-h-screen '>
        <div>
          <h1>Nathan Healea.com</h1>
        </div>
      </main>
    </>
  );
}
