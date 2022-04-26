// --- Imports --- //
import React from 'react';
import List from './List.component';

type ExperienceContent = string | React.ReactNode;

/**
 * Experience Interface
 */
interface IExperienceProps {
  title: ExperienceContent;
  company: ExperienceContent;
  start: ExperienceContent;
  end?: ExperienceContent;
  overview?: ExperienceContent;
  accomplishments?: Array<ExperienceContent>;
}

/**
 * Experience Component
 */
const Experience = (props: IExperienceProps) => {
  /**
   * Renders the overview section if the overview prop has content
   * @returns Overview Section Component
   */
  const renderOverview = () => {
    if (props.overview && props.overview !== '') {
      return <p className='mb-2 text-sm text-gray-800'>{props.overview}</p>;
    }
    return null;
  };

  /**
   * REnders the accomplishment section if accomplishments are passed to component
   * @returns Accomplishments Section Component
   */
  const renderAccomplishments = () => {
    if (props.accomplishments && props.accomplishments.length !== 0) {
      return (
        <List className='ml-8 list-disc '>
          {props.accomplishments?.map((accomplishment) => (
            <li className='text-sm'>{accomplishment}</li>
          ))}
        </List>
      );
    }
  };

  /**
   * Renders the experience end date passed to the component or present if not end date is passed.
   * @returns experience end date or 'present'
   */
  const renderEndDate = () => {
    if (props.end && props.end !== '') {
      return props.end;
    }

    return 'present';
  };

  return (
    <div className='mb-2'>
      <div className='grid grid-cols-12 mb-2'>
        <div className='flex items-center col-span-12 md:col-span-6 print:col-span-6'>
          <h4 className='m-0 text-sm font-bold'>{props.title}</h4>
        </div>

        <div className='col-span-12 md:col-span-6 print:col-span-6'>
          <div className='text-xs text-right text-gray-800'>
            <p>{props.company}</p>
            <p>{props.start} - {renderEndDate()}</p>
          </div>
        </div>
      </div>
      {renderOverview()}
      {renderAccomplishments()}
    </div>
  );
};

// Default Return
export default Experience;
