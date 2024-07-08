import MapsCreditUnionLogo from '~/images/companies/maps-logo.svg';
import {
  Bootstrap,
  CSS,
  CSharp,
  DotNetFramework,
  HTML,
  JavaScript,
  ReactJS,
} from '../skills/Languages';
import {
  Azure,
  AzureDevOps,
  CosmosDB,
  Git,
  MSSQL,
  VisualStudio,
} from '../skills/Technologies';
import { WorkExperience } from './work-experiences.type';

export default {
  machineName: 'mcu-sd',
  employment: 'Full Time',
  position: 'Software Developer',
  company: 'Maps Credit Union',
  logo: MapsCreditUnionLogo,
  dates: {
    start: 'March.2022',
    end: 'October.2022',
  },
  summary:
    'From March 2022 to October 2022, I worked as a Full-Time Software Developer at Maps Credit Union. During this period, I led the refactoring of legacy React components, expanded online banking features using Test Driven Development, and created onboarding documentation for new employees. My technical expertise includes ReactJS, CSharp, DotNetFramework, and various other technologies.',
  experiences: [
    {
      title:
        'Led refactor of legacy React components by implementing the DRY principle, simplifying state management, and converting class components to function components.',
    },
    {
      title: 'Expanded Online Banking features using Test Driven Development.',
    },
    {
      title: 'Implemented onboarding documentation for new employees.',
    },
  ],
  languages: [
    ReactJS,
    CSharp,
    DotNetFramework,
    Bootstrap,
    JavaScript,
    CSS,
    HTML,
  ],
  technologies: [Azure, AzureDevOps, MSSQL, CosmosDB, Git, VisualStudio],
} as WorkExperience;
