import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // This allows any domain
        port: "", // Empty means any port
        pathname: "**", // Allows any path
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Exclude problematic modules from client-side bundles
      config.externals.push("clone-deep");
    }
    return config;
  },

};

export default nextConfig;
