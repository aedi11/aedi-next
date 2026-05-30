import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: false,
    formats: ["image/avif", "image/webp"],
    deviceSizes: [390, 430, 768, 1024, 1280, 1920],
    imageSizes: [64, 88, 120, 180, 256],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },
  reactStrictMode: true,
  compress: true,
  // Reduce JS payload — tree-shake large icon/animation libraries
  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react"],
  },
  // Aggressive HTTP caching for static assets
  async headers() {
    return [
      {
        source: "/images/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
