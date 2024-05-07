import {
  Bootstrap,
  CSS,
  CSharp,
  DotNetCore,
  HTML,
  JavaScript,
  Jest,
  ReactJS,
  SASS,
  TypeScript,
} from '../skills/Languages';
import {
  Bitbucket,
  Docker,
  Git,
  GitHub,
  Jira,
  PostgreSQL,
} from '../skills/Technologies';
import { WorkExperience } from './work-experiences.type';

export default {
  machineName: 'ae-sw-ii',
  employment: 'Contact',
  position: 'Software Engineer II',
  company: 'American Express',
  dates: {
    start: 'September.2020',
    end: 'August.2021',
  },
  summary:
    'faucibus scelerisque eleifend donec pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum curabitur vitae nunc sed velit dignissim sodales ut eu sem integer vitae justo eget magna fermentum iaculis eu non diam phasellus vestibulum lorem sed risus ultricies tristique nulla aliquet enim tortor at auctor urna nunc',
  experiences: [
    {
      title:
        'Works cohesively with a team of six to sprint plan, engage in feature design discussion, and provide time estimates of deliverables. ',
    },
    {
      title:
        'Responsible for code reviews, testing, and deployment of Docker containers to Rancher environment.',
    },
    {
      title:
        'Documented standards, release processes, and application features.',
    },
    {
      title:
        'Responsible for creating branching strategy and standards for development team.',
    },
    {
      title:
        'Expanded Adhoc report querying user interface, which allowed users to create advanced queries by adding nested group by and order by clauses. In addition, implemented new service side logic to support advanced queries and future proof code to allow for additional advancements.',
    },
    {
      title:
        'Quickly mastered new skills and technologies to become a fully independent developer.',
    },
    {
      title:
        'Led NodeJS upgrade for enterprise software and provided documentation for developers used to upgrade local development environment.',
    },
  ],
  languages: [
    ReactJS,
    Jest,
    CSharp,
    DotNetCore,
    Bootstrap,
    SASS,
    TypeScript,
    JavaScript,
    CSS,
    HTML,
  ],
  technologies: [Docker, Jira, Bitbucket, GitHub, Git, PostgreSQL],
} as WorkExperience;
