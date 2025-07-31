import { strapiRequest } from './config';

// Type for a single Cancer Information item from Strapi
export interface StrapiCancerInfo {
  id: number;
  title: string;
  content: any; // Rich text content
  category: 'signs' | 'types' | 'causes' | 'treatment' | 'support';
  order: number;
  isVisible: boolean;
  summary?: string;
  slug: string;
}

// Type for the transformed Cancer Information data
export interface CancerInfo {
  id: string;
  title: string;
  content: string;
  category: string;
  order: number;
}

// Transform function for Cancer Information data
export function transformStrapiCancerInfo(item: StrapiCancerInfo): CancerInfo {
  let contentText = '';
  if (Array.isArray(item.content)) {
    contentText = item.content
      .map((block: any) => {
        if (block.type === 'paragraph' && block.children) {
          return block.children.map((child: any) => child.text || '').join('');
        }
        return '';
      })
      .filter(Boolean)
      .join('\n\n'); // Use newlines to separate paragraphs
  } else if (typeof item.content === 'string') {
    contentText = item.content;
  }

  return {
    id: item.id.toString(),
    title: item.title,
    content: contentText,
    category: item.category,
    order: item.order,
  };
}

// API function to fetch cancer information by category
export async function fetchCancerInfoByCategory(category: string): Promise<CancerInfo[]> {
  try {
    const query = `/api/cancer-informations?filters[category][$eq]=${category}&sort=order:asc`;
    const data = await strapiRequest<{ data: StrapiCancerInfo[] }>(query);

    if (data?.data) {
      return data.data.map(transformStrapiCancerInfo);
    }

    return [];
  } catch (error) {
    console.error(`Failed to fetch cancer information for category ${category}:`, error);
    return [];
  }
}



// Type for a single Support Organization from Strapi
export interface StrapiSupportOrganization {
  id: number;
  name: string;
  description: any; // Rich text
  website?: string;
  phone?: string;
  email?: string;
  logo?: {
    url: string;
    alternativeText?: string;
  };
  category?: string;
  featured?: boolean;
  isActive?: boolean;
}

// Type for the transformed Support Organization data
export interface SupportOrg {
  id: string;
  name: string;
  description: string;
  website?: string;
  phone?: string;
  email?: string;
  logoUrl?: string;
  logoAlt?: string;
  category?: string;
  featured?: boolean;
  isActive?: boolean;
}

// Transform function for Support Organization data
export function transformSupportOrganization(
  item: StrapiSupportOrganization
): SupportOrg | null {
  if (!item || !item.name) {
    console.warn('Skipping invalid support organization item:', item);
    return null;
  }

  let descriptionText = '';
  if (Array.isArray(item.description)) {
    descriptionText = item.description
      .map((block: any) => {
        if (block.type === 'paragraph' && block.children) {
          return block.children.map((child: any) => child.text || '').join('');
        }
        return '';
      })
      .filter(Boolean)
      .join('\n\n');
  } else if (typeof item.description === 'string') {
    descriptionText = item.description;
  }

  return {
    id: item.id.toString(),
    name: item.name,
    description: descriptionText,
    website: item.website,
    phone: item.phone,
    email: item.email,
    logoUrl: item.logo?.url,
    logoAlt: item.logo?.alternativeText,
    category: item.category,
    featured: item.featured,
    isActive: item.isActive,
  };
}

export async function fetchSupportOrganizations(category?: string): Promise<SupportOrg[]> {
  let endpoint = '/api/support-organizations?filters[isActive][$eq]=true&sort=name:asc&populate=logo';
  if (category) {
    endpoint = `/api/support-organizations?filters[isActive][$eq]=true&filters[category][$eq]=${category}&sort=name:asc&populate=logo`;
  }

  const response = await strapiRequest<{ data: StrapiSupportOrganization[] }>(endpoint);

  if (response && response.data) {
    return response.data
      .map(transformSupportOrganization)
      .filter((item): item is SupportOrg => item !== null);
  }

  return [];
}


