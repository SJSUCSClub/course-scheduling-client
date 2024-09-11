/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {"source": "/api/core/:slug*", "destination": `${process.env.BACKEND_URL||''}/:slug*/`}
    ]
  },
  skipTrailingSlashRedirect: true,
};

module.exports = nextConfig;
