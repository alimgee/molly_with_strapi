# Strapi API Organization Migration Guide

## 📁 New Organized Structure

We've reorganized the Strapi API calls into a more maintainable structure:

```
lib/strapi/
├── config.ts        # Base configuration and common utilities
├── homepage.ts      # Homepage-specific content (banners, heroes, quotes)
├── layout.ts        # Navigation and layout content
├── content.ts       # Articles and news content
├── cancer-info.ts   # Childhood cancer specific content
└── index.ts         # Main export file with grouped APIs
```

## 🔄 Migration Options

### Option 1: Gradual Migration (Recommended)
Keep the old `lib/strapi.ts` file working while gradually migrating to the new structure.

### Option 2: Complete Migration
Replace the old structure entirely with the new organized approach.

## 📋 Current Usage Analysis

### Files that need updating:
- `app/news/page.tsx` ✅ Updated
- `app/news/Articles.tsx` ✅ Updated
- `__tests__/api-fallback.test.ts`
- `__tests__/integration.test.tsx`
- `__tests__/banner.test.tsx`
- `__tests__/strapi.test.ts`
- `__tests__/menu.test.tsx`

## 🚀 New Usage Examples

### Before:
```typescript
import { fetchArticles, fetchHomepageBanner } from '@/lib/strapi';
```

### After (Option A - Specific imports):
```typescript
import { fetchArticles } from '@/lib/strapi/content';
import { fetchHomepageBanner } from '@/lib/strapi/homepage';
```

### After (Option B - Grouped imports):
```typescript
import { contentAPI, homepageAPI } from '@/lib/strapi';

const articles = await contentAPI.getArticles();
const banner = await homepageAPI.getBanners();
```

### After (Option C - Index imports):
```typescript
import { fetchArticles, fetchHomepageBanner } from '@/lib/strapi';
```

## 🎯 Recommended Content Type Organization in Strapi Admin

### 1. Layout & Navigation
- Navigation Items
- Footer Contents
- Homepage Banners

### 2. Page Content
- Articles
- Hero Sections
- Quotes

### 3. Childhood Cancer Resources
- Cancer Information
- Support Organizations
- Awareness Campaigns

### 4. Media & Assets
- Image Gallery
- Documents
- Videos

## 🔧 Next Steps

1. **Create backwards compatibility layer** (if needed)
2. **Update remaining test files** to use new structure
3. **Add new content types** for childhood cancer resources
4. **Update Strapi admin** to use organized categories
5. **Create development documentation** for team
