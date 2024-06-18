import {
  Bootstrap,
  CSS,
  CSharp,
  DotNetFramework,
  HTML,
  JavaScript,
} from '../skills/Languages';
import { AzureDevOps, Git, MSSQL, VisualStudio } from '../skills/Technologies';
import { WorkExperience } from './work-experiences.type';

export default {
  machineName: 'ps-fsd',
  employment: 'Full Time',
  position: 'Software Developer',
  company: 'Maps Credit Union',
  dates: {
    start: 'August.2021',
    end: 'March.2022',
  },
  summary:
    'faucibus scelerisque eleifend donec pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum curabitur vitae nunc sed velit dignissim sodales ut eu sem integer vitae justo eget magna fermentum iaculis eu non diam phasellus vestibulum lorem sed risus ultricies tristique nulla aliquet enim tortor at auctor urna nunc',
  experiences: [
    {
      title: 'Refactored user interface to achieve AA accessibility.',
    },
    {
      title: 'Refactored code to improve readability and maintainability.',
    },
    {
      title: 'Collaborated across teams to standardize UI component designs.',
    },
    {
      title:
        'Migrated documentation for new employees to Azure DevOps from Word documents.',
    },
    {
      title: 'Improved new employee onboarding documentation.',
    },
  ],
  languages: [CSharp, DotNetFramework, Bootstrap, JavaScript, CSS, HTML],
  technologies: [AzureDevOps, MSSQL, Git, VisualStudio],
} as WorkExperience;
