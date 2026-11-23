import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { formatClock, useTimer } from '@/hooks/useTimer'
import { kk } from '@/i18n/kk'

const PRESET_MINUTES = [3, 4, 5, 10] as const
const STUDENT_PAGE_SUFFIX = '/zhauap'

type Timer = ReturnType<typeof useTimer>

const TimerControls = ({ timer }: { timer: Timer }) => (
  <div className="lesson-timer__controls">
    {timer.status === 'running' && (
      <button type="button" className="lesson-timer__btn" onClick={timer.pause}>
        {kk.timer.pause}
      </button>
    )}
    {timer.status === 'paused' && (
      <button type="button" className="lesson-timer__btn" onClick={timer.resume}>
        {kk.timer.resume}
      </button>
    )}
    {timer.status !== 'idle' && (
      <button type="button" className="lesson-timer__btn" onClick={timer.stop}>
        {kk.timer.stop}
      </button>
    )}
  </div>
)

interface TimerPanelProps {
  timer: Timer
  isBig: boolean
  onToggleBig: () => void
  onClose: () => void
}

const TimerPanel = ({ timer, isBig, onToggleBig, onClose }: TimerPanelProps) => (
  <section
    className={`lesson-timer__panel lesson-timer__panel--${timer.status}${isBig ? ' lesson-timer__panel--big' : ''}`}
    role={isBig ? 'dialog' : 'region'}
    aria-modal={isBig || undefined}
    aria-label={kk.timer.title}
  >
    <header className="lesson-timer__head">
      <b>⏱️ {kk.timer.title}</b>
      <button type="button" className="lesson-timer__icon-btn" onClick={onToggleBig}>
        {isBig ? kk.timer.shrink : kk.timer.enlarge}
      </button>
      <button type="button" className="lesson-timer__icon-btn" onClick={onClose} aria-label={kk.timer.close}>
        ✕
      </button>
    </header>
    <p className="lesson-timer__clock" aria-live="off">{formatClock(timer.leftSeconds)}</p>
    {timer.status === 'done' && (
      <p className="lesson-timer__done" role="alert">
        🔔 {kk.timer.done}
      </p>
    )}
    <p className="lesson-timer__choose">{kk.timer.choose}</p>
    <div className="lesson-timer__presets">
      {PRESET_MINUTES.map((m) => (
        <button key={m} type="button" className="lesson-timer__preset" onClick={() => timer.start(m)}>
          {kk.timer.minutes(m)}
        </button>
      ))}
    </div>
    <TimerControls timer={timer} />
  </section>
)

/** Floating countdown (3/4/5/10 min) available on every teacher-facing page. */
export const LessonTimer = () => {
  const { pathname } = useLocation()
  const timer = useTimer()
  const [isOpen, setIsOpen] = useState(false)
  const [isBig, setIsBig] = useState(false)

  if (pathname.endsWith(STUDENT_PAGE_SUFFIX)) return null

  const close = () => {
    setIsOpen(false)
    setIsBig(false)
  }

  return (
    <div className="lesson-timer">
      {isOpen && <TimerPanel timer={timer} isBig={isBig} onToggleBig={() => setIsBig(!isBig)} onClose={close} />}
      {!isOpen && (
        <button
          type="button"
          className={`lesson-timer__toggle lesson-timer__toggle--${timer.status}`}
          onClick={() => setIsOpen(true)}
          aria-label={kk.timer.open}
        >
          <span aria-hidden="true">⏱️</span>
          {timer.status !== 'idle' && <span className="lesson-timer__mini">{formatClock(timer.leftSeconds)}</span>}
        </button>
      )}
    </div>
  )
}
