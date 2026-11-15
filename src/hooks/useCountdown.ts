import { useEffect, useState } from 'react'

const TICK_MS = 1000

/** Counts down once per second while `isRunning`; calls `onEnd` when it reaches zero. */
export const useCountdown = (seconds: number, isRunning: boolean, onEnd: () => void) => {
  const [left, setLeft] = useState(seconds)

  useEffect(() => {
    if (!isRunning) return
    const id = window.setInterval(() => setLeft((s) => Math.max(0, s - 1)), TICK_MS)
    return () => window.clearInterval(id)
  }, [isRunning])

  useEffect(() => {
    if (isRunning && left === 0) onEnd()
  }, [isRunning, left, onEnd])

  return { left, restart: () => setLeft(seconds) }
}
