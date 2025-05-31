/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/HunterxJobs-Website' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/HunterxJobs-Website/' : '',
  trailingSlash: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: '/privacy',
        destination: '/privacy-policy',
        permanent: true,
      },
      {
        source: '/terms',
        destination: '/terms-of-service',
        permanent: true,
      },
    ]
  },
};

module.exports = nextConfig; 