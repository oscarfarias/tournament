/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    APP_API_URL: process.env.APP_API_URL,
  },
  publicRuntimeConfig: {
    APP_API_URL: process.env.APP_API_URL,
    NODE_ENV: process.env.NODE_ENV,
  },
  swcMinify: false,
}

module.exports = nextConfig
