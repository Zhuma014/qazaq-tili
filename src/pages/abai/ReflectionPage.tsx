import { useState } from 'react'
import { QrPanel } from '@/components/abai/QrPanel'
import { ReflectionResults } from '@/components/abai/ReflectionResults'
import { REFLECTION_METHOD } from '@/data/abai/reflection'
import { useLessonSession } from '@/hooks/useLessonSession'
import { kkAbai } from '@/i18n/kkAbai'
import { isReflectionAnswer } from '@/lib/abaiAnswers'
import { topicFor, useLiveMessages } from '@/lib/liveBoard'

const REFLECTION_ANSWER_PATH = '/abai/refleksiya/zhauap'

export const ReflectionPage = () => {
  const { session, restart } = useLessonSession()
  const { messages, status } = useLiveMessages(topicFor(session, 'refleksiya-cup'), isReflectionAnswer)
  const [isShown, setIsShown] = useState(false)

  return (
    <div className="reflection">
      <section className="cup-card">
        <span className="cup-card__icon" aria-hidden="true">☕</span>
        <h2>{REFLECTION_METHOD.title}</h2>
        <p className="cup-card__question">{REFLECTION_METHOD.question}</p>
        <ul className="cup-card__options">
          {REFLECTION_METHOD.options.map((o) => (
            <li key={o.id}>
              <span aria-hidden="true">{o.icon}</span> {o.label}
            </li>
          ))}
        </ul>
        <button type="button" className="btn btn--primary btn--lg" onClick={() => setIsShown(!isShown)}>
          {isShown ? kkAbai.reflection.hideResults : kkAbai.reflection.showResults}
        </button>
        {isShown && <ReflectionResults method={REFLECTION_METHOD} answers={messages} />}
      </section>
      <QrPanel path={REFLECTION_ANSWER_PATH} session={session} answerCount={messages.length} status={status} onRestart={restart} />
    </div>
  )
}
