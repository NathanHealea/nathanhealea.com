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
    'faucibus scelerisque eleifend donec pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum curabitur vitae nunc sed velit dignissim sodales ut eu sem integer vitae justo eget magna fermentum iaculis eu non diam phasellus vestibulum lorem sed risus ultricies tristique nulla aliquet enim tortor at auctor urna nunc',
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
