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
};

export default nextConfig;
