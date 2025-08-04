// Content management API calls and types (Articles, News, etc.)
import { strapiRequest } from './config';

// Types for Articles
export interface StrapiArticle {
  id: number;
  documentId: string;
  title: string;
  content: any; // Rich text content (array format)
  externalLink?: string;
  publicationDate: string;
  provider: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Article {
  id: string;
  name: string;
  content: string;
  link: string;
  date: string;
  provider: string;
}

// Transform function for articles
export function transformStrapiArticle(strapiArticle: StrapiArticle): Article {
  // Convert rich text content to plain text
  let contentText = '';
  
  if (Array.isArray(strapiArticle.content)) {
    contentText = strapiArticle.content
      .map((block: any) => {
        if (block.type === 'paragraph' && block.children) {
          return block.children
            .map((child: any) => child.text || '')
            .join('');
        }
        return '';
      })
      .filter(Boolean)
      .join(' ');
  } else if (typeof strapiArticle.content === 'string') {
    contentText = strapiArticle.content;
  }

  return {
    id: strapiArticle.documentId || strapiArticle.id.toString(),
    name: strapiArticle.title,
    content: contentText,
    link: strapiArticle.externalLink || `/news/${strapiArticle.documentId || strapiArticle.id}`,
    date: strapiArticle.publicationDate,
    provider: strapiArticle.provider,
  };
}

// API functions
export async function fetchArticles(): Promise<Article[]> {
  try {
    const data = await strapiRequest<{ data: StrapiArticle[] }>('/api/articles?sort=publicationDate:desc&publicationState=live');
    
    if (data?.data) {
      return data.data.map(transformStrapiArticle);
    }
    
    return [];
  } catch (error) {
    console.error('Failed to fetch articles:', error);
    return [];
  }
}

export async function fetchArticleById(id: string): Promise<Article | null> {
  try {
    const data = await strapiRequest<{ data: StrapiArticle }>(`/api/articles/${id}`);
    
    if (data?.data) {
      return transformStrapiArticle(data.data);
    }
    
    return null;
  } catch (error) {
    console.error(`Failed to fetch article ${id}:`, error);
    return null;
  }
}

// Utility function to get first article (for homepage)
export async function fetchFirstArticle(): Promise<Article | null> {
  try {
    const articles = await fetchArticles();
    return articles.length > 0 ? articles[0] : null;
  } catch (error) {
    console.error('Failed to fetch first article:', error);
    return null;
  }
}
