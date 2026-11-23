import { useEffect, useState } from 'react'
import { playChime } from '@/lib/chime'

const TICK_MS = 250
const MS_PER_SECOND = 1000

type TimerState =
  | { status: 'idle' }
  | { status: 'running'; endsAt: number }
  | { status: 'paused'; leftMs: number }
  | { status: 'done' }

export type TimerStatus = TimerState['status']

/** Classroom countdown measured against the clock, so it stays exact even if the tab is throttled. */
export const useTimer = () => {
  const [state, setState] = useState<TimerState>({ status: 'idle' })
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    if (state.status !== 'running') return
    const id = window.setInterval(() => {
      const time = Date.now()
      setNow(time)
      if (time >= state.endsAt) {
        setState({ status: 'done' })
        playChime()
      }
    }, TICK_MS)
    return () => window.clearInterval(id)
  }, [state])

  const startFrom = (ms: number) => {
    const time = Date.now()
    setNow(time)
    setState({ status: 'running', endsAt: time + ms })
  }

  const leftMs = (() => {
    if (state.status === 'running') return Math.max(0, state.endsAt - now)
    if (state.status === 'paused') return state.leftMs
    return 0
  })()

  return {
    status: state.status,
    leftSeconds: Math.ceil(leftMs / MS_PER_SECOND),
    start: (minutes: number) => startFrom(minutes * 60 * MS_PER_SECOND),
    pause: () => setState({ status: 'paused', leftMs }),
    resume: () => startFrom(leftMs),
    stop: () => setState({ status: 'idle' }),
  }
}

export const formatClock = (seconds: number) => {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}
