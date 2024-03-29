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
  console.log(workExperiences);
  return (
    <Page>
      <Section as='header'>
        <SectionContent className='items-center justify-center text-center'>
          <h1>Work Experience</h1>
        </SectionContent>
      </Section>
      {workExperiences.map((workExperience: WorkExperienceType) => {
        return <WorkExperienceSection key={workExperience.machineName} {...workExperience} />;

        // return (
        //   <Section key={v4()}>
        //     <SectionContent>
        //       <h2>{workExperience}</h2>
        //       <h4>
        //         {workExperience.company} {workExperience.department && `| ${workExperience.department}`}
        //       </h4>

        //       {workExperience.experiences.map((experience: Array<Experience>) => {
        //         console.log(typeof experience === 'string');
        //         if (typeof experience === 'string') {
        //           return <p key={v4()}>{experience}</p>;
        //         }

        //         if (typeof experience === 'object') {
        //           return (
        //             <>
        //               <p>{experience.title}</p>
        //               <ul className='list-inside list-disc'>
        //                 {experience.details.map((detail) => {
        //                   return <li key={v4()}>{detail}</li>;
        //                 })}
        //               </ul>
        //             </>
        //           );
        //         }
        //       })}

        //       <h4>Languages and Frameworks</h4>
        //       <div className='pag-4 flex flex-wrap'>
        //         {workExperience.languages.map((language: Skill) => {
        //           return (
        //             <Link className='btn btn-link' to={`/skills/${language.machineName}`}>
        //               {language.title}
        //             </Link>
        //           );
        //         })}
        //       </div>
        //       <h4>Technologies</h4>
        //       <div className='pag-4 flex flex-wrap'>
        //         {workExperience.technologies.map((technology: Skill) => {
        //           return (
        //             <Link className='btn btn-link' to={`/skills/${technology.machineName}`}>
        //               {technology.title}
        //             </Link>
        //           );
        //         })}
        //       </div>
        //     </SectionContent>
        //   </Section>
        // );
      })}
    </Page>
  );
};

export default WorkExperiencePage;
