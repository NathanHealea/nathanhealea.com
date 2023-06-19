/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  redirects: async () => {
    let redirects = [];

    if (process.env.NODE_ENV === 'production') {
      redirects.push({
        source: '/theme',
        destination: '/',
        permanent: true,
      });
    }

    return redirects;
  },

  images: {
    dangerouslyAllowSVG: true,

    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.simpleicons.org',
      },
    ],
  },
};

module.exports = nextConfig;
