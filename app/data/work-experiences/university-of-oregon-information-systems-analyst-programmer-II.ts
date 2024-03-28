import { NodeJS, CSharp, DotNetCore, Drupal, HTML, JQuery, JavaScript, PHP, SQL, CSS } from '../skills/Languages';
import {
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
import { Skill } from '../skills/skills.types';
import { Experience, Role, WorkExperience } from './work-experiences.type';

export const Position = 'Analyst Programmer II';

export const Company = 'University of Oregon';

export const Department = 'Information Services';

export const Dates = {
  start: 'January.2023',
  end: '',
};

export const Summary = '';

export const Experiences: Array<Experience> = [
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
  'Provided maintenance of COVID 19 Test response application build in Microsoft Power Apps.',
  'Modified Quartics surveys, using jQuery, JavaScript, HTML and CSS, to improve web accessibility.',
];

export const Roles: Array<Role> = [
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
];

export const Languages: Array<Skill> = [
  NodeJS,
  Drupal,
  PHP,
  DotNetCore,
  CSharp,
  MySQL,
  SQL,
  JavaScript,
  JQuery,
  CSS,
  HTML,
];

export const Technologies: Array<Skill> = [
  Jira,
  Confluence,
  MicrosoftPowerApps,
  MicrosoftPowerAutomate,
  MicrosoftDataverse,
  MSSMS,
  XRMToolBox,
  TeamDynamics,
];

export default {
  position: Position,
  company: Company,
  department: Department,
  dates: Dates,
  summary: Summary,
  experiences: Experiences,
  roles: Roles,
  languages: Languages,
  technologies: Technologies,
} as WorkExperience;
