import { render, screen } from '@testing-library/react'
import Home from '../app/home/Home'

// Mock Next.js Head component
jest.mock('next/head', () => {
  return function MockHead({ children }: any) {
    return <div data-testid="next-head">{children}</div>
  }
})

// Mock all the child components
jest.mock('../app/home/Intro', () => {
  return function MockIntro() {
    return <div data-testid="intro-component">Intro Component</div>
  }
})

jest.mock('../app/home/Quote', () => {
  return function MockQuote() {
    return <div data-testid="quote-component">Quote Component</div>
  }
})

jest.mock('../app/home/Notice', () => {
  return function MockNotice() {
    return <div data-testid="notice-component">Notice Component</div>
  }
})

jest.mock('../app/home/Cards', () => {
  return function MockCards() {
    return <div data-testid="cards-component">Cards Component</div>
  }
})

describe('Home Component', () => {
  it('renders the main element', () => {
    render(<Home />)
    
    const main = document.querySelector('main')
    expect(main).toBeInTheDocument()
  })

  it('renders all child components in correct order', () => {
    render(<Home />)

    const intro = screen.getByTestId('intro-component')
    const quote = screen.getByTestId('quote-component')
    const notice = screen.getByTestId('notice-component')
    const cards = screen.getByTestId('cards-component')

    expect(intro).toBeInTheDocument()
    expect(quote).toBeInTheDocument()
    expect(notice).toBeInTheDocument()
    expect(cards).toBeInTheDocument()

    // Check the order by getting all components and verifying their order
    const main = document.querySelector('main')
    const children = Array.from(main?.children || [])
    
    // Main should contain the 4 components in order (Head is outside main)
    expect(children[0]).toHaveAttribute('data-testid', 'intro-component')
    expect(children[1]).toHaveAttribute('data-testid', 'quote-component')
    expect(children[2]).toHaveAttribute('data-testid', 'notice-component')
    expect(children[3]).toHaveAttribute('data-testid', 'cards-component')
  })

  it('renders Helmet with correct meta information', () => {
    render(<Home />)

    const helmet = screen.getByTestId('next-head')
    expect(helmet).toBeInTheDocument()

    // Check if Next head contains title and meta description
    const title = helmet.querySelector('title')
    const metaDescription = helmet.querySelector('meta[name="description"]')

    expect(title).toHaveTextContent('Home - mollyrose.ie')
    expect(metaDescription).toHaveAttribute('content', 'Driving awareness of Childhood Cancer and Telling Molly Roses story')
  })

  it('has proper semantic structure with main element', () => {
    render(<Home />)

    const main = document.querySelector('main')
    expect(main).toBeInTheDocument()
    expect(main?.tagName).toBe('MAIN')
  })

  it('renders without crashing when all components are present', () => {
    expect(() => render(<Home />)).not.toThrow()
  })

  it('renders all expected child components', () => {
    render(<Home />)

    // Verify all expected components are rendered
    expect(screen.getByTestId('intro-component')).toBeInTheDocument()
    expect(screen.getByTestId('quote-component')).toBeInTheDocument()
    expect(screen.getByTestId('notice-component')).toBeInTheDocument()
    expect(screen.getByTestId('cards-component')).toBeInTheDocument()
  })

  it('maintains proper component hierarchy', () => {
    render(<Home />)

    const main = document.querySelector('main')
    const components = main?.querySelectorAll('[data-testid*="component"]')
    
    // Should have exactly 4 components inside main
    expect(components).toHaveLength(4)
  })

  it('includes SEO meta tags for the home page', () => {
    render(<Home />)

    const helmet = screen.getByTestId('next-head')
    
    // Check for proper meta tags structure
    const title = helmet.querySelector('title')
    const metaTag = helmet.querySelector('meta')

    expect(title).toBeInTheDocument()
    expect(metaTag).toBeInTheDocument()
    expect(metaTag).toHaveAttribute('name', 'description')
  })

  it('uses React functional component pattern', () => {
    // This test verifies the component is a function that returns JSX
    expect(typeof Home).toBe('function')
    
    const result = render(<Home />)
    expect(result.container.firstChild).toBeInTheDocument()
  })

  it('renders content in a predictable order for accessibility', () => {
    render(<Home />)

    const main = document.querySelector('main')
    const childElements = Array.from(main?.children || [])

    // Main contains content components in logical order (Head is outside main)
    expect(childElements[0]).toHaveAttribute('data-testid', 'intro-component')  // Introduction first
    expect(childElements[1]).toHaveAttribute('data-testid', 'quote-component')  // Quote second
    expect(childElements[2]).toHaveAttribute('data-testid', 'notice-component') // Notice third
    expect(childElements[3]).toHaveAttribute('data-testid', 'cards-component')  // Cards last
  })

  it('has proper page structure for screen readers', () => {
    render(<Home />)

    // Main landmark should be present for screen readers
    const main = screen.getByRole('main')
    expect(main).toBeInTheDocument()
  })
})
