import { Color } from 'components/SimpleIcon';

export type Technology = {
  name: string;
  icon?: string;
  color?: Color;
};

export type TechnologyTier = {
  name: string;
  description: string
  color: Color;
  list: Array<Technology>;
};
