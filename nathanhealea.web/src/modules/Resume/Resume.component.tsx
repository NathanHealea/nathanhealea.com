// --- Imports --- //
import React from 'react';
import DownloadResume from './Sections/DownloadResume/DownloadResume.component';

import Paper from './Sections/ResumeContent/components/Paper.component';
import ResumeContent from './Sections/ResumeContent/ResumeContent.component';

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
      {/* TODO: Resume download section */}
      <DownloadResume />

      <div className='container flex items-center justify-center px-12 my-12'>
        <Paper>
          <ResumeContent />
        </Paper>
      </div>
    </>
  );
};

// Default Return
export default Resume;
