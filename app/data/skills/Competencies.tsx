// ---- Project Management Methodologies ---- //

import { Skill } from './skills.types';

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

// --- Software Development Life Cycle ---- //

export const SoftwareDevelopmentLifeCycle: Skill = {
  machineName: 'sdlc',
  title: 'Software Development Life Cycle',
};

// ---- Software Architecture ---- //

export const EventDriven: Skill = {
  machineName: 'event-driven',
  title: 'Event Driven',
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
  technical: [EventDriven, REST, API, MVC, MicroService, Monolithic],
};

// ---- Database ---- //
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

export default {
  // Project Management Methodologies
  Agile,
  Waterfall,
  Scrum,
  Kanban,
  Methodologies,

  // Software Development Life Cycle
  SoftwareDevelopmentLifeCycle,

  // Software Architecture
  REST,
  API,
  MVC,
  MicroService,
  Monolithic,
  SoftwareArchitecture,

  // Database
  RDMS,
  Procedure,
  Function,
  Permission,
  View,
  Database,
};
