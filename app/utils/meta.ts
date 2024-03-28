import { MetaDescriptor } from '@remix-run/react';
import {
  Description,
  Keyword,
  SiteUrl,
  SocialMediaHandel,
  TagLine,
  Title,
} from '~/app.config';

export const getDefaultSiteTitle = () => {
  return `${Title} | ${TagLine}`;
};

export const OpenGraph: Array<MetaDescriptor> = [
  {
    name: 'og:type',
    content: 'website',
  },
  {
    name: 'og:title',
    title: getDefaultSiteTitle(),
  },
  {
    name: 'og:description',
    content: Description,
  },
  {
    name: 'og:url',
    content: SiteUrl,
  },
  { name: 'og:image', content: '' },
];

export const Twitter: Array<MetaDescriptor> = [
  { name: 'twitter:card', content: 'summary_large_image' },
  { name: 'twitter:site', content: SocialMediaHandel },
  { name: 'twitter:title', content: getDefaultSiteTitle() },
  { name: 'twitter:description', content: Description },
  { name: 'twitter:site:id', content: '2654889620' },
  { name: 'twitter:creator', content: SocialMediaHandel },
  { name: 'twitter:creator:id', content: '2654889620' },
  { name: 'twitter:image', content: '' },
  { name: 'twitter:image:alt', content: '' },
];

export const FavIcons: Array<MetaDescriptor> = [
  {
    rel: 'apple-touch-icon',
    sizes: '180x180',
    href: '/apple-touch-icon.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '32x32',
    href: '/favicon-32x32.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '16x16',
    href: '/favicon-16x16.png',
  },
  {
    rel: 'icon',
    type: 'image/x-icon',
    href: '/favicon.ico',
  },
  { rel: 'manifest', href: '/site.webmanifest' },
];

export const getDefaultMetaData = (): Array<MetaDescriptor> => {
  return [
    {
      title: getDefaultSiteTitle(),
    },
    {
      name: 'description',
      content: Description,
    },
    {
      name: 'keywords',
      content: Keyword.join(' '),
    },
    {
      name: 'og:local',
      content: 'en_US',
    },
    ...OpenGraph,
    ...Twitter,
    ...FavIcons,
  ];
};
