/** @type {import('next').NextConfig} */

const strapiUrl = new URL(process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337');

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: strapiUrl.protocol.replace(':', ''),
        hostname: strapiUrl.hostname,
        port: strapiUrl.port || '',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'aoibheannspinktie.ie',
        port: '',
        pathname: '/imgs/**',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
        port: '',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'www.giveblood.ie',
        port: '',
        pathname: '/MicroSite/images/**',
      },
      {
        protocol: 'https',
        hostname: 'cmrf.org',
        port: '',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
}

module.exports = nextConfig
