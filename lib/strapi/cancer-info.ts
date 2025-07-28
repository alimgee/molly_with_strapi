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