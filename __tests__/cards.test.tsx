import { render, screen } from '@testing-library/react'
import CardSection from '../app/home/Cards'

// Mock Next.js components
jest.mock('next/image', () => {
  return function MockImage({ src, alt, width, height, className }: any) {
    return (
      <img 
        src={src} 
        alt={alt} 
        width={width} 
        height={height} 
        className={className}
        data-testid="next-image"
      />
    )
  }
})

jest.mock('next/link', () => {
  return function MockLink({ children, href, passHref, legacyBehavior }: any) {
    return (
      <div data-href={href} data-testid="next-link">
        {children}
      </div>
    )
  }
})

// Mock the FirstArticle component
jest.mock('../app/news/FirstArticle', () => ({
  FirstArticle: ({ article }: any) => (
    <div data-testid="first-article">
      {article ? (
        <>
          <div className="card-text">
            <h3 className="news-header" style={{fontFamily:"Roboto Mono"}}>{article.name}</h3>
          </div>
          <div className="card-text mb-3">
            <span>{article.content}</span>
          </div>
        </>
      ) : (
        <p>No article available</p>
      )}
    </div>
  )
}))

// Mock the news data
jest.mock('../app/news/data', () => ({
  Articles: [
    {
      id: '1',
      name: 'Test Article',
      content: 'Test article content',
      link: 'https://example.com',
      date: '2024-01-01',
      provider: 'Test Provider'
    }
  ]
}))

describe('Cards Component', () => {
  it('renders all three cards with correct headers', () => {
    render(<CardSection />)
    
    expect(screen.getByText('Tell me more')).toBeInTheDocument()
    expect(screen.getByText('How Can I Help?')).toBeInTheDocument()
    expect(screen.getByText('News & Events')).toBeInTheDocument()
  })

  it('renders cancer information card correctly', () => {
    render(<CardSection />)
    
    expect(screen.getByText('Childhood Cancer causes, signs and symptoms')).toBeInTheDocument()
    expect(screen.getByText(/There are many types of diseases that are classed Childhood Cancer/)).toBeInTheDocument()
    
    const cancerLink = screen.getByText('Childhood Cancer')
    expect(cancerLink).toBeInTheDocument()
    expect(cancerLink.closest('[data-href]')).toHaveAttribute('data-href', '/childhoodcancer')
  })

  it('renders help card correctly', () => {
    render(<CardSection />)
    
    expect(screen.getByText('Donating blood and helping out charitys')).toBeInTheDocument()
    expect(screen.getByText(/There are many organisations and charitys that provide much needed support/)).toBeInTheDocument()
    
    const helpLink = screen.getByText('Helping Out')
    expect(helpLink).toBeInTheDocument()
    expect(helpLink.closest('[data-href]')).toHaveAttribute('data-href', '/helpout')
  })

  it('renders news card with first article', () => {
    render(<CardSection />)
    
    const firstArticle = screen.getByTestId('first-article')
    expect(firstArticle).toBeInTheDocument()
    expect(screen.getByText('Test Article')).toBeInTheDocument()
    expect(screen.getByText('Test article content')).toBeInTheDocument()
    
    const newsLink = screen.getByText('Browse News')
    expect(newsLink).toBeInTheDocument()
    expect(newsLink.closest('[data-href]')).toHaveAttribute('data-href', '/news')
  })

  it('renders all images with correct attributes', () => {
    render(<CardSection />)
    
    const images = screen.getAllByTestId('next-image')
    expect(images).toHaveLength(3)
    
    // Cancer card image
    expect(images[0]).toHaveAttribute('src', '/assets/img/cancer-module.png')
    expect(images[0]).toHaveAttribute('alt', 'balloons floating into the sky')
    
    // Help card image
    expect(images[1]).toHaveAttribute('src', '/assets/img/crumlin2.png')
    expect(images[1]).toHaveAttribute('alt', 'Crumlin Childrens Hospital')
    
    // News card image
    expect(images[2]).toHaveAttribute('src', '/assets/img/events.png')
    expect(images[2]).toHaveAttribute('alt', 'Colourful chalk pieces')
  })

  it('has proper Bootstrap structure', () => {
    render(<CardSection />)
    
    // Check for section wrapper
    const section = document.querySelector('section')
    expect(section).toBeInTheDocument()
    
    // Check for Bootstrap container
    const container = document.querySelector('.container')
    expect(container).toBeInTheDocument()
    expect(container).toHaveClass('mb-4')
    
    // Check for Bootstrap row
    const row = document.querySelector('.row')
    expect(row).toBeInTheDocument()
    
    // Check for Bootstrap columns
    const columns = document.querySelectorAll('.col-lg-4')
    expect(columns).toHaveLength(3)
    
    columns.forEach(col => {
      expect(col).toHaveClass('mb-4')
    })
  })

  it('renders card components with proper structure', () => {
    render(<CardSection />)
    
    // Check for card elements
    const cards = document.querySelectorAll('.card')
    expect(cards).toHaveLength(3)
    
    // Check for card headers
    const cardHeaders = document.querySelectorAll('.card-header')
    expect(cardHeaders).toHaveLength(3)
    
    // Check for card bodies
    const cardBodies = document.querySelectorAll('.card-body')
    expect(cardBodies).toHaveLength(3)
    
    // Check for card text elements
    const cardTexts = document.querySelectorAll('.card-text')
    expect(cardTexts).toHaveLength(6) // 2 from first card, 2 from second card, 2 from FirstArticle in third card
  })

  it('has proper accessibility attributes', () => {
    render(<CardSection />)
    
    // Check for proper heading hierarchy
    const h2Elements = screen.getAllByRole('heading', { level: 2 })
    expect(h2Elements).toHaveLength(3)
    
    const h3Elements = screen.getAllByRole('heading', { level: 3 })
    expect(h3Elements).toHaveLength(3) // 2 from cards + 1 from FirstArticle
    
    // Check for button roles
    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(3)
    
    buttons.forEach(button => {
      expect(button).toHaveAttribute('title')
    })
  })

  it('handles styling attributes correctly', () => {
    render(<CardSection />)
    
    // Check for Roboto Mono font family
    const newsHeaders = document.querySelectorAll('.news-header')
    expect(newsHeaders).toHaveLength(3)
    
    newsHeaders.forEach(header => {
      expect(header).toHaveStyle('font-family: Roboto Mono')
    })
    
    // Check for text alignment on buttons
    const buttons = screen.getAllByRole('button')
    buttons.forEach(button => {
      expect(button).toHaveStyle('text-align: left')
    })
  })
})
