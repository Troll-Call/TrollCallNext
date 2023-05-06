/** @type {import('next').NextConfig} */
const json = require('./package.json');
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: json
};

module.exports = nextConfig;
