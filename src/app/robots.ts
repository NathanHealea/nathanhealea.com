import { MetadataRoute } from 'next';
 
type Robots = {
  rules:
    | {
        userAgent?: string | string[];
        allow?: string | string[];
        disallow?: string | string[];
        crawlDelay?: number;
      }
    | Array<{
        userAgent: string | string[];
        allow?: string | string[];
        disallow?: string | string[];
        crawlDelay?: number;
      }>;
  sitemap?: string | string[];
  host?: string;
};

const robots = (): Robots => {
  return {
    rules: {
      userAgent: '*',
      allow: '/',    },
    sitemap: 'https://nathanhealea.com/sitemap.xml',
  };
}

export default robots;