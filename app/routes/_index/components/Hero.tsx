import { Link } from '@remix-run/react';
import Section, { SectionSection } from '~/components/Section';

interface HeroSectionProps {}

const HeroSection = (pros: HeroSectionProps) => {
  return (
    <Section as='header'>
      <SectionSection className='flex flex-col items-center justify-center gap-4 text-center'>
        <h1 className='text-h2'>HI 👋🏻!</h1>
        <h2 className='text-h1'> I&apos;m Nathan Healea</h2>
        <h3>Full Stack Developer & Software Engineer</h3>
        <h4>Currently a Programmer Analyst II @ University of Oregon</h4>
        <div className='flex flex-row items-center justify-center gap-16'>
          <Link to={'/projects'} className='btn '>
            Projects
          </Link>
          <Link to={'/resume'} className='btn'>
            Resume
          </Link>
        </div>
      </SectionSection>
    </Section>
  );
};

export default HeroSection;
