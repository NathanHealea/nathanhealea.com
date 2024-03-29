import { v4 } from 'uuid';
import { Experience as ExperienceType } from '~/data/work-experiences/work-experiences.type';

export interface ExperienceProps extends ExperienceType {}

const Experience = (props: ExperienceProps) => {
  const { title, details } = props;

  return (
    <div className='flex flex-col gap-4 text-center md:text-start'>
      <p className='text-md'>{title}</p>

      {details && (
        <ul className='flex flex-col gap-2 md:list-inside md:list-disc'>
          {details.map((detail) => (
            <li key={v4()}>{detail}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Experience;
