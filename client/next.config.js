/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "www.gravatar.com",
      "localhost",
      "ec2-54-95-109-247.ap-northeast-1.compute.amazonaws.com",
    ],
  },
};

module.exports = nextConfig;
