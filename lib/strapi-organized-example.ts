// Example: Better organized Strapi API structure
// You could organize your API calls by feature/page

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

// Homepage related content
export const homepageAPI = {
  getBanners: () => fetch(`${STRAPI_URL}/api/homepage-banners?filters[isActive][$eq]=true`),
  getHeroSections: () => fetch(`${STRAPI_URL}/api/hero2s?sort=id:asc`),
  getQuotes: () => fetch(`${STRAPI_URL}/api/quotes?sort=id:asc`),
}

// Navigation/Layout related content  
export const layoutAPI = {
  getNavigation: () => fetch(`${STRAPI_URL}/api/navigation-items?sort=order:asc`),
  getFooter: () => fetch(`${STRAPI_URL}/api/footer-contents?sort=order:asc`),
}

// Content related 
export const contentAPI = {
  getArticles: () => fetch(`${STRAPI_URL}/api/articles?sort=publicationDate:desc`),
  getArticleById: (id: string) => fetch(`${STRAPI_URL}/api/articles/${id}`),
}

// This would make your imports cleaner:
// import { homepageAPI, layoutAPI, contentAPI } from '@/lib/strapi-organized'
