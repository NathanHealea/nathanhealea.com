import Section, { SectionBody, SectionTitle } from '~/components/Section';
import SectionContent from '~/components/Section/SectionContent';
import { WorkExperience } from '~/data/work-experiences/work-experiences.type';
import Experience from './components/Experiences';
import Language from './components/Language';
import { Disclosure, Transition } from '@headlessui/react';
import clsx from 'clsx';
import WorkExperienceContent from './components/WorkExperienceContent';
import WorkExperienceTitle from './components/WorkExperienceTitle';

export interface WorkExperienceSectionProps extends WorkExperience {
  isAlternate: boolean;
  defaultOpen?: boolean;
}

const WorkExperienceSection = (props: WorkExperienceSectionProps) => {
  const {
    position,
    company,
    department,
    dates,
    summary,
    experiences,
    roles,
    languages,
    technologies,
    isAlternate,
    defaultOpen = false,
  } = props;

  return (
    <Section>
      <SectionContent className='flex flex-col gap-16 '>
        <Disclosure defaultOpen={defaultOpen}>
          <SectionTitle
            className={clsx('flex flex-col gap-8', {
              'md:flex-row': isAlternate,
              'md:flex-row-reverse': !isAlternate,
            })}>
            <div className='flex w-full items-center justify-center md:w-72'>
              <div className='my-4 h-60 w-full rounded-2xl bg-slate-300 md:w-60' />
            </div>
            {/* <WorkExperienceHeroImage img={}/> */}
            <WorkExperienceTitle
              {...{
                position,
                company,
                department,
                summary,
                dates,
              }}>
              <Disclosure.Button className='btn btn-ghost'>View More</Disclosure.Button>
            </WorkExperienceTitle>
          </SectionTitle>
          <Transition
            enter='transition duration-100 ease-out'
            enterFrom='transform scale-95 opacity-0'
            enterTo='transform scale-100 opacity-100'
            leave='transition duration-75 ease-out'
            leaveFrom='transform scale-100 opacity-100'
            leaveTo='transform scale-95 opacity-0'>
            <Disclosure.Panel>
              <SectionBody className='gap-8 rounded-2xl p-8 text-center shadow-xl md:text-start'>
                <WorkExperienceContent title='Experience' data={experiences} render={Experience} />
                <WorkExperienceContent title='Roles' data={roles} render={Experience} />
                <WorkExperienceContent title='Languages' data={languages} render={Language} />
                <WorkExperienceContent title='Technologies' data={technologies} render={Language} />
              </SectionBody>
            </Disclosure.Panel>
          </Transition>
        </Disclosure>
      </SectionContent>
    </Section>
  );
};

export default WorkExperienceSection;
