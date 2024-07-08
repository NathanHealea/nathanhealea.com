import ProvidenceHealthPlanLogo from '~/images/companies/providence-health-plans-logo.svg';
import {
  Angular,
  CSS,
  CSharp,
  DotNetFramework,
  HTML,
  KendoUI,
  MaterialUI,
  NextJS,
  ReactJS,
  TypeScript,
} from '../skills/Languages';
import {
  AWS,
  Auth0,
  AzureDevOps,
  Confluence,
  MSSQL,
  NPM,
  NVM,
  Octopus,
} from '../skills/Technologies';
import { WorkExperience } from './work-experiences.type';

export default {
  machineName: 'php-seiii',
  employment: 'Contact',
  position: 'Software Engineer III',
  company: 'Providence Health Plans',
  logo: ProvidenceHealthPlanLogo,
  dates: {
    start: 'November.2022',
    end: 'January.2023',
  },
  summary:
    'From November 2022 to January 2023, I worked as a Contract Software Engineer III at Providence Health Plans. During this time, I introduced a new technology stack to reduce development complexity, created a centralized error display application, and deployed applications using Azure DevOps and Octopus. I also collaborated on various projects, including implementing new insurance card displays and documenting processes in Confluence to streamline team operations. My technical skills include TypeScript, Angular, ReactJS, and several other programming languages and technologies.',
  experiences: [
    {
      title:
        'Reduced development complexity by introducing new technology stack.',
    },
    {
      title:
        'Piloted new technology stack by creating a centralized error display application for displaying error message shared among applications and 3rd party integrations.',
    },
    {
      title:
        'Created onboarding documentation, and onboarding new team members within first few weeks.',
    },
    {
      title:
        'Deployed applications to on-perm and cloud environments through Azure DevOps and Octopus.',
    },
    {
      title:
        'Worked with team to implement new Insurance card displays within HeathTrio CMS to meet business end-of-year goals.',
    },
    {
      title:
        'Collaborated with team members on User Store create, feature development, trouble shooting/debugging, and participated in code review sessions.',
    },
    {
      title:
        'Documented tribal knowledge and processes to reduce dependence on specific developers in Confluence.',
    },
    {
      title: 'Preformed user management through Auth0 and AWS DynamoDB.',
    },
    {
      title: 'Provided solutions to end user and business units through Jira.',
    },
  ],
  languages: [
    TypeScript,
    Angular,
    ReactJS,
    NextJS,
    CSharp,
    DotNetFramework,
    MaterialUI,
    KendoUI,
    CSS,
    HTML,
  ],
  technologies: [AWS, Auth0, AzureDevOps, Confluence, Octopus, MSSQL, NPM, NVM],
} as WorkExperience;
