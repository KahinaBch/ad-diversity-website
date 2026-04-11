import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/ad-diversity-website",
  assetPrefix: "/ad-diversity-website/",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
