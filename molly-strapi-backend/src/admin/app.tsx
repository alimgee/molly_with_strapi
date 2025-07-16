import type { StrapiApp } from '@strapi/strapi/admin';

export default {
  config: {
    // Customize the admin panel
    head: {
      favicon: '/favicon.ico',
    },
    locales: ['en'],
    // Add custom theme for Molly Rose Foundation
    theme: {
      // You can customize colors here if needed
      light: {},
      dark: {},
    },
    // Customize menu
    menu: {
      logo: '/favicon.ico',
    },
    // Custom translations for better UX
    translations: {
      en: {
        'content-manager.containers.Home.introduction': 'Welcome to the Molly Rose Foundation Content Management System',
        'content-manager.containers.Home.subtitle': 'Manage content for raising awareness about childhood cancer',
        // Group content types with better names
        'content-manager.models.cancer-information.name': 'Cancer Information',
        'content-manager.models.treatment-information.name': 'Treatment Information', 
        'content-manager.models.support-organization.name': 'Support Organizations',
        'content-manager.models.testimonial.name': 'Testimonials',
        'content-manager.models.awareness-campaign.name': 'Awareness Campaigns',
        'content-manager.models.fundraising-campaign.name': 'Fundraising Campaigns',
        'content-manager.models.volunteer-opportunity.name': 'Volunteer Opportunities',
        'content-manager.models.event.name': 'Events',
        'content-manager.models.article.name': 'News Articles',
      },
    },
  },
  bootstrap(app: StrapiApp) {
    console.log('Molly Rose Foundation Admin Panel initialized');
    
    // Custom styling or functionality can be added here
    // For example, we could inject custom CSS or modify the admin interface
    
    // Add custom favicon if needed
    const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
    if (favicon) {
      favicon.href = '/favicon.ico';
    }

    // You could also organize the menu items here if needed
    // This would require more advanced customization with plugins
  },
};
