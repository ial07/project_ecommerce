import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   images: {
    domains: ["static.vecteezy.com","static-ecapac.acer.com","www.mobiledokan.com","static-ecapac.acer.com","res.cloudinary.com"], // allow image src
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**", // allow all Cloudinary paths
      },
      {
        protocol: "https",
        hostname: "i.pinimg.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
