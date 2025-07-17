/**
 * Molly Rose Foundation - Custom Admin Middleware
 * Serves custom CSS and assets for the admin panel theming
 */

export default (config, { strapi }) => {
  return async (ctx, next) => {
    // Serve custom admin theme CSS
    if (ctx.path === '/admin/admin-theme.css') {
      const fs = require('fs');
      const path = require('path');
      
      try {
        const cssPath = path.join(strapi.dirs.app.src, 'admin', 'admin-theme.css');
        const cssContent = fs.readFileSync(cssPath, 'utf8');
        
        ctx.type = 'text/css';
        ctx.body = cssContent;
        return;
      } catch (error) {
        console.error('Error serving admin theme CSS:', error);
        ctx.status = 404;
        ctx.body = '/* Admin theme CSS not found */';
        return;
      }
    }
    
    // Continue with the next middleware
    await next();
  };
};
