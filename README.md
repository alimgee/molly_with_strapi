# Molly Rose Foundation Website

A Next.js website for the Molly Rose Foundation, focused on driving awareness of childhood cancer. The site has been fully migrated from a database-driven architecture to use Strapi CMS for all content management.

## Project Overview

This project consists of:
- **Frontend**: Next.js 14 application with TypeScript
- **Backend**: Strapi CMS for content management
- **Styling**: Global CSS with responsive design

## Architecture

### ✅ Migration Complete - Full Strapi Integration

**Completed:**
- ✅ Removed NextAuth.js authentication system
- ✅ Removed Prisma database layer  
- ✅ Removed all admin functionality and API routes
- ✅ Set up Strapi CMS backend with all content types
- ✅ Integrated all content with Strapi API (Articles, Navigation, Footer, Hero, Quote)
- ✅ Complete styling overhaul with global CSS
- ✅ Fully responsive design with mobile navigation
- ✅ Font integration (Google Fonts - Indie Flower)
- ✅ Icon integration (Font Awesome)
- ✅ Proper color scheme matching original design (#b1225a primary color)

## Project Structure

```
molly_strapi/
├── app/                          # Next.js app directory
│   ├── about/                    # About page
│   ├── childhoodcancer/          # Cancer information page
│   ├── helpout/                  # Organizations and helping out
│   ├── home/                     # Home page components (✅ Strapi integrated)
│   ├── news/                     # News articles (✅ Strapi integrated)
│   ├── story/                    # Molly's story page
│   ├── globals.css              # Global styles (✅ Complete responsive design)
│   └── layout.tsx               # Root layout (✅ Font Awesome, Google Fonts)
├── components/                   # Shared React components
│   ├── Footer.tsx               # Footer component (✅ Strapi integrated)
│   └── Menu.tsx                 # Navigation menu (✅ Strapi integrated, mobile responsive)
├── lib/                         # Utility libraries
│   └── strapi.ts               # Strapi API client and types (✅ All content types)
├── molly-strapi-backend/        # Strapi CMS backend (✅ Complete setup)
└── public/                      # Static assets
```

## Technology Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Global CSS** - Custom responsive styling
- **Google Fonts** - Indie Flower font family
- **Font Awesome** - Icon library

### Backend (CMS)
- **Strapi** - Headless CMS with all content types configured
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

### ✅ Article (Complete)
Used for news articles and events.

**Fields:**
- `title` (Text) - Article headline
- `content` (Long text/Rich text) - Article content  
- `externalLink` (Text/URL) - Link to external article
- `publicationDate` (Date) - When the article was published
- `provider` (Text) - Source/provider of the article

**API Endpoint:** `/api/articles`

### ✅ NavigationItem (Complete)
For dynamic navigation menu items.

**Fields:**
- `label` (Text) - Menu item text
- `url` (Text) - Link URL
- `title` (Text) - Hover tooltip
- `order` (Number) - Sort order

**API Endpoint:** `/api/navigation-items`

### ✅ FooterContent (Complete)
For footer content sections.

**Fields:**
- `sectionTitle` (Text) - Footer section title
- `content` (Rich text) - Footer section content
- `order` (Number) - Sort order

**API Endpoint:** `/api/footer-contents`

### ✅ Hero (Complete)
For homepage hero section content.

**Fields:**
- `title` (Text) - Hero headline
- `subtitle` (Text) - Hero subtitle
- `buttonText` (Text) - Call-to-action button text
- `buttonLink` (Text) - Button URL

**API Endpoint:** `/api/hero2s`

### ✅ Quote (Complete)
For homepage quote section.

**Fields:**
- `text` (Text) - Quote content
- `author` (Text) - Quote author (optional)

**API Endpoint:** `/api/quotes`

## API Integration

The frontend uses a custom Strapi client (`lib/strapi.ts`) that:
- Fetches content from Strapi API
- Transforms Strapi response format to component-friendly format
- Provides graceful fallback to static data when Strapi is unavailable
- Includes proper TypeScript types

### Example Usage:
```typescript
import { fetchArticles, fetchNavigationItems, fetchHeroContent } from '@/lib/strapi';

// In a server component
const articles = await fetchArticles();
const navItems = await fetchNavigationItems(); 
const hero = await fetchHeroContent();
```

## Key Features

### Responsive Design
- **Mobile-first approach** with proper breakpoints
- **Mobile navigation** with hamburger menu
- **Responsive typography** and spacing
- **Touch-friendly** interface elements

### Performance
- **Server-side rendering** for better SEO
- **Static generation** where possible
- **Optimized images** with Next.js Image component
- **Graceful fallbacks** when Strapi is unavailable

### Accessibility
- **Semantic HTML** structure
- **ARIA labels** for interactive elements
- **Keyboard navigation** support
- **Screen reader** friendly

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

### ✅ Complete Migration (January 2025)
**Removed Legacy Systems:**
- NextAuth.js authentication
- Prisma database layer  
- Admin routes and API endpoints
- Bootstrap/Reactstrap dependencies

**Implemented Strapi CMS:**
- Complete backend setup with all content types
- Article, Navigation, Footer, Hero, Quote content types
- Public permissions and API endpoints
- Content management through Strapi admin UI

**Frontend Overhaul:**
- Complete styling migration to global CSS
- Responsive design implementation
- Mobile navigation with hamburger menu
- Font integration (Google Fonts - Indie Flower)
- Icon integration (Font Awesome)
- Color scheme implementation (#b1225a primary)

**Technical Improvements:**
- TypeScript type safety throughout
- Graceful fallback systems
- Server-side rendering optimization
- SEO-friendly structure

---

## Support

For questions about childhood cancer awareness or the Molly Rose Foundation, visit the website or contact through the provided channels.

For technical issues with this website, refer to the documentation above or check the repository issues.
