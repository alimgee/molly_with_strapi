
const strapi = require("@strapi/strapi");

let instance;

async function setup() {
  if (!instance) {
    instance = await strapi({
      appDir: process.cwd(),
      serveAdminPanel: false,
    }).load();
  }
  return instance;
}

exports.handler = async (event, context) => {
  const app = await setup();

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
