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
  machineName: 'nwcu-pa',
  employment: 'Full Time',
  position: 'Programmer Analyst',
  company: 'Northwest Community Credit Union',
  dates: {
    start: 'August.2017',
    end: 'Oct 2019',
  },
  summary:
    'faucibus scelerisque eleifend donec pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum curabitur vitae nunc sed velit dignissim sodales ut eu sem integer vitae justo eget magna fermentum iaculis eu non diam phasellus vestibulum lorem sed risus ultricies tristique nulla aliquet enim tortor at auctor urna nunc',
  experiences: [
    {
      title:
        'Responsible for the architecture, development, and deployment of the first public facing serverless application hosted in Microsoft cloud by a credit union in the Pacific Northwest.',
    },
    {
      title:
        'Designed architecture and developed the first on-premise public facing application used by Northwest Community Credit Union Board of Directors.',
    },
    {
      title:
        'Improved business processes by creating a full stack, web-based application to reduce a 3 day, 2 person manual process to an under 10 minute automated job.',
    },
    {
      title:
        'Responsible for maintaining PL/SQL Oracle database script used for incentive data aggregation.',
    },
    {
      title:
        'Designed and implemented MSSQL database schemas for new and legacy applications.',
    },
    {
      title:
        'Designed and developed custom Bootstrap and Material Ui themes based on marketing guidelines used by development team on both new and legacy applications.',
    },
    {
      title:
        'Worked with business units to define project requirements and translate non-technical requirements to technical requirements. Also responsible for project breakdown and status updates using Jira Software and Workfront.',
    },
    {
      title:
        'Configured and implemented Atlassian suite (Jira Software, Jira ServiceDesk, Bitbucket, Bamboo) enterprise software, used by over 300+ employees, including application installation, defining server specification, initializing and configuring MSSQL database for application integration, inner-application integration, and integration with Microsoft Active Directory.',
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
