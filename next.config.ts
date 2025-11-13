import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const withAnalyzer = bundleAnalyzer({ enabled: process.env.ANALYZE === "true" });

const nextConfig: NextConfig = {
  // Performance: Enable experimental features
  experimental: {
    optimizePackageImports: ['lucide-react', 'react-toastify'],
  },

  // Turbopack configuration (replaces experimental.turbo)
  turbopack: {
    resolveAlias: {
      // Optimize module resolution
      '@': './src',
    },
  },

  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "stepupy.duckdns.org",
        // port: "",
        pathname: "/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  
  compress: true,
  poweredByHeader: false,
  
  // Performance: Enable production optimizations
  productionBrowserSourceMaps: false,
  async headers() {
    return [
      {
        source: "/:all*(js|css|svg|png|jpg|jpeg|webp|avif)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:all*(json)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=600",
          },
        ],
      },
    ];
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*", 
        destination: "https://stepupy.duckdns.org/:path*", 
      },
    ];
  },
};

export default withAnalyzer(nextConfig);