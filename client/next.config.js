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
    unoptimized: true,
  },
  webpack: (config, context) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };
    return config;
  },
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    if (dev) {
      return defaultPathMap;
    }

    // 해당 페이지를 제외한 다른 페이지들은 정적으로 생성하도록 설정
    delete defaultPathMap["/r/[sub]/create"];
    delete defaultPathMap["/subs/create"];

    return defaultPathMap;
  },
};

module.exports = nextConfig;
