import moment from 'moment';
import { WorkExperience } from './WorkExperience.types';



interface WorkExperienceProps {
  data:WorkExperience
} 

const WorkExperience = (props:WorkExperienceProps) => {

  const {data} = props;

  return (
    <section>
      <div className='max-w-7xl mx-auto flex flex-col justify-center items-center py-8 gap-4'>
        <h1>{data.position}</h1>
        <h2>{data.company}</h2>
        <p> 
          <span>{moment(data.startDate).format("MM/yyyy")}</span>
          {' - '}
          {data.isCurrent && <span>Present</span>}
          {data.endDate && <span>{moment(data.endDate).format("MM/yyyy")}</span>}
        </p>
      </div>
    </section>

  )
}


export default WorkExperience;