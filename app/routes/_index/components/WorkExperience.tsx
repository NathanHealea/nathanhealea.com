import { json } from '@remix-run/node';
import { v4 as uuid } from 'uuid';
import Section, { SectionBody, SectionTitle } from '~/components/Section';
import SectionContent from '~/components/Section/SectionContent';
import { getWorkExperienceAsArray } from '~/data/work-experiences';
import { WorkExperience } from '~/data/work-experiences/work-experiences.type';
export interface WorkExperienceProps {}

export const loader = () => {
  console.log(getWorkExperienceAsArray(), 'in loader');
  return json({ temp: 'test;' });
};

const WorkExperienceSection = (props: WorkExperienceProps) => {
  const experience = getWorkExperienceAsArray();
  const recentExperience = experience.slice(0, 3);

  console.log(recentExperience);
  return (
    <Section as="section">
      <SectionContent>
        <SectionTitle className="text-center">
          <h2>Work Experience</h2>
          <h5>The experience I have.</h5>
        </SectionTitle>
        <SectionBody>
          {recentExperience.map((experience: WorkExperience) => (
            <div key={uuid()} className="flex flex-col md:flex-row">
              <div>
                <h4>{experience.position}</h4>
                <h6>
                  {experience.company}{' '}
                  {experience.department && `- ${experience.department}`}
                </h6>
              </div>
              <div>
                <img
                  src={experience.logo}
                  alt="tetm"
                  className="w-full max-w-40"
                />
              </div>
            </div>
          ))}
        </SectionBody>
      </SectionContent>
    </Section>
  );
};

export default WorkExperienceSection;
