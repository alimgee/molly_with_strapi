import { render, screen } from '@testing-library/react'
import NoticeSection from '../app/home/Notice'
import { fetchHomepageBanner } from '../lib/strapi'

// Mock the strapi module
jest.mock('../lib/strapi', () => ({
  fetchHomepageBanner: jest.fn(),
}))

const mockFetchHomepageBanner = fetchHomepageBanner as jest.MockedFunction<typeof fetchHomepageBanner>

describe('NoticeSection Banner Logic', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders active banner with all fields', async () => {
    const mockBanner = {
      id: '1',
      name: 'Test Banner',
      title: 'Test Title',
      description: 'Test description for the banner',
      linkText: 'Test Link',
      linkUrl: 'https://example.com',
      isActive: true,
    }

    mockFetchHomepageBanner.mockResolvedValue(mockBanner)

    const component = await NoticeSection()
    render(component as React.ReactElement)

    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Test description for the banner')).toBeInTheDocument()
    
    const link = screen.getByRole('link', { name: 'Test Link' })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', 'https://example.com')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('renders banner without link when linkText or linkUrl is missing', async () => {
    const mockBanner = {
      id: '1',
      name: 'Test Banner',
      title: 'Test Title',
      description: 'Test description for the banner',
      linkText: undefined,
      linkUrl: undefined,
      isActive: true,
    }

    mockFetchHomepageBanner.mockResolvedValue(mockBanner)

    const component = await NoticeSection()
    render(component as React.ReactElement)

    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Test description for the banner')).toBeInTheDocument()
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })

  it('renders banner with only linkText but no linkUrl', async () => {
    const mockBanner = {
      id: '1',
      name: 'Test Banner',
      title: 'Test Title',
      description: 'Test description for the banner',
      linkText: 'Test Link',
      linkUrl: undefined,
      isActive: true,
    }

    mockFetchHomepageBanner.mockResolvedValue(mockBanner)

    const component = await NoticeSection()
    render(component as React.ReactElement)

    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Test description for the banner')).toBeInTheDocument()
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })

  it('renders banner with only linkUrl but no linkText', async () => {
    const mockBanner = {
      id: '1',
      name: 'Test Banner',
      title: 'Test Title',
      description: 'Test description for the banner',
      linkText: undefined,
      linkUrl: 'https://example.com',
      isActive: true,
    }

    mockFetchHomepageBanner.mockResolvedValue(mockBanner)

    const component = await NoticeSection()
    render(component as React.ReactElement)

    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Test description for the banner')).toBeInTheDocument()
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })

  it('does not render when no active banner is found', async () => {
    mockFetchHomepageBanner.mockResolvedValue(null)

    const component = await NoticeSection()
    expect(component).toBeNull()
  })

  it('does not render when fetchHomepageBanner throws an error but returns fallback', async () => {
    // When there's a connection error, the function returns the fallback banner
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

    const component = await NoticeSection()
    render(component as React.ReactElement)

    expect(screen.getByText('Give blood, save a childs life')).toBeInTheDocument()
    expect(screen.getByText(/Blood Donations are essential/)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Find a Clinic' })).toBeInTheDocument()
  })

  it('renders proper card structure and classes', async () => {
    const mockBanner = {
      id: '1',
      name: 'Test Banner',
      title: 'Test Title',
      description: 'Test description',
      isActive: true,
    }

    mockFetchHomepageBanner.mockResolvedValue(mockBanner)

    const component = await NoticeSection()
    render(component as React.ReactElement)

    // Check for proper Bootstrap classes and structure
    const section = document.querySelector('section')
    expect(section).toBeInTheDocument()
    
    const container = document.querySelector('.container')
    expect(container).toBeInTheDocument()
    expect(container).toHaveClass('mb-2')

    const card = document.querySelector('.card')
    expect(card).toBeInTheDocument()

    const cardBody = document.querySelector('.card-body')
    expect(cardBody).toBeInTheDocument()

    const cardText = document.querySelector('.card-text')
    expect(cardText).toBeInTheDocument()

    // Check for h2 title
    const title = screen.getByRole('heading', { level: 2 })
    expect(title).toBeInTheDocument()
    expect(title).toHaveTextContent('Test Title')
  })

  it('includes FontAwesome icon when link is present', async () => {
    const mockBanner = {
      id: '1',
      name: 'Test Banner',
      title: 'Test Title',
      description: 'Test description',
      linkText: 'Test Link',
      linkUrl: 'https://example.com',
      isActive: true,
    }

    mockFetchHomepageBanner.mockResolvedValue(mockBanner)

    const component = await NoticeSection()
    render(component as React.ReactElement)

    const icon = document.querySelector('.fa.fa-tint.mr-2')
    expect(icon).toBeInTheDocument()
    expect(icon).toHaveAttribute('aria-hidden', 'true')
  })
})
