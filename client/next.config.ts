import type { NextConfig } from "next";
import { hostname } from "os";
import { protocol } from "socket.io-client";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
