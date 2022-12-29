/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'firebasestorage.googleapis.com',
      'picsum.photos',
      '0.gravatar.com',
      'loremflickr.com'
    ]
  }
};

module.exports = nextConfig;
