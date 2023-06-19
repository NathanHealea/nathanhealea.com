import { TechnologyGroup } from './page.type';

const technologies: Array<TechnologyGroup> = [
  {
    name: '🦄 Tier',
    color: 'strawberry',
    list: [
      {
        name: 'Javascript',
        icon: 'javascript',
      },
      {
        name: 'TypeScript',
        icon: 'typescript',
      },
      {
        name: 'React',
        icon: 'react',
      },
      {
        name: 'NextJS',
        icon: 'nextdotjs',
      },
      {
        name: 'TailwindCSS',
        icon: 'tailwindcss',
      },
    ],
  },
  {
    name: '✨ Tier',
    color: 'apricot',
    list: [
      {
        name: 'C#',
        icon: 'csharp',
      },
      {
        name: '.NET Core',
        icon: 'dotnet',
      },
      {
        name: 'Material UI',
        icon: 'mui',
      },
      {
        name: 'NodeJS',
        icon: 'nodedotjs',
      },
    ],
  },
  {
    name: '〰️ Tier',
    color: 'lemon',
    list: [
      {
        name: 'Python',
        icon: 'python',
      },
    ],
  },
  {
    name: '💩 Tier',
    color: 'apple',
    list: [
      { name: 'PHP', icon: 'php' },
      {
        name: '.NET Framework',
        icon: 'dotnet',
      },
    ],
  },
  {
    name: '⚰️ Tier',
    color: 'blueberry',
    list: [
      {
        name: 'Java',
      },
    ],
  },
];

export default technologies;
