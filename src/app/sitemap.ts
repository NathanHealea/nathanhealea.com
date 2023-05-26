import { MetadataRoute } from 'next';

type Sitemap = Array<{
  url: string;
  lastModified?: string | Date;
}>;

const sitemap = (): Sitemap => {
  return [
    {
      url: 'https://nathanhealea.com',
      lastModified: new Date(),
    },
    {
      url: 'https://nathanhealea.com/social',
      lastModified: new Date(),
    },
  ];
};


export default sitemap;