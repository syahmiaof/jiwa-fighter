/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Guarantees local webp/png fast serving without external server dependencies
  },
  async redirects() {
    return [
      {
        source: '/silat-series',
        destination: '/collections/silat-series',
        permanent: true,
      },
      {
        source: '/customer-care',
        destination: '/support',
        permanent: true,
      },
      {
        source: '/care',
        destination: '/support',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
