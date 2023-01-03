import { faAnglesDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Head } from 'components';
import MainLayout from 'layouts/Main';
import { NextPage } from 'next.types';
import Image from 'next/image';
import Link from 'next/link';

interface HomePageProps {}

const HomePage: NextPage<HomePageProps> = (props) => {
  return (
    <>
      <Head title="Hello! I'm an experienced full stack developer and software engineer" />
      <header
        id='hero'
        className='w-full min-h-screen flex justify-center items-center -mt-32'
      >
        <div className='max-w-7xl mx-auto p-4 py-8 flex flex-col md:flex-row justify-center items-center gap-8'>
          <div>
            <h2>Hello,</h2>
            <h1>I&apos;m Nathan Healea</h1>
            <h3>Full Stack Developer &amp; Software Engineer</h3>
            <div
              id='hero-actions'
              className='flex flex-col md:flex-row  gap-4 my-4'
            >
              <a href='#whats-new' className='btn btn-contained btn-strawberry'>
                See what&apos;s new{' '}
                <FontAwesomeIcon
                  icon={faAnglesDown}
                  className=' fa-beat-fade'
                  style={{ ['--fa-animation-duration']: '3s' }}
                />
              </a>
            </div>
          </div>
          <div className='flex justify-center items-center'>
            <Image
              className='rounded-lg'
              src='/images/nathan-healea-profile-picture.jpg'
              alt='Profile picture of Nathan Healea'
              height='320'
              width='320'
            />
          </div>
        </div>
      </header>
    </>
  );
};

HomePage.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};

export default HomePage;
