import Section, { SectionBody, SectionTitle } from '~/components/Section';
import SectionContent from '~/components/Section/SectionContent';
import { WorkExperience } from '~/data/work-experiences/work-experiences.type';
import Experience from './Experiences';
import { v4 } from 'uuid';
import Language from './Language';
import { Disclosure, Transition } from '@headlessui/react';

export interface WorkExperienceSectionProps extends WorkExperience {}

const WorkExperienceSection = (props: WorkExperienceSectionProps) => {
  const { position, company, department, dates, summary, experiences, roles, languages, technologies } = props;
  console.log(props);

  return (
    <Section>
      <SectionContent className='flex flex-col gap-16 '>
        <Disclosure>
          <SectionTitle className='flex flex-col gap-8 md:flex-row'>
            <div className='flex w-full items-center justify-center md:w-72'>
              <div className='my-4 h-60 w-full rounded-2xl bg-slate-300 md:w-60' />
            </div>

            <div className='flex flex-1 flex-col items-center justify-center gap-4 text-center'>
              <h2>{position}</h2>
              <h4>
                {company} {department && `| ${department}`}
              </h4>
              <h6 className='text-overline'>
                {dates.start} {dates.end == undefined && ' - Present'} {dates.end !== undefined && `- ${dates.end}`}
              </h6>
              <p>{summary}</p>
              <Disclosure.Button className='btn btn-ghost'>View More</Disclosure.Button>
            </div>
          </SectionTitle>

          <Transition
            enter='transition duration-100 ease-out'
            enterFrom='transform scale-95 opacity-0'
            enterTo='transform scale-100 opacity-100'
            leave='transition duration-75 ease-out'
            leaveFrom='transform scale-100 opacity-100'
            leaveTo='transform scale-95 opacity-0'
          >
            <Disclosure.Panel>
              <SectionBody className='gap-8 rounded-2xl p-8 text-center shadow-xl md:text-start'>
                <h3>Experience</h3>
                {experiences.map((experience) => (
                  <Experience key={v4()} {...experience} />
                ))}

                <h3>Roles</h3>
                {roles.map((experience) => (
                  <Experience key={v4()} {...experience} />
                ))}

                <h3>Languages</h3>
                <div className='flex flex-wrap justify-center gap-2 md:justify-start'>
                  {languages.map((language) => (
                    <Language key={v4()} {...language} />
                  ))}
                </div>

                <h3>Technologies</h3>
                <div className='flex flex-wrap justify-center gap-2 md:justify-start'>
                  {technologies.map((language) => (
                    <Language key={v4()} {...language} />
                  ))}
                </div>
              </SectionBody>
            </Disclosure.Panel>
          </Transition>
        </Disclosure>
      </SectionContent>
    </Section>
  );
};

export default WorkExperienceSection;
