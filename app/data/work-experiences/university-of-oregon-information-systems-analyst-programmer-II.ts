import { NodeJS, CSharp, DotNetCore, Drupal, HTML, JQuery, JavaScript, PHP, SQL, CSS } from '../skills/Languages';
import {
  Bitbucket,
  Confluence,
  Jira,
  MSSMS,
  MicrosoftDataverse,
  MicrosoftPowerApps,
  MicrosoftPowerAutomate,
  MySQL,
  TeamDynamics,
  XRMToolBox,
} from '../skills/Technologies';
import { WorkExperience } from './work-experiences.type';

export default {
  machineName: 'uo-is-apii',
  employment: 'Full Time',
  position: 'Analyst Programmer II',
  company: 'University of Oregon',
  department: 'Information Services',
  dates: {
    start: 'January.2023',
  },
  summary:
    'faucibus scelerisque eleifend donec pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum curabitur vitae nunc sed velit dignissim sodales ut eu sem integer vitae justo eget magna fermentum iaculis eu non diam phasellus vestibulum lorem sed risus ultricies tristique nulla aliquet enim tortor at auctor urna nunc',
  experiences: [
    {
      title: 'Drupal support, maintenance, and development',
      details: [
        'Worked on team of 5 developers to migrate 70 websites from Aegir to Pantheon.',
        'Created migration workflow, managed migration work within Jira, and created status reports for management.',
        'Upgraded Drupal sites from Drupal 7 and 9 to Drupal 10.',
        'Provided End user support.',
      ],
    },
    {
      title: 'Designed and implemented standards, workflows, and hierarchy for Jira.',
      details: ['Created adoption plan to guide team members to Start tracking development work in Jira.'],
    },
    {
      title:
        'Provided technical experiences in archiving COVID Research data to meet Clinical Laboratory Improvement AmEndments (CLIA) and University data retention policies.',
      details: [
        'Preformed audit of research data to determine classification.',
        'Developed SQL scripts to retrieve data from Microsoft Dataverse.',
        'Developed NodeJS console application to download the results of multiple Quartics surveys through APIs.',
        'Created archive project plan, Jira tickets, documented archive procedures, and provided multiple weekly project status updates to upper management.',
      ],
    },
    {
      title: 'Provided maintenance of COVID 19 Test response application build in Microsoft Power Apps.',
    },
    {
      title: 'Modified Quartics surveys, using jQuery, JavaScript, HTML and CSS, to improve web accessibility.',
    },
  ],
  roles: [
    {
      title: 'Jira Subcommittee Member',
      details: [
        'Create standards in Jira for Information Systems department staff.',
        'Conducted research on team usages of Jira, identify pain points, made suggestions for improvements',
      ],
      start: 'November.2023',
    },
    {
      title: 'Business Applications Change Management Board member',
      details: [
        'Responsible for determining changes to effect university business applications.',
        'Provided synopsis of impacting changes to team members for visibility.',
      ],
      start: 'February.2023',
      end: 'March.2023',
    },
  ],
  languages: [DotNetCore, CSharp, Drupal, PHP, JavaScript, JQuery, MySQL, NodeJS, SQL, CSS, HTML],
  technologies: [
    Jira,
    Confluence,
    Bitbucket,
    MicrosoftPowerApps,
    MicrosoftPowerAutomate,
    MicrosoftDataverse,
    MSSMS,
    XRMToolBox,
    TeamDynamics,
  ],
} as WorkExperience;
