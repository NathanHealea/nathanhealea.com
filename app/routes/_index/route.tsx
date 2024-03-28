import { type MetaFunction } from '@remix-run/node';

import Page from '~/components/Page';
import HeroSection from './components/Hero';
import AboutMeSection from './components/AboutMe';
import SkillsSection from './components/Skills';
import { getDefaultMetaData } from '~/utils/meta';

export const meta: MetaFunction = () => getDefaultMetaData();

const IndexPage = () => {
  return (
    <Page>
      <HeroSection />
      <AboutMeSection />
      <SkillsSection />
    </Page>
  );
};

export default IndexPage;
