
const path = require('path');
const strapi = require('@strapi/strapi');

let instance;

async function setup() {
  if (!instance) {
    // Use path.join to ensure the path is correct regardless of the OS
    const appDir = path.join(__dirname, '..');
    instance = await strapi({
      appDir: appDir,
      serveAdminPanel: false, // We let Netlify handle the admin panel
    }).load();
  }
  return instance;
}

exports.handler = async (event) => {
  const app = await setup();

  // Remap the Netlify event to a format Strapi's router understands
  const request = {
    method: event.httpMethod,
    url: event.path,
    headers: event.headers,
    body: event.body ? JSON.parse(event.body) : undefined,
  };

  const response = await app.server.router.route(request);

  return {
    statusCode: response.status,
    body: JSON.stringify(response.body),
    headers: response.headers,
  };
};
