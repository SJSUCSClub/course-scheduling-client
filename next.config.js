/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        // match everything except the auth route
        source: '/api/:root((?!auth).*)/:slug*',
        destination: `${process.env.BACKEND_URL || ''}/:root/:slug*/`,
      },
    ];
  },
  skipTrailingSlashRedirect: true,
};

module.exports = nextConfig;
