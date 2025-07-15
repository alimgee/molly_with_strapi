// Main index file for organized Strapi API
// This provides a clean interface for importing functions

// Re-export everything from organized modules
export * from './config';
export * from './homepage';
export * from './layout';
export * from './content';
export * from './cancer-info';

// Import functions for grouped objects
import { fetchHomepageBanner, fetchHeroSections, fetchQuotes } from './homepage';
import { fetchNavigationItems, fetchFooterContent } from './layout';
import { fetchArticles, fetchArticleById, fetchFirstArticle } from './content';
import { 
  fetchCancerInformation, 
  fetchSupportOrganizations, 
  fetchCancerSigns, 
  fetchCancerSymptoms, 
  fetchCancerTypes, 
  fetchCharities, 
  fetchHospitals 
} from './cancer-info';

// Grouped API objects for easier organization
export const homepageAPI = {
  getBanners: fetchHomepageBanner,
  getHeroSections: fetchHeroSections,
  getQuotes: fetchQuotes,
};

export const layoutAPI = {
  getNavigation: fetchNavigationItems,
  getFooter: fetchFooterContent,
};

export const contentAPI = {
  getArticles: fetchArticles,
  getArticleById: fetchArticleById,
  getFirstArticle: fetchFirstArticle,
};

export const cancerAPI = {
  getInformation: fetchCancerInformation,
  getSupportOrgs: fetchSupportOrganizations,
  getSigns: fetchCancerSigns,
  getSymptoms: fetchCancerSymptoms,
  getTypes: fetchCancerTypes,
  getCharities: fetchCharities,
  getHospitals: fetchHospitals,
};
