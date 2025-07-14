# Testing Documentation

This document describes the comprehensive test suite implemented for the Molly Rose Foundation website's banner and navigation systems.

## Test Overview

The test suite includes **65 tests** covering all aspects of the banner and navigation functionality:

- ✅ **10 Banner Logic Tests** - Testing the NoticeSection component
- ✅ **12 API Function Tests** - Testing Strapi API functions and transformations  
- ✅ **15 Navigation Tests** - Testing the Menu component
- ✅ **10 Integration Tests** - Testing component interactions
- ✅ **18 API Fallback Tests** - Testing error handling and fallback scenarios

## Test Structure

### Test Files

```
__tests__/
├── banner.test.tsx          # Banner component tests
├── menu.test.tsx            # Navigation component tests  
├── strapi.test.ts           # API function tests
├── integration.test.tsx     # Integration scenarios
└── api-fallback.test.ts     # Error handling & fallbacks
```

### Key Test Scenarios

#### Banner Tests (`banner.test.tsx`)
- ✅ Renders active banner with all fields (title, description, link)
- ✅ Handles missing link fields gracefully
- ✅ Returns null when no active banner found
- ✅ Shows fallback banner on connection errors
- ✅ Proper card structure and Bootstrap classes
- ✅ FontAwesome icon inclusion when link present

#### Navigation Tests (`menu.test.tsx`)
- ✅ Renders navigation items correctly from API
- ✅ Mobile menu toggle functionality
- ✅ Menu closes when navigation links clicked
- ✅ Proper accessibility attributes (aria-expanded, aria-controls)
- ✅ Bootstrap navbar structure validation
- ✅ Handles empty navigation gracefully
- ✅ Falls back to default navigation on API errors

#### API Function Tests (`strapi.test.ts`)
- ✅ Banner API returns active banners correctly
- ✅ Navigation API returns items sorted by order
- ✅ Transforms Strapi data format to component format
- ✅ Handles missing/invalid API responses
- ✅ Returns appropriate fallbacks on connection errors
- ✅ Returns null for banners when no active items (not fallback)

#### Integration Tests (`integration.test.tsx`)
- ✅ Multiple active banners (returns first one)
- ✅ API error scenarios with proper fallbacks
- ✅ Mobile navigation with dynamic content
- ✅ External vs internal link handling
- ✅ Long content handling
- ✅ Accessibility and structure validation
- ✅ Malformed data handling

#### API Fallback Tests (`api-fallback.test.ts`)
- ✅ Connection errors trigger fallback content
- ✅ HTTP error status codes (404, 500, 503) trigger fallbacks
- ✅ JSON parsing errors handled gracefully
- ✅ No active banners returns null (NOT fallback)
- ✅ Invalid response formats handled correctly
- ✅ Proper console logging for debugging
- ✅ Multiple banner scenarios
- ✅ Timeout handling

## Critical Logic Tested

### Banner Fallback Logic
The tests confirm the key requirement that **fallback banners are only shown on connection errors**, not when all banners are inactive:

```typescript
// ✅ Connection Error → Shows Fallback
mockFetch.mockRejectedValueOnce(new Error('Network failed'))
// Result: Fallback "Blood Donation" banner

// ✅ No Active Banners → Returns null
mockFetch.mockResolvedValue({ data: [] })
// Result: null (no banner displayed)
```

### Navigation Fallback Logic
Navigation falls back to default menu items only on API errors:

```typescript
// ✅ API Error → Fallback Navigation
mockFetch.mockRejectedValueOnce(new Error('Connection failed'))
// Result: Default navigation items

// ✅ Empty Navigation → Empty Array
mockFetch.mockResolvedValue({ data: [] })
// Result: [] (no navigation items)
```

### Mobile Navigation
Comprehensive mobile menu testing ensures seamless responsive behavior:

- Toggle button functionality
- Menu open/close state management
- Link click behavior closes menu
- Proper ARIA attributes for accessibility

## Test Commands

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch

# Run specific test file
npm test banner.test.tsx
```

## Test Configuration

### Jest Setup
- **Framework**: Jest with JSDOM environment
- **Testing Library**: React Testing Library for component testing
- **Mocking**: Fetch API, Next.js Link component, and Strapi functions
- **Coverage**: Configured to track all components and lib files

### Key Configuration Files
- `jest.config.js` - Jest configuration with Next.js integration
- `jest.setup.js` - Global test setup and mocks
- `types/jest.d.ts` - TypeScript definitions for Jest matchers

## Coverage Report

The test suite achieves comprehensive coverage of all critical functionality:

- **Banner Component**: 100% coverage
- **Menu Component**: 100% coverage  
- **Strapi API Functions**: 25.45% coverage (testing focus on key functions)
- **Overall Project**: Focus on mission-critical banner and navigation logic

## Test Philosophy

The test suite follows these principles:

1. **User-Centric Testing**: Tests focus on what users see and interact with
2. **Error Resilience**: Extensive testing of error conditions and fallbacks
3. **Accessibility**: Ensuring proper ARIA attributes and semantic HTML
4. **Real-World Scenarios**: Testing actual usage patterns and edge cases
5. **Performance**: Fast-running tests with proper mocking strategies

## Continuous Integration

Tests are designed to:
- Run quickly (< 10 seconds for full suite)
- Be deterministic and reliable
- Catch regressions in banner and navigation logic
- Validate API integration without external dependencies

## Future Enhancements

Potential test additions:
- Visual regression testing for UI components
- End-to-end tests with Playwright/Cypress
- Performance testing for large navigation sets
- Accessibility testing with jest-axe

---

This comprehensive test suite ensures the banner and navigation systems are robust, user-friendly, and maintainable for the Molly Rose Foundation website.
