import { CSS, HTML, JavaScript } from '../skills/Languages';
import { Skill } from '../skills/skills.types';
import { WorkExperience } from './work-experiences.type';

export default {
  machineName: 'sc-wd',
  employment: 'Internship',
  position: 'Web Developer',
  company: 'Simplified Computing LLC ',
  dates: {
    start: 'March.2014',
    end: 'Jun.2014',
  },
  summary:
    'faucibus scelerisque eleifend donec pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum curabitur vitae nunc sed velit dignissim sodales ut eu sem integer vitae justo eget magna fermentum iaculis eu non diam phasellus vestibulum lorem sed risus ultricies tristique nulla aliquet enim tortor at auctor urna nunc',
  experiences: [
    {
      title: 'Developed websites for clients based on requirements.',
    },
    {
      title:
        'Ensured projects were completed to deadline to meet customer satisfaction.',
    },
    {
      title:
        'Problem solved, debugged, and fixed codes with a team of web developers.',
    },
    {
      title:
        'Researched clients business to provide relevant and accurate SEO. ',
    },
  ],
  languages: [JavaScript, CSS, HTML],
  technologies: [] as Array<Skill>,
} as WorkExperience;
