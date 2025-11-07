'use client'

import { env } from './env'

// Consent management
const CONSENT_KEY = 'analytics_ok'

export function hasConsent(): boolean {
  if (typeof window === 'undefined') return false
  return localStorage.getItem(CONSENT_KEY) === 'true'
}

export function grantConsent(): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(CONSENT_KEY, 'true')
  initializeAnalytics()
}

export function revokeConsent(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(CONSENT_KEY)
}

// Google Analytics initialization
export function initializeAnalytics(): void {
  if (!env.gaMeasurementId || !hasConsent()) return

  // Load gtag script
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${env.gaMeasurementId}`
  document.head.appendChild(script)

  // Initialize gtag
  window.dataLayer = window.dataLayer || []
  function gtag(...args: any[]) {
    window.dataLayer.push(args)
  }
  window.gtag = gtag

  gtag('js', new Date())
  gtag('config', env.gaMeasurementId, {
    anonymize_ip: true,
  })
}

// Event tracking
export function trackEvent(eventName: string, params?: Record<string, any>): void {
  if (!hasConsent() || typeof window === 'undefined' || !window.gtag) return

  window.gtag('event', eventName, params)
}

// Typed events
export const trackVoteClick = (destination: string) => {
  trackEvent('vote_click', { destination })
}

export const trackCountdownZero = () => {
  trackEvent('countdown_zero')
}

// Global type declarations
declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
  }
}
