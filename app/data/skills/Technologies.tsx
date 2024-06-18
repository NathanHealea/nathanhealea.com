import { Skill } from './skills.types';

// ---- Atlassian ---- //

export const Bamboo: Skill = {
  machineName: 'bamboo',
  title: 'Bamboo',
};
export const Bitbucket: Skill = {
  machineName: 'bitbucket',
  title: 'Bitbucket',
};

export const Confluence: Skill = {
  machineName: 'confluence',
  title: 'Confluence',
};

export const Jira: Skill = {
  machineName: 'jira',
  title: 'Jira',
};

export const Atlassian: Skill = {
  machineName: 'atlassian',
  title: 'Atlassian',
  technical: [Bamboo, Bitbucket, Confluence, Jira],
};

// ---- Azure DevOps ---- //

export const AzureDevOps: Skill = {
  machineName: 'azure-devops',
  title: 'Azure DevOps',
};

// ---- Azure ---- //

export const AzureFunctions: Skill = {
  machineName: 'azure-functions',
  title: 'Azure Functions',
};

export const AzureSQLDatabase: Skill = {
  machineName: 'azure-sql-database',
  title: 'Azure SQL Database',
};

export const AzureAppServices: Skill = {
  machineName: 'azure-app-services',
  title: 'Azure App Services',
};

// ---- CI/CD ---- //
export const Octopus: Skill = {
  machineName: 'octopus',
  title: 'Octopus',
};

export const CICD: Skill = {
  machineName: 'cicd',
  title: 'Octopus',
  technical: [Octopus, Bamboo],
};

// ---- Cloud ---- //
export const AWS: Skill = {
  machineName: 'aws',
  title: 'Amazon Web Server',
  technical: [AzureFunctions, AzureSQLDatabase, AzureAppServices],
};

