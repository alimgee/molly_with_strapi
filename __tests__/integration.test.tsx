import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Menu from '../components/Menu'
import NoticeSection from '../app/home/Notice'
import { fetchNavigationItems, fetchHomepageBanner } from '../lib/strapi'

// Mock the strapi module
jest.mock('../lib/strapi', () => ({
  fetchNavigationItems: jest.fn(),
  fetchHomepageBanner: jest.fn(),
}))

// Mock Next.js Link component
jest.mock('next/link', () => {
  return ({ children, href, className, title, onClick }: any) => {
    return (
      <a 
        href={href} 
        className={className} 
        title={title}
        onClick={onClick}
      >
        {children}
      </a>
    )
  }
})

const mockFetchNavigationItems = fetchNavigationItems as jest.MockedFunction<typeof fetchNavigationItems>
const mockFetchHomepageBanner = fetchHomepageBanner as jest.MockedFunction<typeof fetchHomepageBanner>

describe('Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Banner and Navigation Integration', () => {
    it('handles multiple banners with only one active', async () => {
      // Only the active banner should be returned by the API
      const activeBanner = {
        id: '2',
        name: 'Active Banner',
        title: 'This is the active banner',
        description: 'Only this banner should be displayed',
        linkText: 'Active Link',
        linkUrl: 'https://active.com',
        isActive: true,
      }

      mockFetchHomepageBanner.mockResolvedValue(activeBanner)

      const component = await NoticeSection()
      render(component as React.ReactElement)

      expect(screen.getByText('This is the active banner')).toBeInTheDocument()
      expect(screen.getByText('Only this banner should be displayed')).toBeInTheDocument()
      expect(screen.getByRole('link', { name: 'Active Link' })).toBeInTheDocument()
    })

    it('gracefully handles API errors by showing fallback content', async () => {
      // Navigation falls back to default items
      const fallbackNavItems = [
        { id: "1", label: "Home", url: "/", title: "Go to landing page of site", order: 1 },
        { id: "2", label: "Mollys Story", url: "/story", title: "Find out more about Molly Rose", order: 2 },
      ]
      mockFetchNavigationItems.mockResolvedValue(fallbackNavItems)

      // Banner falls back to default blood donation banner
      const fallbackBanner = {
        id: '1',
        name: 'Blood Donation Default',
        title: 'Give blood, save a childs life',
        description: 'Blood Donations are essential during the treatment of childhood cancer. During lockdown the Irish Blood transfusion board continue to need your help.',
        linkText: 'Find a Clinic',
        linkUrl: 'https://www.giveblood.ie/Find-a-Clinic/Clinic-Finder/',
        isActive: true,
      }
      mockFetchHomepageBanner.mockResolvedValue(fallbackBanner)

      // Render navigation
      render(<Menu />)
      
      // Render banner
      const bannerComponent = await NoticeSection()
      render(bannerComponent as React.ReactElement)

      // Check navigation fallback
      await waitFor(() => {
        expect(screen.getByText('Home')).toBeInTheDocument()
      })
      expect(screen.getByText('Mollys Story')).toBeInTheDocument()

      // Check banner fallback
      expect(screen.getByText('Give blood, save a childs life')).toBeInTheDocument()
      expect(screen.getByRole('link', { name: 'Find a Clinic' })).toBeInTheDocument()
    })

    it('handles navigation with no fallback needed (successful API call)', async () => {
      const liveNavItems = [
        { id: '1', label: 'Live Home', url: '/', title: 'Live home page', order: 1 },
        { id: '2', label: 'Live About', url: '/about', title: 'Live about page', order: 2 },
        { id: '3', label: 'Live Services', url: '/services', title: 'Live services page', order: 3 },
      ]
      mockFetchNavigationItems.mockResolvedValue(liveNavItems)

      render(<Menu />)

      await waitFor(() => {
        expect(screen.getByText('Live Home')).toBeInTheDocument()
      })
      expect(screen.getByText('Live About')).toBeInTheDocument()
      expect(screen.getByText('Live Services')).toBeInTheDocument()

      // Check that links have correct attributes
      const homeLink = screen.getByText('Live Home').closest('a')
      expect(homeLink).toHaveAttribute('href', '/')
      expect(homeLink).toHaveAttribute('title', 'Live home page')
    })
  })

  describe('Mobile Navigation Scenarios', () => {
    it('mobile menu works correctly with dynamic navigation items', async () => {
      const dynamicNavItems = [
        { id: '1', label: 'Dynamic Home', url: '/', order: 1 },
        { id: '2', label: 'Dynamic Contact', url: '/contact', order: 2 },
      ]
      mockFetchNavigationItems.mockResolvedValue(dynamicNavItems)
      
      const user = userEvent.setup()
      render(<Menu />)

      // Wait for navigation to load
      await waitFor(() => {
        expect(screen.getByText('Dynamic Home')).toBeInTheDocument()
      })

      const toggleButton = screen.getByRole('button', { name: 'Toggle navigation' })
      const navbarCollapse = document.querySelector('.navbar-collapse')

      // Test mobile menu toggle
      expect(navbarCollapse).not.toHaveClass('show')
      
      await user.click(toggleButton)
      expect(navbarCollapse).toHaveClass('show')

      // Click on a navigation item to close menu
      const contactLink = screen.getByText('Dynamic Contact')
      await user.click(contactLink)
      expect(navbarCollapse).not.toHaveClass('show')
    })

    it('mobile menu button attributes update correctly', async () => {
      mockFetchNavigationItems.mockResolvedValue([])
      
      const user = userEvent.setup()
      render(<Menu />)

      const toggleButton = screen.getByRole('button', { name: 'Toggle navigation' })

      // Initially closed
      expect(toggleButton).toHaveAttribute('aria-expanded', 'false')

      // Open menu
      await user.click(toggleButton)
      expect(toggleButton).toHaveAttribute('aria-expanded', 'true')

      // Close menu
      await user.click(toggleButton)
      expect(toggleButton).toHaveAttribute('aria-expanded', 'false')
    })
  })

  describe('Banner Content Variations', () => {
    it('handles banner with external link correctly', async () => {
      const externalLinkBanner = {
        id: '1',
        name: 'External Link Banner',
        title: 'External Resource',
        description: 'Click the link to visit an external site',
        linkText: 'Visit External Site',
        linkUrl: 'https://external-site.com/resource',
        isActive: true,
      }

      mockFetchHomepageBanner.mockResolvedValue(externalLinkBanner)

      const component = await NoticeSection()
      render(component as React.ReactElement)

      const externalLink = screen.getByRole('link', { name: 'Visit External Site' })
      expect(externalLink).toHaveAttribute('href', 'https://external-site.com/resource')
      expect(externalLink).toHaveAttribute('target', '_blank')
      expect(externalLink).toHaveAttribute('rel', 'noopener noreferrer')
    })

    it('handles banner with internal link correctly', async () => {
      const internalLinkBanner = {
        id: '1',
        name: 'Internal Link Banner',
        title: 'Internal Page',
        description: 'Navigate to an internal page',
        linkText: 'Go to Internal Page',
        linkUrl: '/internal-page',
        isActive: true,
      }

      mockFetchHomepageBanner.mockResolvedValue(internalLinkBanner)

      const component = await NoticeSection()
      render(component as React.ReactElement)

      const internalLink = screen.getByRole('link', { name: 'Go to Internal Page' })
      expect(internalLink).toHaveAttribute('href', '/internal-page')
      expect(internalLink).toHaveAttribute('target', '_blank')
      expect(internalLink).toHaveAttribute('rel', 'noopener noreferrer')
    })

    it('handles very long banner content', async () => {
      const longContentBanner = {
        id: '1',
        name: 'Long Content Banner',
        title: 'This is a very long title that might wrap to multiple lines on smaller screens and should still display correctly',
        description: 'This is an extremely long description that contains a lot of information about childhood cancer awareness, support services, upcoming events, donation opportunities, and various ways that people can get involved with the Molly Rose Foundation to help families affected by childhood cancer.',
        linkText: 'This is a very long link text that might also wrap',
        linkUrl: 'https://example.com/very/long/url/path/that/might/extend/beyond/normal/expectations',
        isActive: true,
      }

      mockFetchHomepageBanner.mockResolvedValue(longContentBanner)

      const component = await NoticeSection()
      render(component as React.ReactElement)

      expect(screen.getByText(/This is a very long title/)).toBeInTheDocument()
      expect(screen.getByText(/This is an extremely long description/)).toBeInTheDocument()
      expect(screen.getByRole('link', { name: /This is a very long link text/ })).toBeInTheDocument()
    })
  })

  describe('Accessibility and Structure', () => {
    it('banner maintains proper heading hierarchy', async () => {
      const testBanner = {
        id: '1',
        name: 'Test Banner',
        title: 'Test Heading',
        description: 'Test description',
        isActive: true,
      }

      mockFetchHomepageBanner.mockResolvedValue(testBanner)

      const component = await NoticeSection()
      render(component as React.ReactElement)

      const heading = screen.getByRole('heading', { level: 2 })
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveTextContent('Test Heading')
    })

    it('navigation maintains proper list structure', async () => {
      const testNavItems = [
        { id: '1', label: 'Home', url: '/', order: 1 },
        { id: '2', label: 'About', url: '/about', order: 2 },
      ]
      mockFetchNavigationItems.mockResolvedValue(testNavItems)

      render(<Menu />)

      await waitFor(() => {
        expect(screen.getByText('Home')).toBeInTheDocument()
      })

      const navList = document.querySelector('.navbar-nav')
      expect(navList).toBeInTheDocument()
      expect(navList?.tagName).toBe('UL')

      const navItems = document.querySelectorAll('.nav-item')
      expect(navItems).toHaveLength(2)
      
      navItems.forEach(item => {
        expect(item.tagName).toBe('LI')
      })
    })

    it('banner link has proper accessibility attributes', async () => {
      const bannerWithLink = {
        id: '1',
        name: 'Accessible Banner',
        title: 'Accessible Title',
        description: 'Accessible description',
        linkText: 'Learn More',
        linkUrl: 'https://example.com/learn-more',
        isActive: true,
      }

      mockFetchHomepageBanner.mockResolvedValue(bannerWithLink)

      const component = await NoticeSection()
      render(component as React.ReactElement)

      const link = screen.getByRole('link', { name: 'Learn More' })
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })

  describe('Error Handling and Edge Cases', () => {
    it('handles banner API returning null gracefully', async () => {
      mockFetchHomepageBanner.mockResolvedValue(null)

      const component = await NoticeSection()
      expect(component).toBeNull()
    })

    it('handles navigation API returning empty array', async () => {
      mockFetchNavigationItems.mockResolvedValue([])

      render(<Menu />)

      // Should still render the basic structure
      expect(screen.getByText('MollyRose.ie')).toBeInTheDocument()
      expect(screen.getByText('Lets talk about Childhood Cancer')).toBeInTheDocument()
      
      // But no navigation items
      const navItems = document.querySelectorAll('.nav-item')
      expect(navItems).toHaveLength(0)
    })

    it('handles malformed banner data gracefully', async () => {
      const malformedBanner = {
        id: '1',
        name: '',
        title: '',
        description: '',
        linkText: '',
        linkUrl: '',
        isActive: true,
      }

      mockFetchHomepageBanner.mockResolvedValue(malformedBanner)

      const component = await NoticeSection()
      render(component as React.ReactElement)

      // Should render the structure even with empty content
      const section = document.querySelector('section')
      expect(section).toBeInTheDocument()
      
      // Should not render the link when linkText or linkUrl is empty
      expect(screen.queryByRole('link')).not.toBeInTheDocument()
    })
  })
})
