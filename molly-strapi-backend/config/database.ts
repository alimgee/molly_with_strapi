import path from 'path';

export default ({ env }) => {
  const isProduction = env('NODE_ENV') === 'production';

  // Production configuration using DATABASE_URL
  if (isProduction) {
    return {
      connection: {
        client: 'postgres',
        connection: {
          connectionString: env('DATABASE_URL'),
          ssl: {
            rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', false), // Heroku, Render, etc. require this
            require: env.bool('DATABASE_SSL_REQUIRE', true), // Supabase requires this
          },
        },
        pool: {
          min: env.int('DATABASE_POOL_MIN', 2),
          max: env.int('DATABASE_POOL_MAX', 10),
        },
      },
    };
  }

  // Development/default configuration
  return {
    connection: {
      client: 'sqlite',
      connection: {
        filename: path.join(__dirname, '..', '..', env('DATABASE_FILENAME', '.tmp/data.db')),
      },
      useNullAsDefault: true,
    },
  };
};
