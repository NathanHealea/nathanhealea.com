// --- Imports --- //
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import NathanHealeaResume from './nathan-healea-resume.pdf'
/**
 * DownloadResume Interface
 */
interface IDownloadResumeProps {}

/**
 * DownloadResume Component
 */
const DownloadResume = (props: IDownloadResumeProps) => {
  return (
    <section className=' h-full min-h-[250px] bg-gray-100 flex items-center justify-center flex-col'>
        <h2 className='mb-4 text-4xl font-bold'>Online Resume </h2>
      <a href={NathanHealeaResume} target="_blank" className='px-4 py-2 text-white bg-gray-800 rounded hover:bg-gray-600 active:bg-gray-700'>
         <FontAwesomeIcon icon={faFilePdf} className='mr-2' /> Download PDF Version
      </a>
    </section>
  );
};

// Default Return
export default DownloadResume;
