/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "s3-media1.fl.yelpcdn.com",
      "s3-media2.fl.yelpcdn.com",
      "s3-media3.fl.yelpcdn.com",
      "s3-media4.fl.yelpcdn.com",
      "s3-media5.fl.yelpcdn.com",
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
