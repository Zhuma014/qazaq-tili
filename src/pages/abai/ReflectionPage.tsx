import { useState } from 'react'
import { QrPanel } from '@/components/abai/QrPanel'
import { ReflectionResults } from '@/components/abai/ReflectionResults'
import { REFLECTION_METHODS } from '@/data/abai/reflection'
import { useLessonSession } from '@/hooks/useLessonSession'
import { kkAbai } from '@/i18n/kkAbai'
import { isReflectionAnswer } from '@/lib/abaiAnswers'
import { topicFor, useLiveMessages } from '@/lib/liveBoard'

const REFLECTION_ANSWER_PATH = '/abai/refleksiya/zhauap'

const METHODS = Object.values(REFLECTION_METHODS)

export const ReflectionPage = () => {
  const { session, restart } = useLessonSession()
  const { messages, status } = useLiveMessages(topicFor(session, 'refleksiya'), isReflectionAnswer)
  const [isShown, setIsShown] = useState(false)

  return (
    <div className="reflection">
      <div className="live-stage">
        <section className="reflection__intro">
          <h2 className="abai-section-title">{kkAbai.reflection.methodsTitle}</h2>
          <ol className="methods">
            {METHODS.map((m) => (
              <li key={m.title} className={m.number === 1 ? 'methods__item methods__item--main' : 'methods__item'}>
                <b>{m.title}</b>
                <span>{m.question}</span>
              </li>
            ))}
          </ol>
          <button type="button" className="btn btn--primary btn--lg" onClick={() => setIsShown(!isShown)}>
            {isShown ? kkAbai.reflection.hideResults : kkAbai.reflection.showResults}
          </button>
        </section>
        <QrPanel path={REFLECTION_ANSWER_PATH} session={session} answerCount={messages.length} status={status} onRestart={restart} />
      </div>

      {isShown && (
        <section className="reflection__results">
          <h2 className="abai-section-title">📊 {kkAbai.reflection.resultsTitle}</h2>
          <ReflectionResults answers={messages} />
        </section>
      )}
    </div>
  )
}
