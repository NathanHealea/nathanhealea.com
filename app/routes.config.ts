export interface Route {
  order?: number;
  title: string;
  getPath: (value?: string) => string;
  nested?: Array<Route>;
}

export const Home: Route = {
  title: 'Home',
  getPath: () => '/',
};

export const Projects: Route = {
  title: 'Projects',
  getPath: () => '/Projects',
};

export const WorkExperience: Route = {
  title: 'Work Experience',
  getPath: () => '/work-experience',
};

export const Skills: Route = {
  title: 'Skills',
  getPath: () => '/skills',
};

export const routes: Array<Route> = [Home, Projects, WorkExperience, Skills];

export default {
  Home,
  Projects,
  WorkExperience,
  Skills,
};
