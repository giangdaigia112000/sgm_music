/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    env: {
        HOST_NAME_API: process.env.HOST_NAME_API,
        HOST_NAME_STREAM: process.env.HOST_NAME_STREAM,
    },
};

module.exports = nextConfig;
