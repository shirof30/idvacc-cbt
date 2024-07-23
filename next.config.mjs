
/** @type {import('next').NextConfig} */

const nextConfig = {
    crossOrigin: 'anonymous',
    env: {
      APP_VERSION: process.env.npm_package_version || '',
    },
  };
  
  export default nextConfig;
  