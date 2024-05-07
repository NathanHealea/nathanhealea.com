import {
  Bootstrap,
  CSS,
  Drupal,
  HTML,
  JavaScript,
  PHP,
  Python,
} from '../skills/Languages';
import {
  Git,
  GitHub,
  LAMP,
  MySQL,
  Vagrant,
  VirtualBox,
} from '../skills/Technologies';
import { WorkExperience } from './work-experiences.type';

export default {
  machineName: 'osu-tac-se',
  employment: 'Student Employee',
  position: 'Software Engineer',
  company: 'Oregon State University',
  department: 'Technology Across the Curriculum',
  dates: {
    start: 'July.2015',
    end: 'August.2017',
  },
  summary:
    'faucibus scelerisque eleifend donec pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum curabitur vitae nunc sed velit dignissim sodales ut eu sem integer vitae justo eget magna fermentum iaculis eu non diam phasellus vestibulum lorem sed risus ultricies tristique nulla aliquet enim tortor at auctor urna nunc',
  experiences: [
    {
      title:
        'Developed text analysis REST service using a LAMP stack, Bootstrap, and jQuery along with corresponding Druple module that consumed text analysis REST API and provided data visualization. Developed administration portal to maintain service.',
    },
    {
      title:
        'Utilized Vagrant to build LAMP stack virtual machines that replicated production servers for local development, provided documentation on usage, and installed technologies.',
    },
    {
      title:
        'Introduced source control to team, helped train the Git branching and merge procedures, and migrated legacy project to GitHub repositories.',
    },
    {
      title:
        'Analyzed XML files to construct MySQL database schema to simplify data for researches. Developed Python scripts to parse and upload data. Developed administration portal using LAMP stack to review and fix inconsistency in data.',
    },
    {
      title:
        'Modified Quartics surveys, using jQuery, JavaScript, HTML and CSS, to improve web accessibility.',
    },
  ],
  languages: [PHP, Drupal, Python, Bootstrap, JavaScript, CSS, HTML],
  technologies: [LAMP, Vagrant, VirtualBox, MySQL, Git, GitHub],
} as WorkExperience;
