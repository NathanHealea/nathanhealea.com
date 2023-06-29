import { TechnologyTier } from './page.type';

const technologies: Array<TechnologyTier> = [
  {
    name: '🦄 Tier',
    description: 'Mythical Tier',
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
    description: 'Awesome Tier',
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
    description: 'Meh Tier',
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
    description: 'Shit Tier',
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
    description: 'I Rather Be Dead Tier',
    color: 'blueberry',
    list: [
      {
        name: 'Java',
      },
    ],
  },
];

export default technologies;
