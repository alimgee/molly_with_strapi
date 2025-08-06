const { createStrapi } = require('@strapi/strapi');
const path = require('path');

let instance;

async function createStrapiInstance() {
  if (!instance) {
    try {
      // Set the correct working directory for Strapi
      const strapiDir = path.resolve(__dirname, '..');
      process.chdir(strapiDir);
      
      console.log('Current working directory:', process.cwd());
      console.log('Looking for package.json at:', path.join(process.cwd(), 'package.json'));
      
      instance = await createStrapi({
        dir: strapiDir,
        distDir: path.join(strapiDir, 'dist')
      }).load();
      
      console.log('Strapi instance created successfully');
    } catch (error) {
      console.error('Failed to create Strapi instance:', error);
      throw error;
    }
  }
  return instance;
}

module.exports = async (req, res) => {
  try {
    console.log('Incoming request:', req.method, req.url);
    
    const strapiInstance = await createStrapiInstance();
    
    // Handle the request through Strapi
    return strapiInstance.server.app.callback()(req, res);
  } catch (error) {
    console.error('Strapi initialization error:', error);
    res.status(500).json({ 
      error: 'Internal Server Error',
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};
