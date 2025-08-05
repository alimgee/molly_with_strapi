export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
  // Vercel-specific configurations
  ...(env('NODE_ENV') === 'production' && {
    url: env('PUBLIC_URL'), // This should be your Vercel deployment URL
  }),
});
