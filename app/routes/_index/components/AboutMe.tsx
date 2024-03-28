import { SiGithub, SiLinkedin } from '@icons-pack/react-simple-icons';
import { Link } from '@remix-run/react';
import Section, { SectionSection } from '~/components/Section';

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
            Lorem ipsum dolor sit amet consectetur. Magna duis tincidunt id leo
            tincidunt arcu vulputate. Aenean mattis faucibus lectus enim magna a
            condimentum auctor. Augue nisi consequat sed in proin et pretium.
            Augue enim non penatibus id risus nisl congue viverra.
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
          <div className='h-60 w-60 rounded-2xl bg-slate-400 md:h-80 md:w-80' />
        </div>
      </SectionSection>
    </Section>
  );
};

export default AboutMeSection;
