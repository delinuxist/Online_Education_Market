/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["j-learn-bucket.s3.amazonaws.com"],
  },
};

module.exports = nextConfig;
