/** @type {import('next').NextModel} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'image.tmdb.org' },
      { protocol: 'https', hostname: 'via.placeholder.com' }
    ]
  }
};

export default nextConfig;
