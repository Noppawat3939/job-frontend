/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    googleApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
  },
};

export default nextConfig;
