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
            rejectUnauthorized: false, // Required for Render connections
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
