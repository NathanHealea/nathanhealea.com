import { type MetaFunction } from '@remix-run/node';

import Page from '~/components/Page';
import HeroSection from './components/Hero';
import AboutMeSection from './components/AboutMe';
import SkillsSection from './components/Skills';
import { Link } from '@remix-run/react';
import SectionContent from '~/components/Section/SectionContent';
import Section from '~/components/Section';

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

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
