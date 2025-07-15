// Layout and navigation-specific API calls and types
import { strapiRequest } from './config';

// Types for Navigation
export interface StrapiNavigationItem {
  id: number;
  documentId: string;
  label: string;
  url: string;
  title?: string;
  order: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  url: string;
  title?: string;
  order: number;
}

// Types for Footer
export interface StrapiFooterContent {
  id: number;
  documentId: string;
  content: string;
  order: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface FooterContent {
  id: string;
  content: string;
  order: number;
}

// Transform functions
export function transformStrapiNavigationItem(strapiData: StrapiNavigationItem): NavigationItem {
  return {
    id: strapiData.id.toString(),
    label: strapiData.label,
    url: strapiData.url,
    title: strapiData.title,
    order: strapiData.order,
  };
}

export function transformStrapiFooterContent(strapiData: StrapiFooterContent): FooterContent {
  return {
    id: strapiData.id.toString(),
    content: strapiData.content,
    order: strapiData.order,
  };
}

// API functions
export async function fetchNavigationItems(): Promise<NavigationItem[]> {
  // Fallback navigation for when API fails
  const fallbackNavigation: NavigationItem[] = [
    { id: "1", label: "Home", url: "/", title: "Go to landing page of site", order: 1 },
    { id: "2", label: "Mollys Story", url: "/story", title: "Find out more about Molly Rose", order: 2 },
    { id: "3", label: "Cancer", url: "/childhoodcancer", title: "Find out more about Childhood Cancer", order: 3 },
    { id: "4", label: "News", url: "/news", title: "The latest news for Molly Rose", order: 4 },
    { id: "5", label: "Events", url: "/events", title: "Find out about upcoming events", order: 5 },
    { id: "6", label: "Gallery", url: "/gallery", title: "Image gallery for Molly Rose", order: 6 },
  ];

  try {
    const data = await strapiRequest<{ data: StrapiNavigationItem[] }>('/api/navigation-items?sort=order:asc');
    
    if (data?.data) {
      if (data.data.length === 0) {
        return []; // Return empty array if no data, not fallback
      }
      return data.data.map(transformStrapiNavigationItem);
    }
    
    return fallbackNavigation;
  } catch (error) {
    console.error('Failed to fetch navigation items:', error);
    return fallbackNavigation;
  }
}

export async function fetchFooterContent(): Promise<FooterContent[]> {
  try {
    const data = await strapiRequest<{ data: StrapiFooterContent[] }>('/api/footer-contents?sort=order:asc');
    
    if (data?.data) {
      return data.data.map(transformStrapiFooterContent);
    }
    
    return [];
  } catch (error) {
    console.error('Failed to fetch footer content:', error);
    return [];
  }
}
