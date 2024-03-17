import { ReactNode } from 'react';

export type Skill = {
  machineName?: string;
  title: string;
  icon?: ReactNode;
  nested?: Array<Omit<Skill, 'nested'>>;
  technical?: Array<Skill>;
};

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

export const ReactJS: Skill = {
  machineName: 'react',
  title: 'React',
};

export const Angular: Skill = {
  machineName: 'angular',
  title: 'Angular',
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
  title: 'typescript',
};

export const JavaScript: Skill = {
  machineName: 'javascript',
  title: 'JavaScript',
  technical: [ReactJS, Angular, Vue, JQuery],
};

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

export const NodeJS: Skill = {
  machineName: 'nodejs',
  title: 'NodeJS',
  technical: [Express, Electron, NextJS, RemixRun],
};

export const Drupal: Skill = {
  machineName: 'drupal',
  title: 'Drupal',
};

export const PHP: Skill = {
  machineName: 'php',
  title: 'PHP',
  technical: [Drupal],
};

export const Flask: Skill = {
  machineName: 'flask',
  title: 'Flask',
};

export const Python: Skill = {
  machineName: 'python',
  title: 'Python',
  technical: [Flask],
};

export const MSSQL: Skill = {
  machineName: 'mssql',
  title: 'MSSQL',
};

export const MySQL: Skill = {
  machineName: 'mysql',
  title: 'MySQL',
};

export const Oracle: Skill = {
  machineName: 'oracle',
  title: 'Oracle',
};

export const PostgreSQL: Skill = {
  machineName: 'postgresql',
  title: 'PostgresSQL',
};

export const SQL: Skill = {
  machineName: 'sql',
  title: 'SQL',
  technical: [MSSQL, MySQL, Oracle, PostgreSQL],
};

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

export const CSS: Skill = {
  machineName: 'css',
  title: 'CSS/CSS3',
  technical: [Bootstrap, TailwindCSS, MaterialDesign, Bulma],
};

export const HTML: Skill = {
  machineName: 'html',
  title: 'HTML/HTML5',
};

export const REST: Skill = {
  machineName: 'rest',
  title: 'REST',
};

export const API: Skill = {
  machineName: 'api',
  title: 'API',
};

export const MVC: Skill = {
  machineName: 'mvc',
  title: 'MVC',
};

export const MicroService: Skill = {
  machineName: 'micro-service',
  title: 'Microservice',
};

export const Monolithic: Skill = {
  machineName: 'monolithic',
  title: 'Monolithic',
};

export const SoftwareArchitecture: Skill = {
  machineName: 'software-architecture',
  title: 'Software Architecture',
  technical: [REST, API, MVC, MicroService, Monolithic],
};

export const Azure: Skill = {
  machineName: 'azure',
  title: 'Azure',
};

export const Google: Skill = {
  machineName: 'google',
  title: 'Google',
};

export const DigitalOcean: Skill = {
  machineName: 'digital-ocean',
  title: 'DetailOcean',
};

export const Pantheon: Skill = {
  machineName: 'pantheon',
  title: 'Pantheon',
};

export const Cloud: Skill = {
  machineName: 'could',
  title: 'Cloud',
};

export const RDMS: Skill = {
  machineName: 'rdms',
  title: 'RDMS',
};

export const Procedure: Skill = {
  machineName: 'procedure',
  title: 'Procedure',
};

export const Function: Skill = {
  machineName: 'function',
  title: 'View',
};

export const View: Skill = {
  machineName: 'view',
  title: 'View',
};

export const Permission: Skill = {
  machineName: 'permission',
  title: 'Permission',
};

export const Database: Skill = {
  machineName: 'database',
  title: 'Database',
  technical: [RDMS, Procedure, Function, View, Permission],
};

export const Docker: Skill = {
  machineName: 'docker',
  title: 'Docker',
};

export const VirtualBox: Skill = {
  machineName: 'virtual-box',
  title: 'VirtualBox',
};

export const VirtualMachines: Skill = {
  machineName: 'virtual-machines',
  title: 'Virtual Machines',
};

export const Vagrant: Skill = {
  machineName: 'vagrant',
  title: 'Vagrant',
};

export const VirtualizationContainerization: Skill = {
  machineName: 'virtualization-containerization',
  title: 'Virtualization & Containerization',
  technical: [Docker, VirtualBox, VirtualBox, Vagrant],
};

export const Networking: Skill = {
  machineName: 'networking',
  title: 'Networking',
};

export const Agile: Skill = {
  machineName: 'agile',
  title: 'Agile',
};

export const Waterfall: Skill = {
  machineName: 'waterfall',
  title: 'Waterfall',
};

export const Scrum: Skill = {
  machineName: 'scrum',
  title: 'Scrum',
};

export const Kanban: Skill = {
  machineName: 'kanban',
  title: 'Kanban',
};

export const Methodologies: Skill = {
  machineName: 'methodologies',
  title: 'Methodologies',
  technical: [Agile, Waterfall, Scrum, Kanban],
};

export const Bitbucket: Skill = {
  machineName: 'bitbucket',
  title: 'Bitbucket',
};

export const Jira: Skill = {
  machineName: 'jira',
  title: 'Jira',
};

export const Confluence: Skill = {
  machineName: 'confluence',
  title: 'Confluence',
};

export const Atlassian: Skill = {
  machineName: 'atlassian',
  title: 'Atlassian',
  technical: [Bitbucket, Jira, Confluence],
};

export const AzureDevOps: Skill = {
  machineName: 'azure-devops',
  title: 'Azure DevOps',
};

export const SoftwareDevelopmentLifeCycle: Skill = {
  machineName: 'sdlc',
  title: 'Software Development Life Cycle',
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
  JavaScript,

  // Node
  Express,
  Electron,
  NextJS,
  RemixRun,
  NodeJS,

  // PHP
  Drupal,
  PHP,

  // Python
  Flask,
  Python,

  // SQL
  MSSQL,
  MySQL,
  Oracle,
  PostgreSQL,
  SQL,

  // CSS
  Bootstrap,
  TailwindCSS,
  MaterialDesign,
  Bulma,
  CSS,

  // HTML
  HTML,

  // Software Architecture
  REST,
  API,
  MVC,
  MicroService,
  Monolithic,
  SoftwareArchitecture,

  // Cloud
  Azure,
  Google,
  DigitalOcean,
  Pantheon,
  Cloud,

  // Database
  RDMS,
  Procedure,
  Function,
  Permission,
  View,
  Database,

  // Virtualization & Containerization
  Docker,
  VirtualBox,
  VirtualMachines,
  Vagrant,
  VirtualizationContainerization,

  // Methodologies
  Agile,
  Waterfall,
  Scrum,
  Kanban,
  Methodologies,

  // Atlassian
  Bitbucket,
  Jira,
  Confluence,
  Atlassian,

  // Azure Devops
  AzureDevOps,

  // Software Development Life Cycle
  SoftwareDevelopmentLifeCycle,

  // Growth
  UIUX,
  GraphicDesign,
  TeamLeadership,
  EnterpriseArchitecture,
};