export const Azure: Skill = {
  machineName: 'azure',
  title: 'Azure',
  technical: [AzureFunctions, AzureSQLDatabase, AzureAppServices],
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

export const Vercel: Skill = {
  machineName: 'vercel',
  title: 'Vercel',
};

export const Cloud: Skill = {
  machineName: 'could',
  title: 'Cloud',
  technical: [Azure, Google, DigitalOcean, Pantheon, Vercel],
};

// --- Package Managers ---- //
export const NPM: Skill = {
  machineName: 'npm',
  title: 'NPM',
};
export const NVM: Skill = {
  machineName: 'nvm',
  title: 'Node Version Manager',
};

export const Yarn: Skill = {
  machineName: 'yarn',
  title: 'Yarn',
};

export const Composer: Skill = {
  machineName: 'composer',
  title: 'Composer',
};

export const Nuget: Skill = {
  machineName: 'nuget',
  title: 'Nuget',
};

export const PackageManagers: Skill = {
  machineName: 'package-managers',
  title: 'Package Managers',
  technical: [NPM, NVM, Yarn, Composer, Nuget],
};

// ---- Source Control  ---- //
export const Git: Skill = {
  machineName: 'git',
  title: 'Git',
};
export const GitHub: Skill = {
  machineName: 'github',
  title: 'GitHub',
};

export const GitLab: Skill = {
  machineName: 'gitlab',
  title: 'Git Lab',
};

export const TeamFoundationServer: Skill = {
  machineName: 'team-foundation-server',
  title: 'Team Foundation Server',
};

export const SourceControl: Skill = {
  machineName: 'source-control',
  title: 'Source Control',
  technical: [AzureDevOps, Git, GitLab, Bitbucket, TeamFoundationServer],
};

// ---- SQL Databases ---- //
export const MSSQL: Skill = {
  machineName: 'mssql',
  title: 'Microsoft SQL Server',
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

export const SQLDatabase: Skill = {
  machineName: 'sql-database',
  title: 'SQL Databases',
  technical: [MSSQL, MySQL, Oracle, PostgreSQL],
};

// --- Interactive Development Environments ---- //

// JetBrains

// Microsoft
export const MSSMS: Skill = {
  machineName: 'microsoft-sql-server-management-studio',
  title: 'Microsoft SQL Server Management Studios',
};

export const VisualStudio: Skill = {
  machineName: 'visual-studio',
  title: 'Visual Studio',
};

// IDE
export const IDE: Skill = {
  machineName: 'interactive-development-environments',
  title: 'Interactive Development Environments (IDE)',
  technical: [MSSMS, VisualStudio],
};

// ---- No SQL Database ---- //

export const CosmosDB: Skill = {
  machineName: 'cosmosdb',
  title: 'CosmosDB',
};

export const MongoDB: Skill = {
  machineName: 'mongodb',
  title: 'MongoDB',
};

export const NoSQLDatabase: Skill = {
  machineName: 'nosql-database',
  title: 'NoSQL Databases',
  technical: [MongoDB, CosmosDB],
};

// ---- Microsoft Power Platform ---- //

export const MicrosoftDataverse: Skill = {
  machineName: 'microsoft-dataverse',
  title: 'Microsoft Dataverse',
};

export const MicrosoftPowerApps: Skill = {
  machineName: 'microsoft-power-apps',
  title: 'Microsoft Power Apps',
};

export const MicrosoftPowerAutomate: Skill = {
  machineName: 'microsoft-power-automate',
  title: 'Microsoft Power Automate',
};

export const MicrosoftPowerPages: Skill = {
  machineName: 'microsoft-power-apps',
  title: 'Microsoft Power Pages',
};

export const MicrosoftPowerPlatform: Skill = {
  machineName: 'microsoft-power-platform',
  title: 'Microsoft Power Platform',
  technical: [MicrosoftPowerApps, MicrosoftPowerAutomate, MicrosoftPowerPages],
};

// ---- Miscellaneous ---- //

export const Auth0: Skill = {
  machineName: 'auth0',
  title: 'Auth0',
};

export const GoogleMaps: Skill = {
  machineName: 'google-maps',
  title: 'Google Maps',
};

export const SonarQube: Skill = {
  machineName: 'sonarqube',
  title: 'SonarQube',
};

export const Saleforce: Skill = {
  machineName: 'saleforce',
  title: 'Saleforce',
};

export const TeamDynamics: Skill = {
  machineName: 'team-dynamics',
  title: 'Team Dynamics',
};

export const XRMToolBox: Skill = {
  machineName: 'xrmtoolbox',
  title: 'XRM Toolbox',
};

// ---- Virtualization  & Containerization ---- //
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

// --- Web Servers --- //
export const IIS: Skill = {
  machineName: 'iis',
  title: 'IIS',
};

export const LAMP: Skill = {
  machineName: 'lamp',
  title: 'LAMP Stack',
};

export const WebServers: Skill = {
  machineName: 'web-servers',
  title: 'WebServers',
  technical: [IIS, LAMP],
};

export default {
  // Atlassian
  Atlassian,
  Bamboo,
  Bitbucket,
  Confluence,
  Jira,

  // Azure Devops
  AzureDevOps,

  // CICD
  Octopus,
  CICD,

  // Cloud
  AWS,
  Azure,
  Google,
  DigitalOcean,
  Pantheon,
  Vercel,
  Cloud,

  // Package Managers
  NPM,
  NVM,
  Yarn,
  Composer,
  Nuget,
  PackageManagers,

  // Source Control
  Git,
  GitLab,
  GitHub,
  TeamFoundationServer,
  SourceControl,

  // SQL
  MSSQL,
  MySQL,
  Oracle,
  PostgreSQL,
  SQLDatabase,

  // IDE
  MSSMS,
  VisualStudio,
  IDE,

  // NoSQL
  CosmosDB,
  MongoDB,
  NoSQLDatabase,

  // Microsoft Power Platform
  MicrosoftDataverse,
  MicrosoftPowerApps,
  MicrosoftPowerAutomate,
  MicrosoftPowerPages,
  MicrosoftPowerPlatform,

  // Mis
  Auth0,
  GoogleMaps,
  Saleforce,
  SonarQube,
  TeamDynamics,
  XRMToolBox,

  // Virtualization & Containerization
  Docker,
  VirtualBox,
  VirtualMachines,
  Vagrant,
  VirtualizationContainerization,

  // Web Servers
  IIS,
  LAMP,
  WebServers,
};
