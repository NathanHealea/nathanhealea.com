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
      <header id='hero' className='min-h-screen flex flex-center -mt-32'>
        <div className='content flex flex-col-reverse md:flex-row flex-center gap-y-8'>
          <div className='flex-1 text-center md:text-start'>
            <h2>Hello,</h2>
            <h1>I&apos;m Nathan Healea</h1>
            <h3>Full Stack Developer &amp; Software Engineer</h3>
            <div
              id='hero-actions'
              className='flex flex-col md:flex-row gap-y-4 my-4'
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
          <div className='flex flex-center'>
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
      <section id='about-me'>
        <div className='content'>
          <h2>About Me</h2>
          <p className='my-2'>
            I have over {new Date().getFullYear() - 2015} years of experience
            developing application the Healthcare, Finance, and Education.
          </p>
          <p className='my-2'>
            I am passionate about turing ideas into feature rich applications,
            improving user experiences, learning new technologies, and
            simplifying software development.
          </p>
          <p className='my-2'>
            You can find me on{' '}
            <a
              href='https://github.com/NathanHealea'
              target='_blank'
              rel='noreferrer'
            >
              Github
            </a>{' '}
            &amp;{' '}
            <a
              href='https://www.linkedin.com/in/nathanhealea'
              target='_blank'
              rel='noreferrer'
            >
              LinkedIn
            </a>
          </p>
        </div>
      </section>
    </>
  );
};

HomePage.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};

export default HomePage;
