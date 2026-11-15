import type { ReactNode } from 'react'

interface FeedbackProps {
  tone: 'success' | 'warning' | 'error'
  children: ReactNode
}

const ICONS = { success: '🎉', warning: '🤔', error: '💡' } as const

export const Feedback = ({ tone, children }: FeedbackProps) => (
  <div className={`feedback feedback--${tone}`} role="status" aria-live="polite">
    <span className="feedback__icon" aria-hidden="true">
      {ICONS[tone]}
    </span>
    <span>{children}</span>
  </div>
)
