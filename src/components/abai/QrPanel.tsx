import { useState } from 'react'
import { studentLink } from '@/hooks/useLessonSession'
import { kkAbai } from '@/i18n/kkAbai'
import type { LiveStatus } from '@/lib/liveBoard'
import { QrImage } from './QrImage'

interface QrPanelProps {
  path: string
  session: string
  answerCount: number
  status: LiveStatus
  onRestart: () => void
}

const STATUS_TEXT: Record<LiveStatus, string> = {
  connecting: kkAbai.live.connecting,
  live: kkAbai.live.online,
  offline: kkAbai.live.offline,
}

export const QrPanel = ({ path, session, answerCount, status, onRestart }: QrPanelProps) => {
  const [isEnlarged, setIsEnlarged] = useState(false)
  const link = studentLink(path, session)

  const restart = () => {
    if (window.confirm(kkAbai.live.newSessionConfirm)) onRestart()
  }

  return (
    <aside className="qr-panel">
      <p className="qr-panel__title">📱 {kkAbai.live.scan}</p>
      <button type="button" className="qr-panel__qr" onClick={() => setIsEnlarged(true)} aria-label={kkAbai.live.enlargeQr}>
        <QrImage value={link} />
      </button>
      <p className="qr-panel__link">
        {kkAbai.live.orOpen}{' '}
        <a href={link} target="_blank" rel="noreferrer">
          {link}
        </a>
      </p>
      <p className={`live-status live-status--${status}`} aria-live="polite">
        <span className="live-status__dot" aria-hidden="true" /> {STATUS_TEXT[status]} • {kkAbai.live.answers(answerCount)}
      </p>
      <p className="qr-panel__session">
        {kkAbai.live.session}: <b>{session}</b> · {kkAbai.live.storeNote}
      </p>
      <button type="button" className="btn btn--ghost" onClick={restart}>
        {kkAbai.live.newSession}
      </button>

      {isEnlarged && (
        <div className="qr-overlay" role="dialog" aria-modal="true" aria-label={kkAbai.live.scan}>
          <p className="qr-overlay__title">📱 {kkAbai.live.scan}</p>
          <QrImage value={link} className="qr qr--huge" />
          <button type="button" className="btn btn--primary btn--lg" onClick={() => setIsEnlarged(false)}>
            {kkAbai.live.shrinkQr}
          </button>
        </div>
      )}
    </aside>
  )
}
