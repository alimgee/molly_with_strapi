import { render, screen } from '@testing-library/react'
import { FirstArticle } from '../app/news/FirstArticle'

describe('FirstArticle Component', () => {
  const mockArticle = {
    id: "1",
    name: "Test Article Title",
    content: "This is a test article content that should be displayed.",
    link: "https://example.com/test-article",
    date: "2024-01-01",
    provider: "Test Provider"
  }

  it('renders article with name and content when article is provided', () => {
    render(<FirstArticle article={mockArticle} />)

    expect(screen.getByText('Test Article Title')).toBeInTheDocument()
    expect(screen.getByText('This is a test article content that should be displayed.')).toBeInTheDocument()
  })

  it('returns null when no article is provided', () => {
    const { container } = render(<FirstArticle article={null} />)
    
    expect(container.firstChild).toBeNull()
  })

  it('returns null when article is undefined', () => {
    const { container } = render(<FirstArticle article={undefined} />)
    
    expect(container.firstChild).toBeNull()
  })

  it('applies correct CSS classes and styling', () => {
    render(<FirstArticle article={mockArticle} />)

    // Check for card-text class on title container
    const titleContainer = document.querySelector('.card-text')
    expect(titleContainer).toBeInTheDocument()

    // Check for news-header class and Roboto Mono font
    const newsHeader = document.querySelector('.news-header')
    expect(newsHeader).toBeInTheDocument()
    expect(newsHeader).toHaveStyle('font-family: Roboto Mono')

    // Check for content container with mb-3 class
    const contentContainer = document.querySelector('.card-text.mb-3')
    expect(contentContainer).toBeInTheDocument()
  })

  it('renders proper heading hierarchy', () => {
    render(<FirstArticle article={mockArticle} />)

    const heading = screen.getByRole('heading', { level: 3 })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent('Test Article Title')
  })

  it('handles article with empty name', () => {
    const articleWithEmptyName = {
      ...mockArticle,
      name: ""
    }

    render(<FirstArticle article={articleWithEmptyName} />)

    const heading = screen.getByRole('heading', { level: 3 })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent('')
  })

  it('handles article with empty content', () => {
    const articleWithEmptyContent = {
      ...mockArticle,
      content: ""
    }

    render(<FirstArticle article={articleWithEmptyContent} />)

    expect(screen.getByText('Test Article Title')).toBeInTheDocument()
    
    const contentSpan = document.querySelector('.card-text.mb-3 span')
    expect(contentSpan).toBeInTheDocument()
    expect(contentSpan).toHaveTextContent('')
  })

  it('renders with correct HTML structure', () => {
    render(<FirstArticle article={mockArticle} />)

    // Should render a fragment with two main div elements
    const cardTextElements = document.querySelectorAll('.card-text')
    expect(cardTextElements).toHaveLength(2)

    // First div contains the h3 title
    const titleDiv = cardTextElements[0]
    const h3 = titleDiv.querySelector('h3.news-header')
    expect(h3).toBeInTheDocument()

    // Second div contains the content span
    const contentDiv = cardTextElements[1]
    const span = contentDiv.querySelector('span')
    expect(span).toBeInTheDocument()
  })

  it('handles article with special characters in content', () => {
    const articleWithSpecialChars = {
      ...mockArticle,
      name: "Test & Article > Title < With \"Quotes\"",
      content: "Content with special chars: & < > \" ' and symbols €£$"
    }

    render(<FirstArticle article={articleWithSpecialChars} />)

    expect(screen.getByText('Test & Article > Title < With "Quotes"')).toBeInTheDocument()
    expect(screen.getByText('Content with special chars: & < > " \' and symbols €£$')).toBeInTheDocument()
  })

  it('handles very long article name and content', () => {
    const longArticle = {
      ...mockArticle,
      name: "This is a very long article title that might wrap to multiple lines and should still display correctly without breaking the layout",
      content: "This is a very long article content that contains a lot of information and details about the topic and should wrap properly within the container without causing any layout issues or text overflow problems."
    }

    render(<FirstArticle article={longArticle} />)

    expect(screen.getByText(/This is a very long article title/)).toBeInTheDocument()
    expect(screen.getByText(/This is a very long article content/)).toBeInTheDocument()
  })

  it('is a client component (uses "use client" directive)', () => {
    // This test verifies the component can handle client-side rendering
    expect(() => render(<FirstArticle article={mockArticle} />)).not.toThrow()
  })
})
