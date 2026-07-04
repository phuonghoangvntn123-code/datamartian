/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['mysql2'],
  },
  async rewrites() {
    return [
      {
        source: '/product.php',
        destination: '/product',
      },
      {
        source: '/upload.php',
        destination: '/upload',
      },
      {
        source: '/docs.php',
        destination: '/docs',
      },
      {
        source: '/setup.php',
        destination: '/setup',
      },
      {
        source: '/robots.txt',
        destination: '/api/robots',
      },
    ];
  },
};

export default nextConfig;
