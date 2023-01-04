import {
  faFileLines,
  faObjectGroup,
} from '@fortawesome/free-regular-svg-icons';
import {
  faAnglesDown,
  faLayerGroup,
  faSitemap,
} from '@fortawesome/free-solid-svg-icons';
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
              className='rounded-md'
              src='/images/nathan-healea-profile-picture.jpg'
              alt='Profile picture of Nathan Healea'
              height='320'
              width='320'
            />
          </div>
        </div>
      </header>

      <section id='about-me'>
        <div className='content text-center md:text-start'>
          <div className='text-title'>
            <h2>Get to know me!</h2>
            <p className='text-overline'>The person I am.</p>
          </div>

          <p className='my-2'>
            I am a React and .NET full stack developer with{' '}
            {new Date().getFullYear() - 2015} years of experience developing
            application in Healthcare, Finance, and Education.
          </p>
          <p className='my-2'>
            I am passionate about turing ideas into feature rich applications,
            improving user experiences, automating process, learning new
            technologies, and simplifying software development.
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

      <section id='what-im-good-at'>
        <div className='content'>
          <div className='text-title text-center md:text-right'>
            <h2 className=''>What I&apos;m Good AT</h2>
            <p className=' text-overline'>The value and experience I bring.</p>
          </div>
          <div className='flex md:grid flex-col md:flex-row flex-wrap grid-cols-2  gap-8 my-8 '>
            <div className='flex flex-col md:flex-row gap-4 flex-1 flex-center md:flex-start text-center md:text-start'>
              <div>
                <div className='flex flex-center h-16 w-16 bg-strawberry text-strawberry-content rounded-md'>
                  <FontAwesomeIcon icon={faLayerGroup} size='2x' />
                </div>
              </div>
              <div>
                <h4>Full Stack Developer</h4>
                <p className='py-2'>
                  Frontend, Backend, Scripts, Programs, Services you name it I
                  have built or have worked on it. My experience has covered a
                  wide range of frameworks, environments, libraries and more.
                </p>
              </div>
            </div>

            <div className='flex flex-col md:flex-row gap-4 flex-1 flex-center md:flex-start text-center md:text-start'>
              <div>
                <div className='flex flex-center h-16 w-16 bg-apricot text-apricot-content rounded-md'>
                  <FontAwesomeIcon icon={faObjectGroup} size='2x' />
                </div>
              </div>
              <div>
                <h4>UI/UX</h4>
                <p className='py-2'>
                  No one wants to use an application with a incomprehensible
                  user interface and experience. That is why I develop
                  applications from the user perspective ensuring a
                  comprehensible interface and empowering experience.
                </p>
              </div>
            </div>

            <div className='flex flex-col md:flex-row gap-4 flex-1 flex-center md:flex-start text-center md:text-start'>
              <div>
                <div className='flex flex-center h-16 w-16 bg-apple text-apple-content  rounded-md'>
                  <FontAwesomeIcon icon={faSitemap} size='2x' />
                </div>
              </div>
              <div>
                <h4>Architecture</h4>
                <p className='py-2'>
                  API, MVC, MVVM, CMS, Server less, Cloud oh my! Over the years
                  have collaborated and architected solutions to meet business
                  needs to while ensuring the maintainability of applications.
                </p>
              </div>
            </div>

            <div className='flex flex-col md:flex-row gap-4 flex-1 flex-center md:flex-start text-center md:text-start'>
              <div>
                <div className='flex flex-center h-16 w-16 bg-blueberry text-blueberry-content  rounded-md'>
                  <FontAwesomeIcon icon={faFileLines} size='2x' />
                </div>
              </div>
              <div>
                <h4>Standardization</h4>
                <p className='py-2'>
                  Too many stacks, tribal knowledge, clunky workflows? I have
                  worked with development teams and management to create
                  standards to improve the software development life cycle.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

HomePage.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};

export default HomePage;
