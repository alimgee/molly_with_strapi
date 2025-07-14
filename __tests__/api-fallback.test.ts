import { fetchHomepageBanner, fetchNavigationItems } from '../lib/strapi'

// Mock fetch globally
const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>

describe('API Error Handling and Fallback Logic', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockFetch.mockReset()
  })

  describe('Banner Fallback Logic', () => {
    it('shows fallback banner only when there is a connection error', async () => {
      // Simulate a network error
      mockFetch.mockRejectedValueOnce(new Error('Network connection failed'))

      const result = await fetchHomepageBanner()

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

    it('shows fallback banner when API returns 500 error', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      } as Response)

      const result = await fetchHomepageBanner()

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

    it('shows fallback banner when API returns 404 error', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      } as Response)

      const result = await fetchHomepageBanner()

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

    it('returns null when no active banners exist (NOT fallback)', async () => {
      const mockStrapiResponse = {
        data: [], // No active banners
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockStrapiResponse,
      } as Response)

      const result = await fetchHomepageBanner()

      // Should return null, not fallback, when no active banners
      expect(result).toBeNull()
    })

    it('returns null when API response is malformed but successful', async () => {
      const mockStrapiResponse = {
        // Missing data property
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockStrapiResponse,
      } as Response)

      const result = await fetchHomepageBanner()

      // Should return null, not fallback, when response format is wrong
      expect(result).toBeNull()
    })

    it('returns null when data property is not an array', async () => {
      const mockStrapiResponse = {
        data: 'not an array', // Invalid data format
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockStrapiResponse,
      } as Response)

      const result = await fetchHomepageBanner()

      // Should return null, not fallback, when data format is wrong
      expect(result).toBeNull()
    })

    it('handles JSON parsing errors gracefully', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => {
          throw new Error('Invalid JSON')
        },
      } as unknown as Response)

      const result = await fetchHomepageBanner()

      // Should return fallback when there's a parsing error
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

  describe('Navigation Fallback Logic', () => {
    it('shows fallback navigation when there is a connection error', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Connection refused'))

      const result = await fetchNavigationItems()

      expect(result).toEqual([
        { id: "1", label: "Home", url: "/", title: "Go to landing page of site", order: 1 },
        { id: "2", label: "Mollys Story", url: "/story", title: "Find out more about Molly Rose", order: 2 },
        { id: "3", label: "Cancer", url: "/childhoodcancer", title: "Find out more about Childhood Cancer", order: 3 },
        { id: "4", label: "News", url: "/news", title: "The latest news for Molly Rose", order: 4 },
        { id: "5", label: "Events", url: "/events", title: "Find out about upcoming events", order: 5 },
        { id: "6", label: "Gallery", url: "/gallery", title: "Image gallery for Molly Rose", order: 6 },
      ])
    })

    it('shows fallback navigation when API returns error status', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 503,
        statusText: 'Service Unavailable',
      } as Response)

      const result = await fetchNavigationItems()

      expect(result).toEqual([
        { id: "1", label: "Home", url: "/", title: "Go to landing page of site", order: 1 },
        { id: "2", label: "Mollys Story", url: "/story", title: "Find out more about Molly Rose", order: 2 },
        { id: "3", label: "Cancer", url: "/childhoodcancer", title: "Find out more about Childhood Cancer", order: 3 },
        { id: "4", label: "News", url: "/news", title: "The latest news for Molly Rose", order: 4 },
        { id: "5", label: "Events", url: "/events", title: "Find out about upcoming events", order: 5 },
        { id: "6", label: "Gallery", url: "/gallery", title: "Image gallery for Molly Rose", order: 6 },
      ])
    })

    it('shows fallback navigation when response format is invalid', async () => {
      const mockStrapiResponse = {
        // Missing data property
        error: 'Something went wrong'
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockStrapiResponse,
      } as Response)

      const result = await fetchNavigationItems()

      expect(result).toEqual([
        { id: "1", label: "Home", url: "/", title: "Go to landing page of site", order: 1 },
        { id: "2", label: "Mollys Story", url: "/story", title: "Find out more about Molly Rose", order: 2 },
        { id: "3", label: "Cancer", url: "/childhoodcancer", title: "Find out more about Childhood Cancer", order: 3 },
        { id: "4", label: "News", url: "/news", title: "The latest news for Molly Rose", order: 4 },
        { id: "5", label: "Events", url: "/events", title: "Find out about upcoming events", order: 5 },
        { id: "6", label: "Gallery", url: "/gallery", title: "Image gallery for Molly Rose", order: 6 },
      ])
    })

    it('returns empty array when navigation data is empty (no fallback)', async () => {
      const mockStrapiResponse = {
        data: [], // Empty navigation items
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockStrapiResponse,
      } as Response)

      const result = await fetchNavigationItems()

      // Should return empty array, not fallback
      expect(result).toEqual([])
    })

    it('handles timeout errors gracefully', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Request timeout'))

      const result = await fetchNavigationItems()

      expect(result).toEqual([
        { id: "1", label: "Home", url: "/", title: "Go to landing page of site", order: 1 },
        { id: "2", label: "Mollys Story", url: "/story", title: "Find out more about Molly Rose", order: 2 },
        { id: "3", label: "Cancer", url: "/childhoodcancer", title: "Find out more about Childhood Cancer", order: 3 },
        { id: "4", label: "News", url: "/news", title: "The latest news for Molly Rose", order: 4 },
        { id: "5", label: "Events", url: "/events", title: "Find out about upcoming events", order: 5 },
        { id: "6", label: "Gallery", url: "/gallery", title: "Image gallery for Molly Rose", order: 6 },
      ])
    })
  })

  describe('Multiple Banner Scenarios', () => {
    it('returns first active banner when multiple active banners exist', async () => {
      const mockStrapiResponse = {
        data: [
          {
            id: 1,
            documentId: 'banner-1',
            name: 'First Active Banner',
            title: 'First Active Title',
            description: 'First active description',
            linkText: 'First Link',
            linkUrl: 'https://first.com',
            isActive: true,
            createdAt: '2024-01-01T00:00:00.000Z',
            updatedAt: '2024-01-01T00:00:00.000Z',
            publishedAt: '2024-01-01T00:00:00.000Z',
          },
          {
            id: 2,
            documentId: 'banner-2',
            name: 'Second Active Banner',
            title: 'Second Active Title',
            description: 'Second active description',
            linkText: 'Second Link',
            linkUrl: 'https://second.com',
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

      // Should return the first banner in the array
      expect(result).toEqual({
        id: '1',
        name: 'First Active Banner',
        title: 'First Active Title',
        description: 'First active description',
        linkText: 'First Link',
        linkUrl: 'https://first.com',
        isActive: true,
      })
    })

    it('makes correct API call with isActive filter', async () => {
      const mockStrapiResponse = { data: [] }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockStrapiResponse,
      } as Response)

      await fetchHomepageBanner()

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
  })

  describe('Console Logging Behavior', () => {
    it('logs warning when no active banners found', async () => {
      const mockStrapiResponse = { data: [] }
      const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation()

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockStrapiResponse,
      } as Response)

      await fetchHomepageBanner()

      expect(consoleWarnSpy).toHaveBeenCalledWith('No active homepage banner found')
      consoleWarnSpy.mockRestore()
    })

    it('logs error when API call fails', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()
      const networkError = new Error('Network failed')

      mockFetch.mockRejectedValueOnce(networkError)

      await fetchHomepageBanner()

      expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching homepage banner from Strapi:', networkError)
      consoleErrorSpy.mockRestore()
    })

    it('logs warning when navigation items format is invalid', async () => {
      const mockStrapiResponse = { error: 'Invalid format' }
      const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation()

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockStrapiResponse,
      } as Response)

      await fetchNavigationItems()

      expect(consoleWarnSpy).toHaveBeenCalledWith('No navigation items found or invalid response format')
      consoleWarnSpy.mockRestore()
    })

    it('logs error when navigation API call fails', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()
      const networkError = new Error('Connection timeout')

      mockFetch.mockRejectedValueOnce(networkError)

      await fetchNavigationItems()

      expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching navigation items from Strapi:', networkError)
      consoleErrorSpy.mockRestore()
    })
  })
})
