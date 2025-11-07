'use client'

import { useEffect, useState } from 'react'
import { env } from '@/lib/env'
import { trackCountdownZero } from '@/lib/analytics'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
  expired: boolean
}

function calculateTimeLeft(targetDate: string): TimeLeft {
  const difference = new Date(targetDate).getTime() - Date.now()

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true }
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    expired: false,
  }
}

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null)
  const [hasTrackedExpiry, setHasTrackedExpiry] = useState(false)

  useEffect(() => {
    if (!env.voteEndsISO) return

    // Initial calculation
    setTimeLeft(calculateTimeLeft(env.voteEndsISO))

    // Update every second
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(env.voteEndsISO!)
      setTimeLeft(newTimeLeft)

      if (newTimeLeft.expired && !hasTrackedExpiry) {
        trackCountdownZero()
        setHasTrackedExpiry(true)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [hasTrackedExpiry])

  if (!env.voteEndsISO || !timeLeft) return null

  if (timeLeft.expired) {
    return (
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-black/5 rounded-lg">
        <span className="text-sm font-medium text-black/60">Voting has closed</span>
      </div>
    )
  }

  return (
    <div className="inline-flex items-center gap-3 px-4 py-2 bg-black/5 rounded-lg">
      <span className="text-sm font-medium text-black/60">Voting ends in:</span>
      <div className="flex gap-2">
        {timeLeft.days > 0 && (
          <TimeUnit value={timeLeft.days} label="d" />
        )}
        <TimeUnit value={timeLeft.hours} label="h" />
        <TimeUnit value={timeLeft.minutes} label="m" />
        <TimeUnit value={timeLeft.seconds} label="s" />
      </div>
    </div>
  )
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex items-baseline gap-0.5">
      <span className="text-base font-bold font-heading tabular-nums">
        {value.toString().padStart(2, '0')}
      </span>
      <span className="text-xs text-black/60">{label}</span>
    </div>
  )
}
