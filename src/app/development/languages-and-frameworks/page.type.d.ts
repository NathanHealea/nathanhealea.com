import { Color } from 'components/SimpleIcon';

export type Technology = {
  name: string;
  icon?: string;
  color?: Color;
};

export type TechnologyGroup = {
  name: string;
  color: Color;
  list: Array<Technology>;
};
