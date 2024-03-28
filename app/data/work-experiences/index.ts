import UOISAPII from './university-of-oregon-information-systems-analyst-programmer-II';
import { WorkExperience } from './work-experiences.type';

const WorkExperiences: {
  [key: string]: WorkExperience;
} = {
  UOISAPII,
};

export const getWorkExperienceAsArray = (): Array<WorkExperience> => {
  return Object.keys(WorkExperiences).map((workExperienceKey: string) => WorkExperiences[workExperienceKey]);
};

export default WorkExperiences;
