import { faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import {
  faEnvelope,
  faFileLines,
  faFloppyDisk,
  faObjectGroup,
} from '@fortawesome/free-regular-svg-icons';
import {
  faBrain,
  faLaptopCode,
  faLayerGroup,
  faServer,
  faToolbox,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NextPage } from 'next';
import Image from 'next/image';

interface IndexPageProps {}

const IndexPage: NextPage<IndexPageProps> = (props) => {
  return (
    <>
      {/* <Head title="Hello! I'm an experienced full stack developer and software engineer" /> */}
      <main className='flex w-full flex-col'>
        {/* Hero */}
        <section
          id='hero'
          className='min-h-screen flex items-center justify-center md:-mt-32'
        >
          <div className='content flex flex-col-reverse md:flex-row items-center justify-center gap-y-8 gap-x-2'>
            <div className='flex flex-col flex-1 text-center md:text-start gap-4'>
              <h1 className='text-h2'>Hello,</h1>
              <h2 className='text-h1'>I&apos;m Nathan Healea</h2>
              <h3>Full Stack Developer &amp; Software Engineer</h3>
              {/* <div
              id='hero-actions'
              className='flex flex-col md:flex-row gap-y-4 my-4'
            >
              <a href='#whats-new' className='btn btn-contained btn-strawberry'>
                See what&apos;s new{' '}
                <FontAwesomeIcon
                  icon={faAnglesDown}
                  className=' fa-beat-fade'
                />
              </a>
            </div> */}
            </div>
            <div className='flex items-center justify-center'>
              <div className='bg-gradient-rainbow  p-1 lg:p-2 rounded-xl'>
                <img
                  className='rounded-md h-40 w-40 lg:h-80 lg:w-80'
                  src='/images/nathan-healea-profile-picture.jpg'
                  alt='Profile picture of Nathan Healea'
                  // height='320'
                  // width='320'
                />
              </div>
            </div>
          </div>
        </section>

        {/* Get To Know Me! */}
        <section id='get-to-know-me' className='my-32'>
          <div className='content flex flex-col gap-4'>
            <div className='mb-4 flex flex-col justify-center text-center md:justify-start md:text-start'>
              <h2>Get to know me!</h2>
              <p>The person I am.</p>
            </div>

            <p className=' text-center md:text-start'>
              I am a passionate and skilled software engineer with{' '}
              <span className=' text-strawberry'>
                over {new Date().getFullYear() - 2014} years of experience
              </span>{' '}
              of{' '}
              <span className='text-apricot'>
                full-stack web development in Healthcare, Higher Education, and
                Finance
              </span>
              . My expertise lies in building scalable and maintainable
              solutions using technologies such as{' '}
              <span className='text-lemon '>
                ReactJS, .Net, C#, and JavaScript
              </span>
              . I thrive on turning ideas into feature-rich applications and
              enjoy creating user interfaces that empower users, incorporating
              feedback and following industry-standard design patterns. My focus
              is always on creating intuitive and seamless user experiences that
              address user needs and provide value.
            </p>
            <p className=' text-center md:text-start'>
              <span className='text-apple'>Constant learning</span> is a driving
              force in my career, and I{' '}
              <span className='text-blueberry'>
                actively seek new challenges and opportunities
              </span>{' '}
              to expand my skills. I embrace the ever-evolving nature of
              software development and stay up-to-date with industry trends and
              technologies. This allows me to bring{' '}
              <span className='text-grape'>
                fresh perspectives and innovative solutions
              </span>{' '}
              to every project I undertake.
            </p>
            <p className=' text-center md:text-start'>
              I am a dedicated software engineer with a{' '}
              <span className='text-plum'>
                passion for delivering high-quality, user-centric applications
              </span>
              . With a track record of{' '}
              <span className='text-peach'>
                successfully collaborating with cross-functional teams and
                meeting project goals
              </span>
              , I bring a wealth of experience in full-stack web development. My
              commitment to continuous learning ensures that I am always ready
              to embrace new challenges and contribute to the dynamic field of
              software development.
            </p>

            <p className=' text-center md:text-start'>
              You can find me on{' '}
              <a
                href='https://github.com/NathanHealea'
                target='_blank'
                rel='noreferrer'
                className='hover:text-strawberry hover:underline  hover:underline-offset-8 transition-all duration-300 ease-in-out '
              >
                Github
              </a>{' '}
              &amp;{' '}
              <a
                href='https://www.linkedin.com/in/nathanhealea'
                target='_blank'
                rel='noreferrer'
                className='hover:text-apricot hover:underline  hover:underline-offset-8 transition-all duration-300 ease-in-out'
              >
                LinkedIn
              </a>
            </p>
          </div>
        </section>

        {/* What I'm Good At */}
        <section id='what-im-good-at' className='my-32'>
          <div className='content flex flex-col gap-4'>
            <div className='mb-4 flex flex-col justify-center text-center md:justify-end md:text-end'>
              <h2>What I&apos;m Good AT</h2>
              <p>The value and experience I bring.</p>
            </div>
            <div className='flex md:grid flex-col md:flex-row flex-wrap grid-cols-2  gap-8 my-8 '>
              <div className='flex flex-col md:flex-row gap-4 flex-1 items-center justify-center md:items-start md:justify-start text-center md:text-start'>
                <div>
                  <div className='flex items-center justify-center h-16 w-16 bg-strawberry text-strawberry-content rounded-md'>
                    <FontAwesomeIcon icon={faLayerGroup} size='2x' />
                  </div>
                </div>
                <div>
                  <h4>Full Stack Development</h4>
                  <p className='my-2'>
                    Frontend, Backend, Scripts, Programs, Services you name it I
                    have built or worked on it. My experience has covered a wide
                    range of frameworks, environments, libraries and more.
                  </p>
                </div>
              </div>

              <div className='flex flex-col md:flex-row gap-4 flex-1 items-center justify-center md:items-start md:justify-start text-center md:text-start'>
                <div>
                  <div className='flex items-center justify-center h-16 w-16 bg-apricot text-apricot-content rounded-md'>
                    <FontAwesomeIcon icon={faObjectGroup} size='2x' />
                  </div>
                </div>
                <div>
                  <h4>UI/UX Design</h4>
                  <p className='my-2'>
                    No one wants to use an application with a bad user interface
                    and experiences. That is why I develop and design
                    application from the end user perspective to ensure a
                    intuitive and familiar.
                  </p>
                </div>
              </div>

              <div className='flex flex-col md:flex-row gap-4 flex-1 items-center justify-center md:items-start md:justify-start text-center md:text-start'>
                <div>
                  <div className='flex items-center justify-center h-16 w-16 bg-lemon text-lemon-content  rounded-md'>
                    <FontAwesomeIcon icon={faBrain} size='2x' />
                  </div>
                </div>
                <div>
                  <h4>Problem Solving</h4>
                  <p className='my-2'>
                    I speak complex problems and can interpret non-technical.
                    Whether it&apos;s find a solution to an existing problem or
                    brainstorming new innovated ideas, I have collaborated and
                    implemented solutions that are future proof and
                    maintainable.
                  </p>
                </div>
              </div>

              <div className='flex flex-col md:flex-row gap-4 flex-1 items-center justify-center md:items-start md:justify-start text-center md:text-start'>
                <div>
                  <div className='flex items-center justify-center h-16 w-16 bg-apple text-apple-content  rounded-md'>
                    <FontAwesomeIcon icon={faFileLines} size='2x' />
                  </div>
                </div>
                <div>
                  <h4>Standardization</h4>
                  <p className='my-2'>
                    Too many stacks, tribal knowledge, clunky workflows? I have
                    worked with development teams and management to create
                    standards, processes, and documentation to improve the
                    software development life cycle.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technologies I Work With */}
        <section id='technologies-i-work-with' className='my-32'>
          <div className='content flex flex-col gap-4'>
            <div className='mb-4 flex flex-col justify-center text-center md:justify-start md:text-start'>
              <h2>Technologies I work with</h2>
              <p>The skill set I have</p>
            </div>
            <div className='flex md:grid flex-col md:flex-row flex-wrap grid-cols-2  gap-8 my-8 '>
              <div className='flex flex-col md:flex-row gap-4 flex-1 items-center justify-center md:items-start md:justify-start text-center md:text-start'>
                <div>
                  <div className='flex items-center justify-center h-16 w-16 bg-blueberry text-blueberry-content rounded-md'>
                    <FontAwesomeIcon icon={faLaptopCode} size='2x' />
                  </div>
                </div>
                <div>
                  <h4>Frontend</h4>
                  <ul className='flex flex-row flex-wrap gap-4 items-center justify-center md:items-start md:justify-start list-disc list-inside my-2'>
                    <li>Typescript</li>
                    <li>React</li>
                    <li>NextJS</li>
                    <li>Redux</li>
                    <li>TailwindCSS</li>
                    <li>SASS</li>

                    <li>HTML</li>
                    <li>CSS</li>
                  </ul>
                </div>
              </div>

              <div className='flex flex-col md:flex-row gap-4 flex-1 items-center justify-center md:items-start md:justify-start text-center md:text-start'>
                <div>
                  <div className='flex items-center justify-center h-16 w-16 bg-plum text-plum-content rounded-md'>
                    <FontAwesomeIcon icon={faServer} size='2x' />
                  </div>
                </div>
                <div>
                  <h4>Backend</h4>
                  <ul className='flex flex-row flex-wrap gap-4 items-center justify-center md:items-start md:justify-start list-disc list-inside my-2'>
                    <li>C#</li>
                    <li>.NET Core</li>
                    <li>PostgresSQL</li>
                    <li>Entity Framework Core</li>
                    <li>NodeJS</li>
                    <li>ExpressJS</li>
                    <li>ElectronJS</li>
                  </ul>
                </div>
              </div>

              <div className='flex flex-col md:flex-row gap-4 flex-1 items-center justify-center md:items-start md:justify-start text-center md:text-start'>
                <div>
                  <div className='flex items-center justify-center h-16 w-16 bg-grape text-grape-content  rounded-md'>
                    <FontAwesomeIcon icon={faToolbox} size='2x' />
                  </div>
                </div>
                <div>
                  <h4>Tools</h4>
                  <ul className='flex flex-row flex-wrap gap-4 items-center justify-center md:items-start md:justify-start list-disc list-inside my-2'>
                    <li>NPM</li>
                    <li>YARN</li>
                    <li>Git</li>
                    <li>Git Actions</li>
                    <li>Azure</li>
                    <li>Vercel</li>
                    <li>Docker</li>
                  </ul>
                </div>
              </div>

              <div className='flex flex-col md:flex-row gap-4 flex-1 items-center justify-center md:items-start md:justify-start text-center md:text-start'>
                <div>
                  <div className='flex items-center justify-center h-16 w-16 bg-peach text-peach-content  rounded-md'>
                    <FontAwesomeIcon icon={faFloppyDisk} size='2x' />
                  </div>
                </div>
                <div>
                  <h4>Software</h4>
                  <ul className='flex flex-row flex-wrap gap-4 items-center justify-center md:items-start md:justify-start list-disc list-inside my-2'>
                    <li>Jira</li>
                    <li>Confluence</li>
                    <li>Github</li>
                    <li>Figma</li>
                    <li>Illustrator</li>
                    <li>Photoshop</li>
                  </ul>
                </div>
              </div>
            </div>
            {/* <div className='flex items-center justify-center  flex-col text-center gap-8'>
            <h4>Want more details on my work experience?</h4>
            <Link href='/resume' className='btn btn-contained btn-blueberry'>
              <FontAwesomeIcon icon={faFileLines} /> View my Resume
            </Link>
          </div> */}
          </div>
        </section>

        {/* Lets Connect */}
        <section id='let-connect' className='my-32 p-2 bg-gradient-rainbow'>
          <div className='backdrop-blur-md bg-black/30 rounded'>
            <div className='content flex flex-col gap-4 '>
              <div className='mb-4 flex flex-col justify-center text-center items-center'>
                <h2>Lets Connect!</h2>
                <p>The collaboration I&apos;m looking for.</p>
              </div>
              <div className='flex flex-wrap md:flex-row items-center justify-center gap-4'>
                <a
                  href='https://github.com/NathanHealea'
                  target='_blank'
                  rel='noreferrer'
                  className='min-w-[8rem] rounded p-2 px-4 flex items-center  gap-4 transition-all ease-in-out duration-300 hover:text-strawberry hover:border-strawberry'
                >
                  <span className='h-9 w-9 flex justify-center items-center'>
                    <FontAwesomeIcon icon={faGithub} size='2x' />
                  </span>
                  <span className='flex grow justify-center items-center'>
                    Github
                  </span>
                </a>

                <a
                  href='https://www.linkedin.com/in/nathanhealea'
                  target='_blank'
                  rel='noreferrer'
                  className=' rounded p-2 px-4 flex items-center  gap-4 transition-all ease-in-out duration-300 hover:text-apricot hover:border-apricot'
                >
                  <span className='h-9 w-9 flex justify-center items-center'>
                    <FontAwesomeIcon icon={faLinkedinIn} size='2x' />
                  </span>
                  LinkedIn
                </a>

                <a
                  href='mailto:connect@nathanhealea.com'
                  target='_blank'
                  rel='noreferrer'
                  className=' rounded p-2 px-4 flex items-center gap-4 transition-all ease-in-out duration-300 hover:text-lemon hover:border-lemon'
                >
                  <span className='h-9 w-9 flex justify-center items-center'>
                    <FontAwesomeIcon icon={faEnvelope} size='2x' />
                  </span>
                  Email Me
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default IndexPage;
