import { faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Head } from 'components';
import MainLayout from 'layouts/Main';
import { NextPage } from 'next.types';

interface HomePageProps {}

const HomePage: NextPage<HomePageProps> = (props) => {
  return (
    <>
      <Head title="Hello! I'm an experienced full stack developer and software engineer" />
      <header className='flex flex-1 flex-col justify-center items-center '>
        <div className='max-w-7xl mx-auto p-4 py-8 text-center '>
          <h2>Hello,</h2>
          <h1>I&apos;m Nathan Healea</h1>
          <h3>Full Stack Developer &amp; Software Engineer</h3>
          <p className='p-2'>
            Like with most personal projects of a passionate developer, my
            website is not finished 😭.
          </p>
          <p className='p-2'>
            However, I&apos;m always happy to connect and collaborate anytime!
          </p>

          <h5 className='p-2'>So, Lets Connect!</h5>
          <div className='flex flex-row justify-center items-center space-x-2 '>
            <a
              href='https://github.com/NathanHealea'
              target='_blank'
              rel='noreferrer'
              className='btn btn-square btn-outlined btn-blueberry h-8 w-8 flex justify-center items-center '
            >
              <FontAwesomeIcon icon={faGithub} size='1x' />
            </a>
            <a
              href='https://www.linkedin.com/in/nathanhealea'
              target='_blank'
              rel='noreferrer'
              className='btn btn-square btn-outlined btn-plum  h-8 w-8 flex justify-center items-center '
            >
              <FontAwesomeIcon icon={faLinkedinIn} size='1x' />
            </a>

            <a
              href='mailto:contact@nathanhealea.com'
              className='btn btn-square btn-outlined btn-grape  h-8 w-8 flex justify-center items-center '
            >
              <FontAwesomeIcon icon={faEnvelope} size='1x' />
            </a>
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
