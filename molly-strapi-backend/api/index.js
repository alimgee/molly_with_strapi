const strapi = require('@strapi/strapi');

let instance;

async function createStrapi() {
  if (!instance) {
    instance = await strapi().load();
  }
  return instance;
}

module.exports = async (req, res) => {
  try {
    const strapiInstance = await createStrapi();
    return strapiInstance.server.app.callback()(req, res);
  } catch (error) {
    console.error('Strapi initialization error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
