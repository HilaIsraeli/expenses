/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['lh3.googleusercontent.com'],
    }
}

module.exports = {
    ...nextConfig,
    eslint: {
      ignoreDuringBuilds: true, // This will ignore ESLint errors during the build process
    },
    typescript: {
        ignoreBuildErrors: true, // This will ignore TypeScript errors during the build process
      },
  };
