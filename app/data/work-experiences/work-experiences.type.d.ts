import { Skill } from '../skills/skills.types';

export type Experience = {
  title: string;
  details?: Array<string>;
};

export type Role = {
  title: string;
  details: Array<string>;
  start: string;
  end?: string;
};

export type WorkExperience = {
  machineName: string;
  employment: 'Full Time' | 'Contact' | 'Student Employee' | 'Internship';
  position: string;
  company: string;
  department?: string;
  dates: {
    start: string;
    end?: string;
  };
  summary: string;
  experiences: Array<Experience>;
  roles: Array<Role>;
  languages: Array<Skill>;
  technologies: Array<Skill>;
};
