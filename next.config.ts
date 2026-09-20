import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/',
          destination: '/app.html',
        },
        {
          source: '/work/:path*',
          destination: '/app.html',
        },
        {
          source: '/motion/:path*',
          destination: '/app.html',
        },
        {
          source: '/lab/:path*',
          destination: '/app.html',
        },
        {
          source: '/about',
          destination: '/app.html',
        },
        {
          source: '/astra',
          destination: '/app.html',
        }
      ],
      afterFiles: [],
      fallback: []
    };
  },
};

export default nextConfig;
