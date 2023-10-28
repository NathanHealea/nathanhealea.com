import { SanityDocument } from 'next-sanity';

export type WorkExperience = {
  position: string;
  company: string;
  department?: string;
  location: string;
  startDate: Date;
  endDate?: Date;
  isCurrent: boolean;
  employmentType: Array<string>;
  isDraft: boolean;
  technologies: Array<string>;
  languagesAndFrameworks: Array<string>;
  workExperience: TypedObject[];
};

export type WorkExperienceDocument = SanityDocument<WorkExperience>;
