/* eslint-disable import/no-anonymous-default-export */
export interface Route {
  order?: number;
  title: string;
  href: string
  nested?: Array<Route>;
}

export const Home: Route = {
  title: 'Home',
  href: '/'
};

export const Projects: Route = {
  title: 'Projects',
  href: '/projects'
};

export const WorkExperience: Route = {
  title: 'Work Experience',
  href: '/work-experience'
};

export const Skills: Route = {
  title: 'Skills',
  href: '/skills'
};

export const routes: Array<Route> = [];

export default {
  Home,
  Projects,
  WorkExperience,
  Skills,
};