import { Skill } from './skills.types';

// ---- C Sharp ---- //
export const DotNetCore: Skill = {
  machineName: 'dot-net-core',
  title: '.NET Core',
};

export const DotNetFramework: Skill = {
  machineName: 'dot-net-core',
  title: '.NET Framework',
};

export const CSharp: Skill = {
  machineName: 'c-sharp',
  title: 'C#',
  technical: [DotNetCore, DotNetFramework],
};

// ---- JavaScript ---- //

export const ReactJS: Skill = {
  machineName: 'react',
  title: 'React',
};

export const Angular: Skill = {
  machineName: 'angular',
  title: 'Angular',
  versions: ['8', '9', '11'],
};

export const Vue: Skill = {
  machineName: 'vue',
  title: 'Vue',
};

export const JQuery: Skill = {
  machineName: 'jquery',
  title: 'jQuery',
};

export const TypeScript: Skill = {
  machineName: 'typescript',
  title: 'TypeScript',
};

export const MaterialUI: Skill = {
  machineName: 'material-ui',
  title: 'Materia UI',
};

export const KendoUI: Skill = {
  machineName: 'kendo-ui',
  title: 'Kendo UI',
};

export const JavaScript: Skill = {
  machineName: 'javascript',
  title: 'JavaScript',
  technical: [ReactJS, Angular, Vue, JQuery, MaterialUI, KendoUI],
};

// --- NodeJS ---- //
export const Express: Skill = {
  machineName: 'express',
  title: 'ExpressJS',
};

export const Electron: Skill = {
  machineName: 'electron',
  title: 'Electron',
};

export const NextJS: Skill = {
  machineName: 'nextjs',
  title: 'NextJS',
};

export const RemixRun: Skill = {
  machineName: 'remix-run',
  title: 'Remix.Run',
};

export const Jest: Skill = {
  machineName: 'jest',
  title: 'Jest',
};

export const NodeJS: Skill = {
  machineName: 'nodejs',
  title: 'NodeJS',
  technical: [Express, Electron, NextJS, RemixRun, Jest],
};

// ---- PHP ---- //

export const Drupal: Skill = {
  machineName: 'drupal',
  title: 'Drupal',
};

export const PHP: Skill = {
  machineName: 'php',
  title: 'PHP',
  technical: [Drupal],
};

// ---- Python ---- //

export const Flask: Skill = {
  machineName: 'flask',
  title: 'Flask',
};

export const Python: Skill = {
  machineName: 'python',
  title: 'Python',
  technical: [Flask],
};

// ---- SQL ---- //

export const PLSQL: Skill = {
  machineName: 'pl-sql',
  title: 'PL',
};

export const TSQL: Skill = {
  machineName: 't-sql',
  title: 'T SQL',
};

export const SQL: Skill = {
  machineName: 'sql',
  title: 'SQL',
  technical: [PLSQL, TSQL],
};

// ---- CSS ---- //

export const Bootstrap: Skill = {
  machineName: 'bootstrap',
  title: 'Bootstrap',
};

export const TailwindCSS: Skill = {
  machineName: 'tailwindcss',
  title: 'TailwindCSS',
};

export const MaterialDesign: Skill = {
  machineName: 'material-design',
  title: 'Material Design',
};

export const Bulma: Skill = {
  machineName: 'bulma',
  title: 'Bulma',
};

export const SASS: Skill = {
  machineName: 'sass',
  title: 'SASS',
};

export const CSS: Skill = {
  machineName: 'css',
  title: 'CSS/CSS3',
  technical: [Bootstrap, TailwindCSS, MaterialDesign, Bulma, SASS],
};

// ---- HTML ---- //

export const HTML: Skill = {
  machineName: 'html',
  title: 'HTML/HTML5',
};

// ---- Growth ---- //

export const Networking: Skill = {
  machineName: 'networking',
  title: 'Networking',
};

export const UIUX: Skill = {
  machineName: 'ui-ux',
  title: 'UI/UX',
};

export const GraphicDesign: Skill = {
  machineName: 'graphic-design',
  title: 'Graphic Design',
};

export const TeamLeadership: Skill = {
  machineName: 'team-leadership',
  title: 'Team Leadership',
};

export const EnterpriseArchitecture: Skill = {
  machineName: 'enterprise-architecture',
  title: 'Enterprise Architecture',
};

export const Languages = {
  CSharp,
  JavaScript,
  NodeJS,
  PHP,
  Python,
  CSS,
  HTML,
};

export default {
  // C#
  DotNetCore,
  DotNetFramework,
  CSharp,

  // Javascript
  TypeScript,
  ReactJS,
  Vue,
  JQuery,
  Angular,
  MaterialUI,
  KendoUI,
  JavaScript,

  // Node
  Express,
  Electron,
  NextJS,
  RemixRun,
  Jest,
  NodeJS,

  // PHP
  Drupal,
  PHP,

  // Python
  Flask,
  Python,

  // SQL
  PLSQL,
  TSQL,
  SQL,

  // CSS
  Bootstrap,
  TailwindCSS,
  MaterialDesign,
  Bulma,
  SASS,
  CSS,

  // HTML
  HTML,

  // Growth
  UIUX,
  GraphicDesign,
  TeamLeadership,
  EnterpriseArchitecture,
};
