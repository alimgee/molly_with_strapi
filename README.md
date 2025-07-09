# Molly Rose Foundation Website

A Next.js website for the Molly Rose Foundation, focused on driving awareness of childhood cancer. The site has been migrated from a database-driven architecture to use Strapi CMS for content management.

## Project Overview

This project consists of:
- **Frontend**: Next.js 14 application with TypeScript
- **Backend**: Strapi CMS for content management
- **Styling**: Bootstrap 5 with Reactstrap components

## Architecture

### Current Status: ✅ Phase 1 Complete - Database Migration & Strapi Integration

**Completed:**
- ✅ Removed NextAuth.js authentication system
- ✅ Removed Prisma database layer
- ✅ Removed admin functionality and API routes
- ✅ Set up Strapi CMS backend
- ✅ Integrated News/Articles with Strapi API
- ✅ Implemented graceful fallback to static data
- ✅ Updated TypeScript types for Strapi integration

**Next Phase:**
- 🔄 Setup Navigation and Footer content types in Strapi
- 🔄 Connect Menu and Footer components to Strapi
- 🔄 Add remaining content types as needed

## Project Structure

```
molly_strapi/
├── app/                          # Next.js app directory
│   ├── about/                    # About page
│   ├── childhoodcancer/          # Cancer information page
│   ├── helpout/                  # Organizations and helping out
│   ├── home/                     # Home page components
│   ├── news/                     # News articles (✅ Strapi integrated)
│   └── story/                    # Molly's story page
├── components/                   # Shared React components
│   ├── Footer.tsx               # Footer component (🔄 to be Strapi integrated)
│   └── Menu.tsx                 # Navigation menu (🔄 to be Strapi integrated)
├── lib/                         # Utility libraries
│   └── strapi.ts               # Strapi API client and types
├── molly-strapi-backend/        # Strapi CMS backend
└── public/                      # Static assets
```

## Technology Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Bootstrap 5** - CSS framework
- **Reactstrap** - Bootstrap React components

### Backend (CMS)
- **Strapi** - Headless CMS (Free tier features only)
- **SQLite** - Database (default for local development)

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd molly_strapi
   ```

2. **Install frontend dependencies:**
   ```bash
   npm install
   ```

3. **Install Strapi backend dependencies:**
   ```bash
   cd molly-strapi-backend
   npm install
   ```

4. **Set up environment variables:**
   ```bash
   # Copy .env.local (already configured)
   # Ensure NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
   ```

### Running the Application

1. **Start Strapi backend:**
   ```bash
   cd molly-strapi-backend
   npm run develop
   ```
   - Strapi admin: http://localhost:1337/admin

2. **Start Next.js frontend:**
   ```bash
   cd molly_strapi
   npm run dev
   ```
   - Frontend: http://localhost:3000 (or 3001 if 3000 is busy)

## Strapi Content Types

### ✅ Article (Completed)
Used for news articles and events.

**Fields:**
- `title` (Text) - Article headline
- `content` (Long text/Rich text) - Article content
- `externalLink` (Text/URL) - Link to external article
- `publicationDate` (Date) - When the article was published
- `provider` (Text) - Source/provider of the article

**API Endpoint:** `/api/articles`

### 🔄 NavigationItem (Planned)
For dynamic navigation menu items.

**Planned Fields:**
- `label` (Text) - Menu item text
- `url` (Text) - Link URL
- `title` (Text) - Hover tooltip
- `order` (Number) - Sort order

### 🔄 FooterContent (Planned)
For footer content sections.

**Planned Fields:**
- `sectionTitle` (Text) - Footer section title
- `content` (Rich text) - Footer section content
- `order` (Number) - Sort order

## API Integration

The frontend uses a custom Strapi client (`lib/strapi.ts`) that:
- Fetches content from Strapi API
- Transforms Strapi response format to component-friendly format
- Provides graceful fallback to static data when Strapi is unavailable
- Includes proper TypeScript types

### Example Usage:
```typescript
import { fetchArticles } from '@/lib/strapi';

// In a server component
const articles = await fetchArticles();
```

## Development Workflow

1. **Content Management**: Use Strapi admin panel to manage content
2. **Frontend Development**: Standard Next.js development
3. **API Integration**: Use the Strapi client functions in `lib/strapi.ts`

## Deployment Considerations

- **Frontend**: Can be deployed to Vercel, Netlify, etc.
- **Strapi**: Should be deployed to a service that supports Node.js (Railway, Heroku, DigitalOcean, etc.)
- **Environment Variables**: Update `NEXT_PUBLIC_STRAPI_URL` for production

## Contributing

1. Create content types in Strapi admin first
2. Add corresponding TypeScript types in `lib/strapi.ts`
3. Create API functions for fetching data
4. Update components to use dynamic data
5. Ensure graceful fallbacks are in place

## Migration History

### Phase 1: Database Removal & Strapi Setup
- **Removed**: NextAuth.js, Prisma, admin routes, API routes
- **Added**: Strapi backend, API integration, TypeScript types
- **Updated**: News page to use Strapi data with fallback

### Phase 2: Navigation & Footer (In Progress)
- **Plan**: Convert Menu and Footer to use Strapi content
- **Goal**: Full content management through Strapi admin

---

## Support

For questions about childhood cancer awareness or the Molly Rose Foundation, visit the website or contact through the provided channels.

For technical issues with this website, refer to the documentation above or check the repository issues.
