/**
 * Molly Rose Foundation - User Roles Configuration
 * This file defines the recommended user roles and permissions for the foundation CMS
 */

export const userRoles = {
  // 1. Content Editor - Can create and edit most content
  contentEditor: {
    name: 'Content Editor',
    description: 'Can create and edit general content but cannot publish medical information',
    permissions: {
      // Full access to general content
      'api::article.article': ['create', 'read', 'update', 'delete'],
      'api::event.event': ['create', 'read', 'update', 'delete'],
      'api::awareness-campaign.awareness-campaign': ['create', 'read', 'update', 'delete'],
      'api::fundraising-campaign.fundraising-campaign': ['create', 'read', 'update', 'delete'],
      'api::volunteer-opportunity.volunteer-opportunity': ['create', 'read', 'update', 'delete'],
      'api::support-organization.support-organization': ['create', 'read', 'update', 'delete'],
      'api::testimonial.testimonial': ['create', 'read', 'update', 'delete'],
      
      // Limited access to medical content (can draft but not publish)
      'api::cancer-information.cancer-information': ['create', 'read', 'update'],
      'api::treatment-information.treatment-information': ['create', 'read', 'update'],
      
      // Media library access
      'plugin::upload.read': true,
      'plugin::upload.assets.create': true,
      'plugin::upload.assets.update': true
    }
  },

  // 2. Medical Reviewer - Can review and approve medical content
  medicalReviewer: {
    name: 'Medical Reviewer',
    description: 'Healthcare professional who can review and approve medical information',
    permissions: {
      // Full access to medical content
      'api::cancer-information.cancer-information': ['create', 'read', 'update', 'delete', 'publish'],
      'api::treatment-information.treatment-information': ['create', 'read', 'update', 'delete', 'publish'],
      
      // Read access to other content for context
      'api::article.article': ['read'],
      'api::testimonial.testimonial': ['read'],
      'api::support-organization.support-organization': ['read'],
      
      // Media library read access
      'plugin::upload.read': true
    }
  },

  // 3. Volunteer Coordinator - Manages volunteer and event content
  volunteerCoordinator: {
    name: 'Volunteer Coordinator',
    description: 'Manages volunteer opportunities and coordinates events',
    permissions: {
      // Full access to volunteer and event content
      'api::volunteer-opportunity.volunteer-opportunity': ['create', 'read', 'update', 'delete'],
      'api::event.event': ['create', 'read', 'update', 'delete'],
      'api::testimonial.testimonial': ['create', 'read', 'update', 'delete'],
      
      // Read access to other content
      'api::article.article': ['read'],
      'api::support-organization.support-organization': ['read'],
      'api::cancer-information.cancer-information': ['read'],
      'api::treatment-information.treatment-information': ['read'],
      
      // Media library access
      'plugin::upload.read': true,
      'plugin::upload.assets.create': true,
      'plugin::upload.assets.update': true
    }
  },

  // 4. Marketing Manager - Manages campaigns and public content
  marketingManager: {
    name: 'Marketing Manager',
    description: 'Manages awareness campaigns, fundraising, and public-facing content',
    permissions: {
      // Full access to marketing content
      'api::awareness-campaign.awareness-campaign': ['create', 'read', 'update', 'delete'],
      'api::fundraising-campaign.fundraising-campaign': ['create', 'read', 'update', 'delete'],
      'api::article.article': ['create', 'read', 'update', 'delete'],
      'api::event.event': ['create', 'read', 'update', 'delete'],
      'api::testimonial.testimonial': ['create', 'read', 'update', 'delete'],
      
      // Read access to support and medical content for context
      'api::support-organization.support-organization': ['read'],
      'api::cancer-information.cancer-information': ['read'],
      'api::treatment-information.treatment-information': ['read'],
      
      // Full media library access
      'plugin::upload.read': true,
      'plugin::upload.assets.create': true,
      'plugin::upload.assets.update': true,
      'plugin::upload.assets.delete': true
    }
  },

  // 5. Foundation Admin - Full access to everything
  foundationAdmin: {
    name: 'Foundation Admin',
    description: 'Full administrative access to all foundation content and settings',
    permissions: {
      // Full access to all content types
      'api::cancer-information.cancer-information': ['create', 'read', 'update', 'delete', 'publish'],
      'api::treatment-information.treatment-information': ['create', 'read', 'update', 'delete', 'publish'],
      'api::support-organization.support-organization': ['create', 'read', 'update', 'delete'],
      'api::testimonial.testimonial': ['create', 'read', 'update', 'delete'],
      'api::event.event': ['create', 'read', 'update', 'delete'],
      'api::awareness-campaign.awareness-campaign': ['create', 'read', 'update', 'delete'],
      'api::fundraising-campaign.fundraising-campaign': ['create', 'read', 'update', 'delete'],
      'api::volunteer-opportunity.volunteer-opportunity': ['create', 'read', 'update', 'delete'],
      'api::article.article': ['create', 'read', 'update', 'delete'],
      
      // Full system access
      'admin::*': true,
      'plugin::*': true
    }
  }
};

// Workflow recommendations
export const workflowGuidelines = {
  medicalContent: {
    process: [
      'Content Editor creates draft medical content',
      'Medical Reviewer reviews and approves content', 
      'Content marked as "medically reviewed" before publication',
      'Regular review cycle every 6 months'
    ],
    requiredFields: ['medicallyReviewed', 'reviewDate', 'reviewedBy']
  },

  eventManagement: {
    process: [
      'Volunteer Coordinator creates event',
      'Marketing Manager reviews for promotional opportunities',
      'Foundation Admin approves budget and logistics',
      'Publication and promotion'
    ]
  },

  campaignLaunch: {
    process: [
      'Marketing Manager creates campaign draft',
      'Foundation Admin reviews goals and budget',
      'Content team creates supporting materials',
      'Launch and monitoring'
    ]
  }
};

// Instructions for setting up roles in Strapi
export const setupInstructions = {
  steps: [
    '1. Go to Settings > Administration Panel > Roles',
    '2. Create new roles using the names above',
    '3. Configure permissions for each role according to the permissions object',
    '4. Create users and assign appropriate roles',
    '5. Test access with each role to ensure proper restrictions'
  ],
  
  defaultUsers: [
    {
      role: 'Foundation Admin',
      email: 'admin@mollyrosefoundation.org',
      purpose: 'Main administrative account'
    },
    {
      role: 'Medical Reviewer',
      email: 'medical@mollyrosefoundation.org',
      purpose: 'Healthcare professional for content review'
    },
    {
      role: 'Content Editor',
      email: 'content@mollyrosefoundation.org', 
      purpose: 'Day-to-day content management'
    },
    {
      role: 'Volunteer Coordinator',
      email: 'volunteers@mollyrosefoundation.org',
      purpose: 'Volunteer and event management'
    }
  ]
};

console.log('👥 User Roles Configuration loaded');
console.log('Available roles:', Object.keys(userRoles));
console.log('Setup these roles in Strapi Admin > Settings > Roles');
