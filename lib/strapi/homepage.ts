// Homepage-specific API calls and types
import { strapiRequest } from './config';

// Types for Homepage content
export interface StrapiHomepageBanner {
  id: number;
  documentId: string;
  name: string;
  title: string;
  description: string;
  linkText?: string;
  linkUrl?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface HomepageBanner {
  id: string;
  name: string;
  title: string;
  description: string;
  linkText?: string;
  linkUrl?: string;
  isActive: boolean;
}

export interface StrapiHeroSection {
  id: number;
  documentId: string;
  title: string;
  subtitle?: string;
  content?: string;
  imageUrl?: string;
  buttonText?: string;
  buttonUrl?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface HeroSection {
  id: string;
  title: string;
  subtitle?: string;
  content?: string;
  imageUrl?: string;
  buttonText?: string;
  buttonUrl?: string;
}

export interface StrapiQuote {
  id: number;
  documentId: string;
  text: string;
  author?: string;
  role?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Quote {
  id: string;
  text: string;
  author?: string;
  role?: string;
}

// Transform functions
export function transformStrapiHomepageBanner(strapiData: StrapiHomepageBanner): HomepageBanner {
  return {
    id: strapiData.id.toString(),
    name: strapiData.name,
    title: strapiData.title,
    description: strapiData.description,
    linkText: strapiData.linkText,
    linkUrl: strapiData.linkUrl,
    isActive: strapiData.isActive,
  };
}

export function transformStrapiHeroSection(strapiData: StrapiHeroSection): HeroSection {
  return {
    id: strapiData.id.toString(),
    title: strapiData.title,
    subtitle: strapiData.subtitle,
    content: strapiData.content,
    imageUrl: strapiData.imageUrl,
    buttonText: strapiData.buttonText,
    buttonUrl: strapiData.buttonUrl,
  };
}

export function transformStrapiQuote(strapiData: StrapiQuote): Quote {
  return {
    id: strapiData.id.toString(),
    text: strapiData.text,
    author: strapiData.author,
    role: strapiData.role,
  };
}

// API functions
export async function fetchHomepageBanner(): Promise<HomepageBanner | null> {
  // Fallback banner for when API fails
  const fallbackBanner: HomepageBanner = {
    id: '1',
    name: 'Blood Donation Default',
    title: 'Give blood, save a childs life',
    description: 'Blood Donations are essential during the treatment of childhood cancer. During lockdown the Irish Blood transfusion board continue to need your help.',
    linkText: 'Find a Clinic',
    linkUrl: 'https://www.giveblood.ie/Find-a-Clinic/Clinic-Finder/',
    isActive: true,
  };

  try {
    const data = await strapiRequest<{ data: StrapiHomepageBanner[] }>('/api/homepage-banners?filters[isActive][$eq]=true');
    
    if (data?.data && data.data.length > 0) {
      return transformStrapiHomepageBanner(data.data[0]);
    }
    
    return null;
  } catch (error) {
    console.error('Failed to fetch homepage banner:', error);
    return fallbackBanner;
  }
}

export async function fetchHeroSections(): Promise<HeroSection[]> {
  try {
    const data = await strapiRequest<{ data: StrapiHeroSection[] }>('/api/hero2s?sort=id:asc');
    
    if (data?.data) {
      return data.data.map(transformStrapiHeroSection);
    }
    
    return [];
  } catch (error) {
    console.error('Failed to fetch hero sections:', error);
    return [];
  }
}

export async function fetchQuotes(): Promise<Quote[]> {
  try {
    const data = await strapiRequest<{ data: StrapiQuote[] }>('/api/quotes?sort=id:asc');
    
    if (data?.data) {
      return data.data.map(transformStrapiQuote);
    }
    
    return [];
  } catch (error) {
    console.error('Failed to fetch quotes:', error);
    return [];
  }
}
