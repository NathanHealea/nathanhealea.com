export type Skill = {
  machineName?: string;
  title: string;
  icon?: ReactNode;
  nested?: Array<Omit<Skill, 'nested'>>;
  technical?: Array<Skill>;
};

export type Skills = {
  [key: string]: Skill;
};
