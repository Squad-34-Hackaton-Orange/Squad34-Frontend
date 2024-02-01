/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/login',
      },
    ];
  },
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
};

export default nextConfig;

