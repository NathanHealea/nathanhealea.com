export type Skill = {
  machineName?: string;
  title: string;
  icon?: ReactNode;
  versions?: Array<string>;
  technical?: Array<Skill>;
};

export type Skills = {
  [key: string]: Skill;
};
