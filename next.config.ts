import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Avoid blocking production builds due to ESLint config mismatches in CI
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;
