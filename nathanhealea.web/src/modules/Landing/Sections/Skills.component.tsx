// --- Imports --- //
import React from 'react';
/**
 * Skills Interface
 */
interface ISkillsProps {}

/**
 * Skills Component
 */
const Skills = (props: ISkillsProps) => {
  return (
    <section className='flex items-center min-h-[450px]'>
      <div className='container p-4 mx-auto md:p-12'>
        <h2 className='relative pl-6 mb-4 text-4xl font-bold before:bg-gray-800 before:inline-block before:h-full before:absolute before:top-0 before:left-0 before:w-2 '>
          What I Do
        </h2>
        <p className='mb-4'>
          5 years of experience in Software and Web development with companies
          like PacificSource, American Express, and Northwest Community Credit.
          Focus on providing a compressive and polished user experience. Driven
          to ensure application reliability and code maintainability. With a
          passion of turning ideas into feature rich application. Below is a
          quick overview of my main technical skill sets and technologies I use.
        </p>

        {/* Skills  */}
        <div className='grid gap-4 grid-col-1 md:grid-cols-2 lg:grid-cols-4'>
          <div>JavaScript</div>
          <div>React</div>
          <div>.Net Core & .Net Framework</div>
          <div>CSS Frameworks</div>
          <div>Software Architecture</div>
          <div>Cloud Computing</div>
          <div>Database</div>
          <div>Project Management</div>
        </div>
      </div>
    </section>
  );
};

// Default Return
export default Skills;
