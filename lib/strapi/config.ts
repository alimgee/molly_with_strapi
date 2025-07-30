// Base configuration for all Strapi API calls
export const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};

export const DEFAULT_OPTIONS = {
  headers: DEFAULT_HEADERS,
  //cache: 'no-store' as RequestCache,
};

// Common fetch wrapper with error handling
export async function strapiRequest<T>(endpoint: string, options = {}): Promise<T | null> {
  try {
    const response = await fetch(`${STRAPI_URL}${endpoint}`, {
      ...DEFAULT_OPTIONS,
      ...options,
    });

    if (!response.ok) {
      console.error(`Strapi API error: ${response.status} - ${endpoint}`);
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Strapi API request failed:', error);
    return null;
  }
}
