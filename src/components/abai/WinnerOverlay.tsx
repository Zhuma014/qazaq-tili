import type { ReactNode } from 'react'
import { kkAbai } from '@/i18n/kkAbai'

interface WinnerOverlayProps {
  children: ReactNode
  onContinue: () => void
}

export const WinnerOverlay = ({ children, onContinue }: WinnerOverlayProps) => (
  <div className="winner" role="dialog" aria-modal="true" aria-label={kkAbai.wheel.winner}>
    <div className="winner__card">
      <p className="winner__label">🎉 {kkAbai.wheel.winner}</p>
      {children}
      <button type="button" className="btn btn--primary btn--lg" onClick={onContinue} autoFocus>
        {kkAbai.wheel.continue}
      </button>
    </div>
  </div>
)
