import NorthwestCommunityCreditUnionLogo from '~/images/companies/northwest-community-credit-union-logo.png';
import {
  Bootstrap,
  CSS,
  CSharp,
  DotNetCore,
  DotNetFramework,
  Express,
  HTML,
  JavaScript,
  MaterialDesign,
  NodeJS,
  Python,
  ReactJS,
  SASS,
} from '../skills/Languages';
import {
  Azure,
  AzureDevOps,
  Bamboo,
  Bitbucket,
  Confluence,
  IIS,
  Jira,
  MSSQL,
  Oracle,
  SonarQube,
  TeamFoundationServer,
} from '../skills/Technologies';

import { WorkExperience } from './work-experiences.type';

export default {
  machineName: 'nwcu-sd-ii',
  employment: 'Full Time',
  position: 'Software Developer II',
  company: 'Northwest Community Credit Union',
  logo: NorthwestCommunityCreditUnionLogo,
  dates: {
    start: 'October.2019',
    end: 'September.2020',
  },
  summary:
    'faucibus scelerisque eleifend donec pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum curabitur vitae nunc sed velit dignissim sodales ut eu sem integer vitae justo eget magna fermentum iaculis eu non diam phasellus vestibulum lorem sed risus ultricies tristique nulla aliquet enim tortor at auctor urna nunc',
  experiences: [
    {
      title:
        'Developed applications for internal business units and member facing products. Led deployment of applications into Microsoft Azure. Maintained legacy applications and databases and performed domain migrations for said applications.',
    },
    {
      title:
        'Design single page application architecture and developed react client, using Redux, React-Router, and Re-Ducks patterns. This architecture now is standard for public facing application and has been used in 4 different projects.',
    },
    {
      title:
        'Responsible for bringing modern JavaScript frameworks (React, Vue) to development team and led team in using cutting edge technologies to improve user experiences in public facing applications.',
    },
    {
      title:
        'Developed and implemented Software Development Life Cycle to align with project management and business operations, including source code vulnerability scanning using SonarCube, used during a successful audit.',
    },
    {
      title:
        'Documented and created on boarding procedures for new developers, including access to systems, applications, and database, application installation and configuration. Acted as a central source for new developers, answer question about environments, application, and provided guidance as new team member got up to seed.',
    },
    {
      title:
        'Quickly mastered new skills and technologies to become a fully independent developer.',
    },
  ],
  languages: [
    ReactJS,
    CSharp,
    DotNetCore,
    DotNetFramework,
    NodeJS,
    Express,
    Python,
    Bootstrap,
    MaterialDesign,
    SASS,
    JavaScript,
    CSS,
    HTML,
  ],
  technologies: [
    Jira,
    Bitbucket,
    Bamboo,
    Confluence,
    SonarQube,
    TeamFoundationServer,
    Azure,
    IIS,
    AzureDevOps,
    MSSQL,
    Oracle,
  ],
} as WorkExperience;
