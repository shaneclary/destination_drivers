'use client'

import { env } from '@/lib/env'
import { trackVoteClick } from '@/lib/analytics'

interface CTAProps {
  children: React.ReactNode
  size?: 'small' | 'large'
  className?: string
  'data-testid'?: string
}

export function CTA({ children, size = 'large', className = '', ...props }: CTAProps) {
  const handleClick = () => {
    trackVoteClick(env.voteUrl)
  }

  const sizeClasses = size === 'small'
    ? 'px-6 py-2.5 text-sm'
    : 'px-8 py-4 text-base sm:text-lg'

  return (
    <a
      href={env.voteUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={`btn-primary ${sizeClasses} ${className}`}
      aria-label={`${children} - Opens official ballot in new tab`}
      {...props}
    >
      {children}
    </a>
  )
}
