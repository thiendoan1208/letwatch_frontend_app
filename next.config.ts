import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    typedRoutes: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "phimimg.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
  