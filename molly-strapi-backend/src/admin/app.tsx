import type { StrapiApp } from '@strapi/strapi/admin';

export default {
  config: {
    // Minimal Molly Rose Foundation branding
    head: {
      favicon: '/favicon.png',
      title: 'Molly Rose Foundation CMS',
    },
    locales: ['en'],
    
    // Basic theme with foundation colors only
    theme: {
      light: {
        colors: {
          primary500: '#b1225a',
          primary600: '#9f1f52',
          primary700: '#8d1c48',
        }
      },
      dark: {
        colors: {
          primary500: '#b1225a',
          primary600: '#c92d63', 
          primary700: '#d63d6f',
        }
      },
    },
    
    // Disable potentially problematic features
    tutorials: false,
    notifications: {
      releases: false,
    },
  },
  
  bootstrap(app: StrapiApp) {
    console.log('🌟 Molly Rose Foundation Admin Panel initialized');
    
    // Safe customizations only - no trial banner manipulation
    const initSafeCustomizations = () => {
      // Only run once
      if (document.querySelector('#molly-safe-init')) return;
      
      // Mark as completed
      const marker = document.createElement('meta');
      marker.id = 'molly-safe-init';
      document.head.appendChild(marker);
      
      // Update favicon
      const link = document.createElement('link');
      link.rel = 'icon';
      link.type = 'image/png';
      link.href = '/favicon.png';
      document.head.appendChild(link);
      
      // Update page title
      document.title = 'Molly Rose Foundation CMS';
    };
    
    // Run when DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initSafeCustomizations);
    } else {
      initSafeCustomizations();
    }
  },
};
