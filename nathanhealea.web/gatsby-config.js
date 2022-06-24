module.exports = {
  siteMetadata: {
    siteUrl: 'https://www.yourdomain.tld',
    title: 'NathanHealea.com'
  },
  plugins: [
    'gatsby-plugin-postcss',
    `gatsby-plugin-fontawesome-css`,
    'gatsby-plugin-mdx',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: './src/pages/'
      },
      __key: 'pages'
    }
  ]
};
