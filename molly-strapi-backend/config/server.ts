export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET'),
    },
    serveAdminPanel: env.bool('SERVE_ADMIN_PANEL', true),
    url: env('PUBLIC_ADMIN_URL', '/admin'),
  },
});
