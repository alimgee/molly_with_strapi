// Strapi API configuration and helper functions

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

export interface StrapiArticle {
  id: number;
  attributes: {
    title: string;
    content: string;
    externalLink?: string;
    publicationDate: string;
    provider: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

export interface Article {
  id: string;
  name: string;
  content: string;
  link: string;
  date: string;
  provider: string;
}

// Transform Strapi article format to our component format
export function transformStrapiArticle(strapiArticle: StrapiArticle): Article {
  return {
    id: strapiArticle.id.toString(),
    name: strapiArticle.attributes.title,
    content: strapiArticle.attributes.content,
    link: strapiArticle.attributes.externalLink || '#',
    date: strapiArticle.attributes.publicationDate,
    provider: strapiArticle.attributes.provider,
  };
}

// Fetch articles from Strapi
export async function fetchArticles(): Promise<Article[]> {
  try {
    const response = await fetch(`${STRAPI_URL}/api/articles?sort=publicationDate:desc`, {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // Disable caching for now to get fresh data
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch articles: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.data || !Array.isArray(data.data)) {
      console.warn('No articles found or invalid response format');
      return [];
    }

    return data.data.map(transformStrapiArticle);
  } catch (error) {
    console.error('Error fetching articles from Strapi:', error);
    // Return fallback static data if Strapi is not available
    return getFallbackArticles();
  }
}

// Fallback static data (your current data)
function getFallbackArticles(): Article[] {
  return [
    {
      id: "1",
      name: "Childhood Cancer Awareness Month",
      content: "September is Childhood Cancer Awareness Month. Learn about the signs and symptoms to watch for.",
      link: "https://example.com/childhood-cancer-awareness",
      date: "2024-09-01",
      provider: "Sample News"
    },
    {
      id: "2", 
      name: "Supporting Families Through Cancer Treatment",
      content: "How families can access support services during a childhood cancer diagnosis.",
      link: "https://example.com/supporting-families",
      date: "2024-08-15",
      provider: "Health News"
    }
  ];
}
