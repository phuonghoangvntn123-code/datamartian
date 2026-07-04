/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      { source: '/product.php', destination: '/product' },
      { source: '/upload.php', destination: '/upload' },
      { source: '/docs.php', destination: '/docs' },
    ];
  },
};

export default nextConfig;
