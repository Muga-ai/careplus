import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "media.istockphoto.com", // Added for your current hero image
      },
      // Optional: Add more trusted sources later as needed
      // {
      //   protocol: "https",
      //   hostname: "www.shutterstock.com",
      // },
    ],
  },
}; // ← Removed trailing comma here (this was causing the error)

export default nextConfig;