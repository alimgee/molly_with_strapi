export default () => ({
  // Customize content manager for better organization
  'content-manager': {
    config: {
      contentTypes: {
        // Medical Information Section
        'api::cancer-information.cancer-information': {
          kind: 'collectionType',
          settings: {
            searchable: true,
            filterable: true,
            bulkable: true,
            pageSize: 10,
            mainField: 'title',
            defaultSortBy: 'title',
            defaultSortOrder: 'ASC',
          },
          layouts: {
            list: ['title', 'category', 'publishedAt'],
            edit: [],
            editRelations: []
          },
          uid: 'api::cancer-information.cancer-information'
        },
        'api::treatment-information.treatment-information': {
          kind: 'collectionType',
          settings: {
            searchable: true,
            filterable: true,
            bulkable: true,
            pageSize: 10,
            mainField: 'title',
            defaultSortBy: 'title',
            defaultSortOrder: 'ASC',
          },
          layouts: {
            list: ['title', 'category', 'publishedAt'],
            edit: [],
            editRelations: []
          },
          uid: 'api::treatment-information.treatment-information'
        },
        // Support & Community Section  
        'api::support-organization.support-organization': {
          kind: 'collectionType',
          settings: {
            searchable: true,
            filterable: true,
            bulkable: true,
            pageSize: 10,
            mainField: 'name',
            defaultSortBy: 'name',
            defaultSortOrder: 'ASC',
          },
          layouts: {
            list: ['name', 'category', 'location'],
            edit: [],
            editRelations: []
          },
          uid: 'api::support-organization.support-organization'
        },
        'api::testimonial.testimonial': {
          kind: 'collectionType',
          settings: {
            searchable: true,
            filterable: true,
            bulkable: true,
            pageSize: 10,
            mainField: 'authorName',
            defaultSortBy: 'createdAt',
            defaultSortOrder: 'DESC',
          },
          layouts: {
            list: ['authorName', 'type', 'featured', 'publishedAt'],
            edit: [],
            editRelations: []
          },
          uid: 'api::testimonial.testimonial'
        },
        // Events & Campaigns Section
        'api::event.event': {
          kind: 'collectionType',
          settings: {
            searchable: true,
            filterable: true,
            bulkable: true,
            pageSize: 10,
            mainField: 'title',
            defaultSortBy: 'startDate',
            defaultSortOrder: 'DESC',
          },
          layouts: {
            list: ['title', 'eventType', 'startDate', 'location'],
            edit: [],
            editRelations: []
          },
          uid: 'api::event.event'
        },
        'api::awareness-campaign.awareness-campaign': {
          kind: 'collectionType',
          settings: {
            searchable: true,
            filterable: true,
            bulkable: true,
            pageSize: 10,
            mainField: 'title',
            defaultSortBy: 'startDate',
            defaultSortOrder: 'DESC',
          },
          layouts: {
            list: ['title', 'status', 'startDate', 'endDate'],
            edit: [],
            editRelations: []
          },
          uid: 'api::awareness-campaign.awareness-campaign'
        },
        'api::fundraising-campaign.fundraising-campaign': {
          kind: 'collectionType',
          settings: {
            searchable: true,
            filterable: true,
            bulkable: true,
            pageSize: 10,
            mainField: 'title',
            defaultSortBy: 'startDate',
            defaultSortOrder: 'DESC',
          },
          layouts: {
            list: ['title', 'status', 'goalAmount', 'currentAmount'],
            edit: [],
            editRelations: []
          },
          uid: 'api::fundraising-campaign.fundraising-campaign'
        },
        // Volunteer & Engagement Section
        'api::volunteer-opportunity.volunteer-opportunity': {
          kind: 'collectionType',
          settings: {
            searchable: true,
            filterable: true,
            bulkable: true,
            pageSize: 10,
            mainField: 'title',
            defaultSortBy: 'createdAt',
            defaultSortOrder: 'DESC',
          },
          layouts: {
            list: ['title', 'category', 'timeCommitment', 'location'],
            edit: [],
            editRelations: []
          },
          uid: 'api::volunteer-opportunity.volunteer-opportunity'
        },
        // News & Articles Section
        'api::article.article': {
          kind: 'collectionType',
          settings: {
            searchable: true,
            filterable: true,
            bulkable: true,
            pageSize: 10,
            mainField: 'title',
            defaultSortBy: 'publishedAt',
            defaultSortOrder: 'DESC',
          },
          layouts: {
            list: ['title', 'category', 'featured', 'publishedAt'],
            edit: [],
            editRelations: []
          },
          uid: 'api::article.article'
        }
      }
    }
  },
  
  // Enable content releases for staging content
  'content-releases': {
    enabled: true,
  },
  
  // Enable upload with local provider
  upload: {
    config: {
      provider: 'local',
      sizeLimit: 10 * 1024 * 1024, // 10MB
    },
  },
});
