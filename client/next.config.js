/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "www.gravatar.com",
      "localhost",
      "ec2-18-182-62-191.ap-northeast-1.compute.amazonaws.com",
    ],
  },
};

module.exports = nextConfig;
