/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['a.storyblok.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'a.storyblok.com',
        pathname: '/f/**',
      },
    ],
  },
  env: {
    STORYBLOK_API_TOKEN: process.env.STORYBLOK_API_TOKEN,
    STORYBLOK_PREVIEW_TOKEN: process.env.STORYBLOK_PREVIEW_TOKEN,
    STORYBLOK_SPACE_ID: process.env.STORYBLOK_SPACE_ID,
  },
  typescript: {
    ignoreBuildErrors: true, // FIXME fix and remove after
  },
  eslint: {
    ignoreDuringBuilds: true, // FIXME fix and remove after
  },
};

export default nextConfig;
