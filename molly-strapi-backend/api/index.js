const { createStrapi } = require('@strapi/strapi');

let instance;

async function getStrapiInstance() {
  if (!instance) {
    try {
      instance = await createStrapi().load();
    } catch (error) {
      console.error('Failed to create Strapi instance:', error);
      throw error;
    }
  }
  return instance;
}

module.exports = async (req, res) => {
  try {
    const strapiInstance = await getStrapiInstance();
    return strapiInstance.server.app.callback()(req, res);
  } catch (error) {
    console.error('Strapi initialization error:', error);
    res.status(500).json({ 
      error: 'Internal Server Error',
      message: error.message 
    });
  }
};
