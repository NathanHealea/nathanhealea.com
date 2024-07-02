import { type MetaFunction } from '@remix-run/node';

import Page from '~/components/Page';
import { getDefaultMetaData } from '~/utils/meta';
import AboutMeSection from './components/AboutMe';
import HeroSection from './components/Hero';
import WorkExperienceSection from './components/WorkExperience';

export const meta: MetaFunction = () => getDefaultMetaData();

const IndexPage = () => {
  return (
    <Page>
      <HeroSection />
      <AboutMeSection />
      {/* <SkillsSection /> */}
      <WorkExperienceSection />
    </Page>
  );
};

export default IndexPage;
