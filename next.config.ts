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
  // Enable compression
  compress: true,
  // Reduce JS payload
  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react"],
  },
};

export default nextConfig;
