import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { CTA } from '@/components/CTA'
import { env } from '@/lib/env'

describe('CTA Component', () => {
  it('renders with correct text', () => {
    render(<CTA>Vote Now</CTA>)
    expect(screen.getByText('Vote Now')).toBeInTheDocument()
  })

  it('has correct href pointing to vote URL', () => {
    render(<CTA data-testid="vote-button">Vote Now</CTA>)
    const link = screen.getByTestId('vote-button')
    expect(link).toHaveAttribute('href', env.voteUrl)
  })

  it('opens in new tab with correct rel attribute', () => {
    render(<CTA data-testid="vote-button">Vote Now</CTA>)
    const link = screen.getByTestId('vote-button')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('has visible and accessible label', () => {
    render(<CTA>Cast My Vote</CTA>)
    const link = screen.getByRole('link', { name: /Cast My Vote/i })
    expect(link).toBeVisible()
    expect(link).toHaveAccessibleName()
  })

  it('renders with small size variant', () => {
    render(<CTA size="small">Vote</CTA>)
    const link = screen.getByText('Vote')
    expect(link).toHaveClass('px-6', 'py-2.5', 'text-sm')
  })

  it('renders with large size variant (default)', () => {
    render(<CTA>Vote Now</CTA>)
    const link = screen.getByText('Vote Now')
    expect(link).toHaveClass('px-8', 'py-4')
  })

  it('is keyboard accessible', () => {
    render(<CTA>Vote Now</CTA>)
    const link = screen.getByText('Vote Now')
    link.focus()
    expect(link).toHaveFocus()
  })
})
