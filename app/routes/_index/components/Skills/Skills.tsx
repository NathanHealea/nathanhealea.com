import { Link } from '@remix-run/react';
import Section from '~/components/Section';
import SectionContent from '~/components/Section/SectionContent';
import {
  Database,
  Methodologies,
  SoftwareArchitecture,
  SoftwareDevelopmentLifeCycle,
} from '~/data/skills/Competencies';
import {
  CSS,
  CSharp,
  EnterpriseArchitecture,
  GraphicDesign,
  HTML,
  JavaScript,
  Networking,
  NodeJS,
  PHP,
  Python,
  SQL,
  TeamLeadership,
  UIUX,
} from '~/data/skills/Languages';
import {
  Atlassian,
  AzureDevOps,
  Cloud,
  VirtualizationContainerization,
} from '~/data/skills/Technologies';
import { SkillCard } from '.';

export interface SkillsSectionProps {}

const SkillsSection = (props: SkillsSectionProps) => {
  return (
    <>
      <Section>
        <SectionContent className="flex flex-col items-center justify-center gap-16 text-center ">
          <div>
            <h2>What I&apos;m Good At</h2>
            <h5>The knowledge and skills I bring.</h5>
          </div>
          <div className="grid  grid-cols-1 items-start gap-16 md:grid-cols-2 ">
            <SkillCard
              title="Full Stack Development"
              description="Experienced developing in... "
              skills={[CSharp, JavaScript, NodeJS, PHP, Python, SQL, CSS, HTML]}
            />
            <SkillCard
              title="Software Engineering"
              description="Knowledgeable in technologies to engineer solutions."
              skills={[
                SoftwareArchitecture,
                Cloud,
                Database,
                VirtualizationContainerization,
                Networking,
              ]}
            />
            <SkillCard
              title="Project Management"
              description="Proficient in organization and planning."
              skills={[
                Methodologies,
                SoftwareDevelopmentLifeCycle,
                Atlassian,
                AzureDevOps,
              ]}
            />
            <SkillCard
              title="Growth"
              description="Eger to learn and constantly grow."
              skills={[
                UIUX,
                GraphicDesign,
                TeamLeadership,
                EnterpriseArchitecture,
              ]}
            />
          </div>
        </SectionContent>
      </Section>

      <Section className="py-16">
        <SectionContent className="flex flex-col items-center justify-center gap-8 text-center">
          <h5>Want to see my entire knowledge base and skill set?</h5>
          <Link to="/resume" className="btn">
            View My Resume
          </Link>
        </SectionContent>
      </Section>
    </>
  );
};

export default SkillsSection;
