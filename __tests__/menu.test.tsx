import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Menu from '../components/Menu'
import { fetchNavigationItems } from '../lib/strapi'

// Mock the strapi module
jest.mock('../lib/strapi', () => ({
  fetchNavigationItems: jest.fn(),
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

describe('Menu Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const mockNavigationItems = [
    { id: '1', label: 'Home', url: '/', title: 'Go to home page', order: 1 },
    { id: '2', label: 'About', url: '/about', title: 'Learn about us', order: 2 },
    { id: '3', label: 'Contact', url: '/contact', title: 'Contact us', order: 3 },
  ]

  it('renders navigation items correctly', async () => {
    mockFetchNavigationItems.mockResolvedValue(mockNavigationItems)

    render(<Menu />)

    // Wait for navigation items to load
    await waitFor(() => {
      expect(screen.getByText('Home')).toBeInTheDocument()
    })

    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('renders brand link correctly', () => {
    mockFetchNavigationItems.mockResolvedValue([])

    render(<Menu />)

    const brandLink = screen.getByText('MollyRose.ie')
    expect(brandLink).toBeInTheDocument()
    expect(brandLink.closest('a')).toHaveAttribute('href', '/')
    expect(brandLink.closest('a')).toHaveClass('navbar-brand')
  })

  it('renders tagline correctly on large screens', () => {
    mockFetchNavigationItems.mockResolvedValue([])

    render(<Menu />)

    const tagline = screen.getByText('Lets talk about Childhood Cancer')
    expect(tagline).toBeInTheDocument()
    expect(tagline).toHaveClass('d-none', 'd-lg-block', 'navbar-text')
  })

  it('renders mobile toggle button with correct attributes', () => {
    mockFetchNavigationItems.mockResolvedValue([])

    render(<Menu />)

    const toggleButton = screen.getByRole('button', { name: 'Toggle navigation' })
    expect(toggleButton).toBeInTheDocument()
    expect(toggleButton).toHaveClass('navbar-toggler', 'd-lg-none')
    expect(toggleButton).toHaveAttribute('type', 'button')
    expect(toggleButton).toHaveAttribute('aria-controls', 'navbarNav')
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false')
    expect(toggleButton).toHaveAttribute('aria-label', 'Toggle navigation')

    const toggleIcon = toggleButton.querySelector('.navbar-toggler-icon')
    expect(toggleIcon).toBeInTheDocument()
  })

  it('toggles mobile menu when toggle button is clicked', async () => {
    mockFetchNavigationItems.mockResolvedValue(mockNavigationItems)
    const user = userEvent.setup()

    render(<Menu />)

    const toggleButton = screen.getByRole('button', { name: 'Toggle navigation' })
    const navbarCollapse = document.querySelector('.navbar-collapse')

    // Initially closed
    expect(navbarCollapse).not.toHaveClass('show')
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false')

    // Click to open
    await user.click(toggleButton)

    expect(navbarCollapse).toHaveClass('show')
    expect(toggleButton).toHaveAttribute('aria-expanded', 'true')

    // Click to close
    await user.click(toggleButton)

    expect(navbarCollapse).not.toHaveClass('show')
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false')
  })

  it('closes mobile menu when navigation link is clicked', async () => {
    mockFetchNavigationItems.mockResolvedValue(mockNavigationItems)
    const user = userEvent.setup()

    render(<Menu />)

    const toggleButton = screen.getByRole('button', { name: 'Toggle navigation' })
    const navbarCollapse = document.querySelector('.navbar-collapse')

    // Open the menu first
    await user.click(toggleButton)
    expect(navbarCollapse).toHaveClass('show')

    // Wait for navigation items to load and then click a nav link
    await waitFor(() => {
      expect(screen.getByText('Home')).toBeInTheDocument()
    })

    const homeLink = screen.getByText('Home')
    await user.click(homeLink)

    // Menu should be closed
    expect(navbarCollapse).not.toHaveClass('show')
  })

  it('renders navigation links with correct attributes', async () => {
    mockFetchNavigationItems.mockResolvedValue(mockNavigationItems)

    render(<Menu />)

    await waitFor(() => {
      expect(screen.getByText('Home')).toBeInTheDocument()
    })

    const homeLink = screen.getByText('Home').closest('a')
    expect(homeLink).toHaveAttribute('href', '/')
    expect(homeLink).toHaveAttribute('title', 'Go to home page')
    expect(homeLink).toHaveClass('nav-link')

    const aboutLink = screen.getByText('About').closest('a')
    expect(aboutLink).toHaveAttribute('href', '/about')
    expect(aboutLink).toHaveAttribute('title', 'Learn about us')
    expect(aboutLink).toHaveClass('nav-link')

    const contactLink = screen.getByText('Contact').closest('a')
    expect(contactLink).toHaveAttribute('href', '/contact')
    expect(contactLink).toHaveAttribute('title', 'Contact us')
    expect(contactLink).toHaveClass('nav-link')
  })

  it('falls back to title as label when title is not provided', async () => {
    const navigationItemsWithoutTitle = [
      { id: '1', label: 'Home', url: '/', order: 1 },
    ]

    mockFetchNavigationItems.mockResolvedValue(navigationItemsWithoutTitle)

    render(<Menu />)

    await waitFor(() => {
      expect(screen.getByText('Home')).toBeInTheDocument()
    })

    const homeLink = screen.getByText('Home').closest('a')
    expect(homeLink).toHaveAttribute('title', 'Home') // Falls back to label
  })

  it('renders proper Bootstrap navbar structure and classes', () => {
    mockFetchNavigationItems.mockResolvedValue([])

    render(<Menu />)

    // Check main nav element
    const nav = document.querySelector('nav')
    expect(nav).toHaveClass('navbar', 'navbar-expand-lg', 'navbar-dark', 'fixed-top')

    // Check container
    const container = document.querySelector('.container-fluid')
    expect(container).toBeInTheDocument()

    // Check navbar collapse
    const navbarCollapse = document.querySelector('.navbar-collapse')
    expect(navbarCollapse).toHaveClass('collapse', 'navbar-collapse')
    expect(navbarCollapse).toHaveAttribute('id', 'navbarNav')

    // Check navbar nav
    const navbarNav = document.querySelector('.navbar-nav')
    expect(navbarNav).toHaveClass('navbar-nav', 'ms-auto')
  })

  it('renders navigation items in correct order', async () => {
    const unorderedItems = [
      { id: '3', label: 'Contact', url: '/contact', title: 'Contact us', order: 3 },
      { id: '1', label: 'Home', url: '/', title: 'Go to home page', order: 1 },
      { id: '2', label: 'About', url: '/about', title: 'Learn about us', order: 2 },
    ]

    mockFetchNavigationItems.mockResolvedValue(unorderedItems)

    render(<Menu />)

    await waitFor(() => {
      expect(screen.getByText('Home')).toBeInTheDocument()
    })

    const navItems = document.querySelectorAll('.nav-item')
    expect(navItems).toHaveLength(3)

    // Items should be rendered in the order they're returned from the API
    // (The API should handle sorting by order:asc)
    expect(navItems[0]).toHaveTextContent('Contact')
    expect(navItems[1]).toHaveTextContent('Home')
    expect(navItems[2]).toHaveTextContent('About')
  })

  it('handles empty navigation items gracefully', async () => {
    mockFetchNavigationItems.mockResolvedValue([])

    render(<Menu />)

    await waitFor(() => {
      const navItems = document.querySelectorAll('.nav-item')
      expect(navItems).toHaveLength(0)
    })

    // Should still render the basic structure
    expect(screen.getByText('MollyRose.ie')).toBeInTheDocument()
    expect(screen.getByText('Lets talk about Childhood Cancer')).toBeInTheDocument()
  })

  it('handles navigation items fetch error gracefully', async () => {
    // When fetch fails, the strapi function returns fallback navigation items
    const fallbackItems = [
      { id: "1", label: "Home", url: "/", title: "Go to landing page of site", order: 1 },
      { id: "2", label: "Mollys Story", url: "/story", title: "Find out more about Molly Rose", order: 2 },
    ]

    mockFetchNavigationItems.mockResolvedValue(fallbackItems)

    render(<Menu />)

    await waitFor(() => {
      expect(screen.getByText('Home')).toBeInTheDocument()
    })

    expect(screen.getByText('Mollys Story')).toBeInTheDocument()
  })

  it('maintains navigation list item structure', async () => {
    mockFetchNavigationItems.mockResolvedValue(mockNavigationItems)

    render(<Menu />)

    await waitFor(() => {
      expect(screen.getByText('Home')).toBeInTheDocument()
    })

    const navItems = document.querySelectorAll('.nav-item')
    expect(navItems).toHaveLength(3)

    navItems.forEach(item => {
      expect(item.tagName).toBe('LI')
      expect(item).toHaveClass('nav-item')
      
      const link = item.querySelector('a')
      expect(link).toHaveClass('nav-link')
    })
  })
})
