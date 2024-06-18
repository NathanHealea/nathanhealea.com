import { SiGithub, SiLinkedin } from '@icons-pack/react-simple-icons';
import { Link } from '@remix-run/react';
import Section, { SectionSection } from '~/components/Section';

import profilePicture from '~/images/nathan-healea-profile-picture.jpg';

interface AboutMeSectionProps {}

const AboutMeSection = (pros: AboutMeSectionProps) => {
  return (
    <Section>
      <SectionSection className='flex  flex-col items-center justify-center gap-8 md:flex-row '>
        <div className='order-2 flex flex-1 flex-col gap-4 text-center md:order-1'>
          <div>
            <h2>Get to Know Me</h2>
            <h5>The person I am.</h5>
          </div>
          <p>
            As a passionate software engineer with 9 years of experience, I specialize in full-stack web development
            across Healthcare, Higher Education, and Finance. My skills include building scalable solutions using
            ReactJS, .Net, C#, and JavaScript.
          </p>
          <p>
            I thrive on turning ideas into feature-rich applications, creating user-friendly interfaces, and following
            industry standards. My focus is always on seamless user experiences that address needs and provide value.
          </p>
          <p>
            With a commitment to continuous learning, I collaborate effectively with cross-functional teams,
            contributing to the dynamic field of software development.
          </p>
          <div className='flex flex-row items-center justify-center gap-4'>
            <h6 className='w-fit'>Let Connect</h6>
            <a href='' className='btn btn-square btn-ghost'>
              <SiGithub className='fill-base-content' />
            </a>
            <a href='' className='btn btn-square btn-ghost'>
              <SiLinkedin className='fill-base-content' />
            </a>
          </div>
        </div>

        <div className='order-1 flex flex-1 items-center justify-center md:order-2'>
          <img
            src={profilePicture}
            alt='Nathan Healea'
            className='h-60 w-60 rounded-2xl border shadow-xl md:h-80 md:w-80'
          />
        </div>
      </SectionSection>
    </Section>
  );
};

export default AboutMeSection;
