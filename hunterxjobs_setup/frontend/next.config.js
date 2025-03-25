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
};

module.exports = nextConfig; 