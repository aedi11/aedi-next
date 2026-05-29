import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow serving images from the public folder
    unoptimized: false,
  },
  // Ensure clean builds
  reactStrictMode: true,
};

export default nextConfig;
