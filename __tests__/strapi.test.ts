import {
  fetchHomepageBanner,
  fetchNavigationItems,
  transformStrapiHomepageBanner,
  transformStrapiNavigationItem,
  HomepageBanner,
  NavigationItem,
} from '../lib/strapi'

// Mock fetch globally
const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>

describe('Strapi API Functions', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // Reset fetch mock
    mockFetch.mockReset()
  })

  describe('fetchHomepageBanner', () => {
    it('returns active banner when API call succeeds', async () => {
      const mockStrapiResponse = {
        data: [
          {
            id: 1,
            documentId: 'test-doc-id',
            name: 'Test Banner',
            title: 'Test Title',
            description: 'Test Description',
            linkText: 'Test Link',
            linkUrl: 'https://example.com',
            isActive: true,
            createdAt: '2024-01-01T00:00:00.000Z',
            updatedAt: '2024-01-01T00:00:00.000Z',
            publishedAt: '2024-01-01T00:00:00.000Z',
          },
        ],
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockStrapiResponse,
      } as Response)

      const result = await fetchHomepageBanner()

      expect(result).toEqual({
        id: '1',
        name: 'Test Banner',
        title: 'Test Title',
        description: 'Test Description',
        linkText: 'Test Link',
        linkUrl: 'https://example.com',
        isActive: true,
      })

      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:1337/api/homepage-banners?filters[isActive][$eq]=true',
        {
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'no-store',
        }
      )
    })

    it('returns null when no active banners are found', async () => {
      const mockStrapiResponse = {
        data: [],
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockStrapiResponse,
      } as Response)

      const result = await fetchHomepageBanner()

      expect(result).toBeNull()
    })

    it('returns null when data property is missing', async () => {
      const mockStrapiResponse = {}

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockStrapiResponse,
      } as Response)

      const result = await fetchHomepageBanner()

      expect(result).toBeNull()
    })

    it('returns fallback banner when API call fails', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'))

      const result = await fetchHomepageBanner()

      // Should return the fallback banner
      expect(result).toEqual({
        id: '1',
        name: 'Blood Donation Default',
        title: 'Give blood, save a childs life',
        description: 'Blood Donations are essential during the treatment of childhood cancer. During lockdown the Irish Blood transfusion board continue to need your help.',
        linkText: 'Find a Clinic',
        linkUrl: 'https://www.giveblood.ie/Find-a-Clinic/Clinic-Finder/',
        isActive: true,
      })
    })

    it('returns fallback banner when API returns error status', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      } as Response)

      const result = await fetchHomepageBanner()

      // Should return the fallback banner
      expect(result).toEqual({
        id: '1',
        name: 'Blood Donation Default',
        title: 'Give blood, save a childs life',
        description: 'Blood Donations are essential during the treatment of childhood cancer. During lockdown the Irish Blood transfusion board continue to need your help.',
        linkText: 'Find a Clinic',
        linkUrl: 'https://www.giveblood.ie/Find-a-Clinic/Clinic-Finder/',
        isActive: true,
      })
    })
  })

  describe('fetchNavigationItems', () => {
    it('returns navigation items when API call succeeds', async () => {
      const mockStrapiResponse = {
        data: [
          {
            id: 1,
            documentId: 'nav-doc-1',
            label: 'Home',
            url: '/',
            title: 'Go to home page',
            order: 1,
            createdAt: '2024-01-01T00:00:00.000Z',
            updatedAt: '2024-01-01T00:00:00.000Z',
            publishedAt: '2024-01-01T00:00:00.000Z',
          },
          {
            id: 2,
            documentId: 'nav-doc-2',
            label: 'About',
            url: '/about',
            title: 'Learn about us',
            order: 2,
            createdAt: '2024-01-01T00:00:00.000Z',
            updatedAt: '2024-01-01T00:00:00.000Z',
            publishedAt: '2024-01-01T00:00:00.000Z',
          },
        ],
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockStrapiResponse,
      } as Response)

      const result = await fetchNavigationItems()

      expect(result).toEqual([
        {
          id: '1',
          label: 'Home',
          url: '/',
          title: 'Go to home page',
          order: 1,
        },
        {
          id: '2',
          label: 'About',
          url: '/about',
          title: 'Learn about us',
          order: 2,
        },
      ])

      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:1337/api/navigation-items?sort=order:asc',
        {
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'no-store',
        }
      )
    })

    it('returns fallback navigation items when API call fails', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'))

      const result = await fetchNavigationItems()

      // Should return the fallback navigation items
      expect(result).toEqual([
        { id: "1", label: "Home", url: "/", title: "Go to landing page of site", order: 1 },
        { id: "2", label: "Mollys Story", url: "/story", title: "Find out more about Molly Rose", order: 2 },
        { id: "3", label: "Cancer", url: "/childhoodcancer", title: "Find out more about Childhood Cancer", order: 3 },
        { id: "4", label: "News", url: "/news", title: "The latest news for Molly Rose", order: 4 },
        { id: "5", label: "Events", url: "/events", title: "Find out about upcoming events", order: 5 },
        { id: "6", label: "Gallery", url: "/gallery", title: "Image gallery for Molly Rose", order: 6 },
      ])
    })

  it('returns empty array when no data found (not fallback)', async () => {
    const mockStrapiResponse = {
      data: [],
    }

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockStrapiResponse,
    } as Response)

    const result = await fetchNavigationItems()

    // Should return empty array when data is empty array (not fallback)
    expect(result).toEqual([])
  })
  })

  describe('transformStrapiHomepageBanner', () => {
    it('correctly transforms Strapi banner data', () => {
      const strapiData = {
        id: 1,
        documentId: 'test-doc',
        name: 'Test Banner',
        title: 'Test Title',
        description: 'Test Description',
        linkText: 'Test Link',
        linkUrl: 'https://example.com',
        isActive: true,
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
        publishedAt: '2024-01-01T00:00:00.000Z',
      }

      const result = transformStrapiHomepageBanner(strapiData)

      expect(result).toEqual({
        id: '1',
        name: 'Test Banner',
        title: 'Test Title',
        description: 'Test Description',
        linkText: 'Test Link',
        linkUrl: 'https://example.com',
        isActive: true,
      })
    })

    it('handles optional fields correctly', () => {
      const strapiData = {
        id: 1,
        documentId: 'test-doc',
        name: 'Test Banner',
        title: 'Test Title',
        description: 'Test Description',
        linkText: undefined,
        linkUrl: undefined,
        isActive: false,
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
        publishedAt: '2024-01-01T00:00:00.000Z',
      }

      const result = transformStrapiHomepageBanner(strapiData)

      expect(result).toEqual({
        id: '1',
        name: 'Test Banner',
        title: 'Test Title',
        description: 'Test Description',
        linkText: undefined,
        linkUrl: undefined,
        isActive: false,
      })
    })
  })

  describe('transformStrapiNavigationItem', () => {
    it('correctly transforms Strapi navigation item data', () => {
      const strapiData = {
        id: 1,
        documentId: 'nav-doc',
        label: 'Home',
        url: '/',
        title: 'Go to home page',
        order: 1,
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
        publishedAt: '2024-01-01T00:00:00.000Z',
      }

      const result = transformStrapiNavigationItem(strapiData)

      expect(result).toEqual({
        id: '1',
        label: 'Home',
        url: '/',
        title: 'Go to home page',
        order: 1,
      })
    })

    it('handles optional title field', () => {
      const strapiData = {
        id: 1,
        documentId: 'nav-doc',
        label: 'Home',
        url: '/',
        title: undefined,
        order: 1,
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
        publishedAt: '2024-01-01T00:00:00.000Z',
      }

      const result = transformStrapiNavigationItem(strapiData)

      expect(result).toEqual({
        id: '1',
        label: 'Home',
        url: '/',
        title: undefined,
        order: 1,
      })
    })
  })
})
