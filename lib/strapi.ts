// Strapi API configuration and helper functions

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

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

// Transform Strapi article format to our component format
export function transformStrapiArticle(strapiArticle: StrapiArticle): Article {
  // Convert rich text content to plain text
  let contentText = '';
  if (Array.isArray(strapiArticle.content)) {
    contentText = strapiArticle.content
      .map(block => {
        if (block.type === 'paragraph' && Array.isArray(block.children)) {
          return block.children.map(child => child.text || '').join('');
        }
        return '';
      })
      .join(' ');
  } else if (typeof strapiArticle.content === 'string') {
    contentText = strapiArticle.content;
  }
  
  return {
    id: strapiArticle.id.toString(),
    name: strapiArticle.title,
    content: contentText,
    link: strapiArticle.externalLink || '#',
    date: strapiArticle.publicationDate,
    provider: strapiArticle.provider,
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

// Navigation interfaces
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

// Footer interfaces
export interface StrapiFooterContent {
  id: number;
  documentId: string;
  sectionTitle: string;
  content: any; // Rich text content
  order: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface FooterContent {
  id: string;
  sectionTitle: string;
  content: string;
  order: number;
}

// Hero interfaces
export interface StrapiHero {
  id: number;
  documentId: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  backgroundImage?: {
    url: string;
    alternativeText?: string;
  };
  heroImage?: {
    url: string;
    alternativeText?: string;
  };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Hero {
  id: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  backgroundImage?: {
    url: string;
    alt?: string;
  };
  heroImage?: {
    url: string;
    alt?: string;
  };
}

// Quote interfaces
export interface StrapiQuote {
  id: number;
  documentId: string;
  text: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Quote {
  id: string;
  text: string;
}

// Transform functions
export function transformStrapiNavigationItem(strapiItem: StrapiNavigationItem): NavigationItem {
  return {
    id: strapiItem.id.toString(),
    label: strapiItem.label,
    url: strapiItem.url,
    title: strapiItem.title,
    order: strapiItem.order,
  };
}

export function transformStrapiFooterContent(strapiContent: StrapiFooterContent): FooterContent {
  // Convert rich text content to HTML string
  let contentHtml = '';
  if (Array.isArray(strapiContent.content)) {
    contentHtml = strapiContent.content
      .map(block => {
        if (block.type === 'paragraph' && Array.isArray(block.children)) {
          const text = block.children.map(child => child.text || '').join('');
          return `<p>${text}</p>`;
        }
        return '';
      })
      .join('');
  } else if (typeof strapiContent.content === 'string') {
    contentHtml = strapiContent.content;
  }
  
  return {
    id: strapiContent.id.toString(),
    sectionTitle: strapiContent.sectionTitle,
    content: contentHtml,
    order: strapiContent.order,
  };
}

export function transformStrapiHero(strapiHero: StrapiHero): Hero {
  return {
    id: strapiHero.id.toString(),
    title: strapiHero.title,
    subtitle: strapiHero.subtitle,
    buttonText: strapiHero.buttonText,
    buttonLink: strapiHero.buttonLink,
    backgroundImage: strapiHero.backgroundImage ? {
      url: `${STRAPI_URL}${strapiHero.backgroundImage.url}`,
      alt: strapiHero.backgroundImage.alternativeText || '',
    } : undefined,
    heroImage: strapiHero.heroImage ? {
      url: `${STRAPI_URL}${strapiHero.heroImage.url}`,
      alt: strapiHero.heroImage.alternativeText || '',
    } : undefined,
  };
}

export function transformStrapiQuote(strapiQuote: StrapiQuote): Quote {
  return {
    id: strapiQuote.id.toString(),
    text: strapiQuote.text,
  };
}

// Fetch navigation items from Strapi
export async function fetchNavigationItems(): Promise<NavigationItem[]> {
  try {
    const response = await fetch(`${STRAPI_URL}/api/navigation-items?sort=order:asc`, {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch navigation items: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.data || !Array.isArray(data.data)) {
      console.warn('No navigation items found or invalid response format');
      return getFallbackNavigationItems();
    }

    return data.data.map(transformStrapiNavigationItem);
  } catch (error) {
    console.error('Error fetching navigation items from Strapi:', error);
    return getFallbackNavigationItems();
  }
}

// Fetch footer content from Strapi
export async function fetchFooterContent(): Promise<FooterContent[]> {
  try {
    const response = await fetch(`${STRAPI_URL}/api/footer-contents?sort=order:asc`, {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch footer content: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.data || !Array.isArray(data.data)) {
      console.warn('No footer content found or invalid response format');
      return getFallbackFooterContent();
    }

    return data.data.map(transformStrapiFooterContent);
  } catch (error) {
    console.error('Error fetching footer content from Strapi:', error);
    return getFallbackFooterContent();
  }
}

// Fetch hero content from Strapi
export async function fetchHeroContent(): Promise<Hero> {
  try {
    const response = await fetch(`${STRAPI_URL}/api/hero2s?sort=id:asc`, {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch hero content: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.data || !Array.isArray(data.data) || data.data.length === 0) {
      console.warn('No hero content found');
      return getFallbackHeroContent();
    }

    // Return the first hero record (since we only need one)
    return transformStrapiHero(data.data[0]);
  } catch (error) {
    console.error('Error fetching hero content from Strapi:', error);
    return getFallbackHeroContent();
  }
}

// Fetch quote content from Strapi
export async function fetchQuoteContent(): Promise<Quote> {
  try {
    const response = await fetch(`${STRAPI_URL}/api/quotes?sort=id:asc`, {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch quote content: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.data || !Array.isArray(data.data) || data.data.length === 0) {
      console.warn('No quote content found');
      return getFallbackQuoteContent();
    }

    // Return the first quote record
    return transformStrapiQuote(data.data[0]);
  } catch (error) {
    console.error('Error fetching quote content from Strapi:', error);
    return getFallbackQuoteContent();
  }
}

// Fallback navigation items (your current menu)
function getFallbackNavigationItems(): NavigationItem[] {
  return [
    { id: "1", label: "Home", url: "/", title: "Go to landing page of site", order: 1 },
    { id: "2", label: "Mollys Story", url: "/story", title: "Find out more about Molly Rose", order: 2 },
    { id: "3", label: "Cancer", url: "/childhoodcancer", title: "Find out more about Childhood Cancer", order: 3 },
    { id: "4", label: "News", url: "/news", title: "The latest news for Molly Rose", order: 4 },
    { id: "5", label: "Events", url: "/events", title: "Find out about upcoming events", order: 5 },
    { id: "6", label: "Gallery", url: "/gallery", title: "Image gallery for Molly Rose", order: 6 },
  ];
}

// Fallback footer content
function getFallbackFooterContent(): FooterContent[] {
  return [
    {
      id: "1",
      sectionTitle: "About",
      content: "<p>The Molly Rose Foundation supports families affected by childhood cancer.</p>",
      order: 1
    },
    {
      id: "2", 
      sectionTitle: "Contact",
      content: "<p>Get in touch with us for more information about our services.</p>",
      order: 2
    }
  ];
}

// Fallback hero content
function getFallbackHeroContent(): Hero {
  return {
    id: "1",
    title: "Molly Rose",
    subtitle: "Driving Awareness of Childhood Cancer",
    buttonText: "Molly's Story",
    buttonLink: "/story",
    heroImage: {
      url: "/assets/img/molly-intro.jpg",
      alt: "Molly Rose"
    }
  };
}

// Fallback quote content
function getFallbackQuoteContent(): Quote {
  return {
    id: "1",
    text: "Wash off yesterday, and dress for today"
  };
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
