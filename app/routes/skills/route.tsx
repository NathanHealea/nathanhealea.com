import { type MetaFunction } from '@remix-run/node';
import { Link, Outlet } from '@remix-run/react';
import Page from '~/components/Page';
import Section from '~/components/Section';
import SectionContent from '~/components/Section/SectionContent';

import Technologies from '~/data/skills/Technologies';
import Competencies from '~/data/skills/Competencies';
import { Languages, Skill } from '~/data/skills/Languages';
export const meta: MetaFunction = () => {
  return [{ title: 'New Remix App' }, { name: 'description', content: 'Welcome to Remix!' }];
};

const SkillsPage = () => {
  return (
    <Page>
      <Section as='header' className='text-center'>
        <SectionContent>
          <div className='flex flex-col gap-16'>
            <h2>Languages</h2>

            {Object.keys(Languages).map((key) => {
              const currentLanguage: Skill = Languages[key];
              return (
                <div
                  key={`language-section-${currentLanguage.machineName}`}
                  className='flex flex-col gap-8 md:flex-row'>
                  <Link to={`/skills/${currentLanguage.machineName}`} className='min-w-64'>
                    <h4>{currentLanguage.title}</h4>
                  </Link>

                  {currentLanguage.technical && (
                    <div className='flex flex-wrap justify-center gap-8'>
                      {currentLanguage.technical.map((technicalLanguage: Skill) => {
                        return (
                          <Link
                            key={technicalLanguage.machineName}
                            to={`/skills/${technicalLanguage.machineName}`}
                            className='btn btn-outline'>
                            {technicalLanguage.title}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </SectionContent>
      </Section>

      <Outlet />
    </Page>
  );
};

export default SkillsPage;
