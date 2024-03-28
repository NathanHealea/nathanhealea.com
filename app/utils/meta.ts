import { MetaDescriptor } from '@remix-run/react';
import { Description, Keyword, SiteUrl, SocialMediaHandel, TagLine, Title } from '~/app.config';

/**
 * Gets default site title and tagline.
 * @returns {string} title and tagline combined
 */
export const getDefaultSiteTitle = () => {
  return `${Title} | ${TagLine}`;
};

/**
 * Gets default meta descriptor for open graph card to be renders as meta links.
 * @returns {Array<MetaDescriptor>} Meta Descriptors for open graph card.
 */
export const getDefaultOpenGraph = (): Array<MetaDescriptor> => {
  return [
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
};

/**
 * Gets default meta descriptor for twitter card to be renders as meta links.
 * @returns {Array<MetaDescriptor>} Meta Descriptors for twitter card.
 */
export const getDefaultTwitter = (): Array<MetaDescriptor> => {
  return [
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
};

/**
 * Meta descriptor of FavIons configurations.
 */
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

/**
 * Gets default meta descriptor to be renders as meta links.
 * @returns {Array<MetaDescriptor>} Array of meta descriptor.
 */
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
    ...getDefaultOpenGraph(),
    ...getDefaultTwitter(),
    ...FavIcons,
  ];
};
