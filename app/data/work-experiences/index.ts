import AESEII from './american-express-software-engineer-ii';
import MCUSD from './maps-credit-union-software-developer';
import NWCUPA from './northwest-community-credit-union-programmer-analyst';
import NWCUSDII from './northwest-community-credit-union-software-developer-ii';
import OSUIPPCSE from './oregon-state-university-integrated-plant-protection-center-software-engineer';
import OSUTACSE from './oregon-state-university-technology-across-the-curriculum-software-engineer';
import PSFSSD from './pacific-source-full-stack-software-developer';
import PHPSEIII from './providence-health-plans-software-engineer-III';
import SCWD from './simplified-computing-web-developer';
import UOISAPII from './university-of-oregon-information-systems-analyst-programmer-II';
import { WorkExperience } from './work-experiences.type';

const WorkExperiences: {
  [key: string]: WorkExperience;
} = {
  UOISAPII,
  PHPSEIII,
  MCUSD,
  PSFSSD,
  AESEII,
  NWCUSDII,
  NWCUPA,
  OSUTACSE,
  OSUIPPCSE,
  SCWD,
};

export const getWorkExperienceAsArray = (): Array<WorkExperience> => {
  return Object.keys(WorkExperiences).map(
    (workExperienceKey: string) => WorkExperiences[workExperienceKey]
  );
};

export default WorkExperiences;
