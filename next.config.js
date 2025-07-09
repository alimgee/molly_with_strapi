/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
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
