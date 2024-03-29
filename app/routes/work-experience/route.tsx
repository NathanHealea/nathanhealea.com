import { LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import Page from '~/components/Page';
import Section from '~/components/Section';
import SectionContent from '~/components/Section/SectionContent';
import { getWorkExperienceAsArray } from '~/data/work-experiences';
import { WorkExperience as WorkExperienceType } from '~/data/work-experiences/work-experiences.type';
import WorkExperienceSection from './components/WorkExperienceSection';

export interface WorkExperiencePageProps {}

export const loader: LoaderFunction = () => {
  return getWorkExperienceAsArray();
};

const WorkExperiencePage = (props: WorkExperiencePageProps) => {
  const workExperiences: Array<WorkExperienceType> = useLoaderData<typeof loader>();
  return (
    <Page>
      <Section as='header'>
        <SectionContent className='items-center justify-center text-center'>
          <h1>Work Experience</h1>
        </SectionContent>
      </Section>

      {workExperiences.map((workExperience: WorkExperienceType, index) => {
        return (
          <WorkExperienceSection
            defaultOpen
            key={workExperience.machineName}
            isAlternate={Boolean(index % 2)}
            {...workExperience}
          />
        );
      })}
    </Page>
  );
};

export default WorkExperiencePage;
