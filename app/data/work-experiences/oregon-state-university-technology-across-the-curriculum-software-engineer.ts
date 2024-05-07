import {
  CSS,
  CSharp,
  DotNetFramework,
  HTML,
  JQuery,
  JavaScript,
  SQL,
} from '../skills/Languages';
import { GoogleMaps, IIS, TeamFoundationServer } from '../skills/Technologies';
import { WorkExperience } from './work-experiences.type';

export default {
  machineName: 'osu-tac-se',
  employment: 'Student Employee',
  position: 'Software Engineer',
  company: 'Oregon State University',
  department: 'Integrated Plant Protection Center',
  dates: {
    start: 'July.2015',
    end: 'August.2017',
  },
  summary:
    'faucibus scelerisque eleifend donec pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum curabitur vitae nunc sed velit dignissim sodales ut eu sem integer vitae justo eget magna fermentum iaculis eu non diam phasellus vestibulum lorem sed risus ultricies tristique nulla aliquet enim tortor at auctor urna nunc',
  experiences: [
    {
      title:
        'Redesigned and implemented user interface of existing application to be mobile friendly using Bootstrap.',
    },
    {
      title:
        'Worked with team members to architect new features from client requirements.',
    },
    {
      title:
        'Integrated Google API to display geological location and implemented a function for displaying relative data for the selected parcel.',
    },
    {
      title:
        'Responsible for team member support towards database configuration and data access.Redesigned and implemented user interface of existing application to be mobile friendly using Bootstrap. Worked with team members to architect new features from client requirements. Integrated Google API to display geological location and implemented a function for displaying relative data for the selected parcel. Responsible for team member support towards database configuration and data access.',
    },
  ],
  languages: [CSharp, DotNetFramework, SQL, JQuery, JavaScript, CSS, HTML],
  technologies: [IIS, TeamFoundationServer, GoogleMaps],
} as WorkExperience;
