import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  // Pin the workspace root: the experiments under public/exp carry their own
  // lockfiles, which makes Next 16 / Turbopack mis-infer the root as ./app and
  // fail local `next dev`/`next build`. This anchors it to the project dir.
  turbopack: {
    root: __dirname,
  },
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/portfolio.html',
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/index.html',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
