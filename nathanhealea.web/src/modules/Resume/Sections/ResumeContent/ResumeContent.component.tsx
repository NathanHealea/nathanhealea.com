// --- Imports --- //
import React from 'react';
import Education from './components/Education.component';
import Experience from './components/Experience.component';
import List from './components/List.component';
import ListItem from './components/ListItem.component';
import SectionHeader from './components/SectionHeader.component';
import SubSectionHeader from './components/SubSectionHeader.component';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGithubSquare,
  faLinkedin,
  faTwitter
} from '@fortawesome/free-brands-svg-icons';
import Divider from './components/Divider.component';
import {
  faEnvelope,
  faGlobe,
  faLocation,
  faLocationPin,
  faLocationPinLock,
  faMarker,
  faPhone
} from '@fortawesome/free-solid-svg-icons';

/**
 * Resume Interface
 */
interface IResumeProps {}

/**
 * Resume Component
 */
const Resume = (props: IResumeProps) => {
  return (
    <>
      {/* Header */}
      <div className='grid grid-cols-12 mb-2 gab-4 '>
        <div className='flex flex-col justify-center col-span-12 print:col-span-8 md:col-span-6 lg:col-span-8'>
          <h1 className='text-4xl font-black tracking-widest uppercase text-slate-700'>
            Nathan Healea
          </h1>
          <h3 className='text-xl text-gray-800'>
            Software Engineer | Full Stack Developer
          </h3>
        </div>
        <div className='col-span-12 md:col-span-6 print:col-span-4 lg:col-span-4'>
          <ul className='list-none'>
            <li className='text-xs'>
              <FontAwesomeIcon icon={faPhone} className='mr-2 text-slate-700' />
              541-556-8689
            </li>
            <li className='text-xs'>
              <FontAwesomeIcon
                icon={faEnvelope}
                className='mr-2 text-slate-700'
              />
              nate.healea@gmail.com
            </li>
            <li className='text-xs'>
              <FontAwesomeIcon icon={faGlobe} className='mr-2 text-slate-700' />
              www.nathanhealea.com
            </li>
            <li className='text-xs'>
              <FontAwesomeIcon
                icon={faLocationPin}
                className='w-3 mr-2 text-slate-700'
              />
              Eugene, Oregon
            </li>
          </ul>
        </div>
      </div>

      <Divider />

      {/* Object */}
      <div className='py-2 mb-2 '>
        <p className='text-sm text-gray-800'>
          Driven, energetic Software Developer with a passion for developing
          applications that improve processes and user experience. Experienced
          with full stack technology and languages. Aims to utilize the latest
          frameworks and technology stacks to provide the largest availability
          and scalability to applications. Innovative thinker and quick learner
          that solves problems at hand while also future proofing for expansion
          of features.
        </p>
      </div>

      <Divider />

      {/* Work Experience, Skills, and Education */}
      <div className='grid grid-cols-12 gap-4 mb-4'>
        <div className='col-span-12 md:pr-6 print:pr-6 md:col-span-6 lg:col-span-8 print:col-span-8 md:border-r print:border-r print:border-slate-400 md:border-slate-400'>
          {/* Work Experience */}
          <div className='mb-4'>
            <SectionHeader>Work Experience</SectionHeader>

            <Experience
              title='Software Developer'
              company='Maps Credit Union'
              start='Mar 2022'
              overview='Working with an amazing team to create exceptional member interfaces with MAPS CU'
            />

            <Experience
              title='Full Stack Software Developer'
              company='PacificSource'
              start='Aug 2021'
              end='Mar 2022'
              overview='Working with an amazing team to provide better health, better
              care, and better cost to the people and communities we serve.'
            />

            <Experience
              title='Software Engineer II'
              company='American Express (Contract)'
              start='Sep 2020'
              end='Aug 2021'
              overview='Maintained enterprise software by expanding features per user
              request, fixing bugs, and enhancing code for maintainability.
              Works cohesively with a team of six to sprint plan, engage in
              feature design discussion, and provide time estimates of
              deliverables. Responsible for code reviews, testing, and
              deployment of Docker containers to Rancher environment.
              Documented standards, release processes, and application
              features. Responsible for creating branching strategy and
              standards for team members.'
              accomplishments={[
                'Expanded Adhoc report querying user interface, which allowed users to create advanced queries by adding nested group by and order by clauses. In addition, implemented new service side logic to support advanced queries and future proof code to allow for additional advancements.',
                'Quickly mastered new skills and technologies to become a fully independent developer.',
                'Led NodeJS upgrade for enterprise software and provided documentation for developers used to upgrade local development environment.'
              ]}
            />

            <Experience
              title='Software Developer II'
              company='Northwest Community Credit Union'
              start='Sep 2020'
              end='Aug 2017'
              overview='Developed applications for internal business units and member facing products.
              Led deployment of applications into Microsoft Azure. Maintained legacy
              applications and databases and performed domain migrations for said
              applications. Promoted from Programmer Analyst in October 2019.'
              accomplishments={[
                'Responsible for the architecture, development, and deployment of the first public facing serverless application hosted in Microsoft cloud by a credit union in the Pacific Northwest.',
                'Improved business processes by creating a full stack application to reduce a three-day, two-person manual process to an under five-minute automated job.',
                'Developed and implemented Software Development Life Cycle to align with project management and business operations, including source code vulnerability using SonarCube, used during a successful audit.'
              ]}
            />

            <Experience
              title='Software Engineer'
              company='Oregon State University'
              start='Jul 2015'
              end='Aug 2017'
              overview='Responsible for the development of web applications to support research projects. Worked with researchers and stakeholders to define project requirements and timelines. Maintained and supported Drupal environments. Introduced and maintained source control software for the department'
              accomplishments={[
                'Developed text analysis REST API service using a LAMP stack, Bootstrap, and jQuery along with corresponding Drupal module that consumed text analysis REST API and provided data visualization.',
                'Utilized Vagrant to build LAMP stack virtual machines that replicated production servers for local development, provided documentation on usage, and installed technologies.',
                'Analyzed XML files to construct MySQL database schema to simplify data for researchers. Developed Python scripts to parse and upload data. Developed administration portal using LAMP stack to review and fix inconsistency in data.',
                'Introduced source control software, GitHub, to department. Responsible to migrating legacy projects to Github and provided training to team members.'
              ]}
            />

            <Experience
              title='Software Engineer'
              company='Oregon State University'
              start='Mar 2015'
              end='Jul 2015'
            />

            <Experience
              title='Web Developer'
              company='Simplified Computing LLC (Internship)'
              start='Mar 2014'
              end='Jun 2014'
            />
          </div>

          {/* Projects */}
          <div className='mb-4'>
            <SectionHeader>Projects</SectionHeader>

            <Experience
              title='LibNav'
              start='Sep 2016'
              end='Jun 2017'
              company='Oregon State University (Valley Library)'
              overview='Library Navigation application to help student, staff, and faculty, locate resource
              in the Valley Library at Oregon State University (OSU).'
            />
          </div>
        </div>

        <div className='col-span-12 md:col-span-6 lg:col-span-4 print:col-span-4 md:px-3 '>
          {/* Skills */}
          <div className='mb-4'>
            <SectionHeader>Skills</SectionHeader>

            <SubSectionHeader>Languages &amp; Frameworks</SubSectionHeader>
            <List>
              <ListItem>C# (.Net Core, APS.NET)</ListItem>
              <ListItem>Javascript (Typescript, React, Vue, jQuery)</ListItem>
              <ListItem>NodeJs (ExpressJS, Electron, Gatsby)</ListItem>
              <ListItem>PHP (Drupal)</ListItem>
              <ListItem>Python (Flak)</ListItem>
              <ListItem>SQL (MSSQL, MySQL, Oracle, PostrgesSQL)</ListItem>
              <ListItem>
                CSS/CSS3 (Bootstrap, Material Design, TailwindCSS, SCSS/SASS,
                LESS
              </ListItem>
              <ListItem>HTML/HTML5</ListItem>
            </List>

            <SubSectionHeader>Core Competencies</SubSectionHeader>
            <List>
              <ListItem>
                Software Architecture (REST, API, Microservice, Monolithic)
              </ListItem>
              <ListItem>Cloud Development (Azure, Google)</ListItem>
              <ListItem>
                Database (RDMS, Procedure, Function, View, Management)
              </ListItem>
              <ListItem>
                Project Management (Agile, Scrum, Kanban, Waterfall
              </ListItem>
              <ListItem>
                Virtualization and Containerization (Docker, VM, Vagrant)
              </ListItem>
            </List>
          </div>

          {/* Education */}
          <div className='mb-4'>
            <SectionHeader>Education</SectionHeader>
            <Education
              title='BS in Computer Science'
              institution='Oregon State University'
            />

            <Education
              title='AAS in Computer Programming'
              institution='Lane Community College'
            />

            <Education
              title='Career Pathway Certificate in Advance Game Development C++'
              institution='Lane Community College'
            />

            <Education
              title='Career Pathway Certificate as a Database Specialist'
              institution='Lane Community College'
            />
          </div>
        </div>
      </div>

      <Divider />

      {/* Social Media Links */}
      <div className='grid grid-cols-3 gap-4 text-gray-800'>
        <div className='text-center'>
          <p>
            <FontAwesomeIcon
              icon={faGithubSquare}
              className='mr-2 text-slate-700'
            />{' '}
            @NathanHealea
          </p>
        </div>
        <div className='text-center'>
          <p>
            <FontAwesomeIcon
              icon={faLinkedin}
              className='mr-2 text-slate-700'
            />{' '}
            in/NathanHealea
          </p>
        </div>
        <div className='text-center'>
          <p>
            <FontAwesomeIcon icon={faTwitter} className='mr-2 text-slate-700' />{' '}
            @NathanHealea
          </p>
        </div>
      </div>
    </>
  );
};

// Default Return
export default Resume;
