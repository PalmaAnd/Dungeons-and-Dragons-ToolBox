/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'media-waterdeep.cursecdn.com',
            port: '',
            pathname: '/**',
            search: '',
          },
        ],
      },
};

module.exports = nextConfig;
