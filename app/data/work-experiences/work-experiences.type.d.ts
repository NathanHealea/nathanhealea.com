import { Skill } from '../skills/skills.types';

export type Experience =
  | string
  | {
      Title: string;
      Details: Array<string>;
    };

export type Role = {
  Title: string;
  Details: Array<string>;
  Start: string;
  End?: string;
};

export type WorkExperience = {
  Position: string;
  Company: string;
  Department?: string;
  Dates: {
    Start: string;
    End?: string;
  };
  Summary: string;
  Experiences: Array<Experience>;
  Roles: Array<Role>;
  Languages: Array<Skill>;
  Technologies: Array<Skill>;
};
