const withPWA = require("next-pwa");

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  reactStrictMode: true,
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV == "development",
    buildExcludes: [/middleware-manifest\.json$/],
  },
});

module.exports = nextConfig;
