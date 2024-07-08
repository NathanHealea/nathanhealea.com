import { json } from '@remix-run/node';
import { Link } from '@remix-run/react';
import { v4 as uuid } from 'uuid';
import Section, {
  SectionBody,
  SectionFooter,
  SectionTitle,
} from '~/components/Section';
import SectionContent from '~/components/Section/SectionContent';
import { getWorkExperienceAsArray } from '~/data/work-experiences';
import { WorkExperience } from '~/data/work-experiences/work-experiences.type';
import { WorkExperience as WorkExperienceLink } from '~/routes.config';
export interface WorkExperienceProps {}

export const loader = () => {
  return json({ temp: 'test;' });
};

const WorkExperienceSection = (props: WorkExperienceProps) => {
  const experience = getWorkExperienceAsArray();
  const recentExperience = experience.slice(0, 3);

  return (
    <Section as="section" className="min-h-screen">
      <SectionContent className="flex flex-col gap-16">
        <SectionTitle className="text-center">
          <h2>Work Experience</h2>
          <h5>The experience I have.</h5>
        </SectionTitle>
        <SectionBody className="flex flex-col gap-16">
          {recentExperience.map((experience: WorkExperience) => (
            <div
              key={uuid()}
              className="flex flex-col-reverse items-center justify-center gap-16 md:flex-row "
            >
              <div className="flex flex-1 flex-col gap-4 text-center">
                <h4>{experience.position}</h4>
                <h6>
                  {experience.company}{' '}
                  {experience.department && `- ${experience.department}`}
                </h6>
                <p className="text-overline text-sm">
                  {experience.dates.start}{' '}
                  {experience.dates.end && `- ${experience.dates.end}`}
                  {!experience.dates.end && `- present`}
                </p>
                <p>{experience.summary}</p>
                <div></div>
              </div>
              <div className="flex h-60 w-60 items-center justify-center md:h-80 md:w-80  ">
                <img
                  src={experience.logo}
                  alt={`${experience.company} logo`}
                  className="h-full w-auto"
                />
              </div>
            </div>
          ))}
        </SectionBody>
        <SectionFooter className="flex items-center justify-center">
          <Link to={WorkExperienceLink.getPath()} className="btn btn-ghost">
            View Full Work Experience
          </Link>
        </SectionFooter>
      </SectionContent>
    </Section>
  );
};

export default WorkExperienceSection;
