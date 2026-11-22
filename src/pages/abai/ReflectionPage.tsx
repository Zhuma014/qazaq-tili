import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { QrPanel } from '@/components/abai/QrPanel'
import { ReflectionResults } from '@/components/abai/ReflectionResults'
import { DEFAULT_METHOD_ID, findMethod, REFLECTION_METHODS, type ReflectionMethod } from '@/data/abai/reflection'
import { useLessonSession } from '@/hooks/useLessonSession'
import { kkAbai } from '@/i18n/kkAbai'
import { REFLECTION_GUARDS } from '@/lib/abaiAnswers'
import { topicFor, useLiveMessages } from '@/lib/liveBoard'

const REFLECTION_ANSWER_PATH = '/abai/refleksiya/zhauap'
const METHOD_PARAM = 'm'

const MethodPicker = ({ activeId, onPick }: { activeId: string; onPick: (id: string) => void }) => (
  <ol className="methods">
    {REFLECTION_METHODS.map((m) => (
      <li key={m.id}>
        <button
          type="button"
          className={m.id === activeId ? 'methods__item methods__item--active' : 'methods__item'}
          aria-pressed={m.id === activeId}
          onClick={() => onPick(m.id)}
        >
          <span className="methods__num">{m.number}</span>
          <span>
            <b>{m.title}</b>
            <span>{m.question}</span>
          </span>
        </button>
      </li>
    ))}
  </ol>
)

/** QR code and results of one method; remounted per method so «show results» starts hidden. */
const MethodBoard = ({ method }: { method: ReflectionMethod }) => {
  const { session, restart } = useLessonSession()
  const { messages, status } = useLiveMessages(topicFor(session, `refleksiya-${method.id}`), REFLECTION_GUARDS[method.id])
  const [isShown, setIsShown] = useState(false)

  return (
    <div className="method-board">
      <QrPanel
        path={REFLECTION_ANSWER_PATH}
        session={session}
        params={{ [METHOD_PARAM]: method.id }}
        answerCount={messages.length}
        status={status}
        onRestart={restart}
      />
      <button type="button" className="btn btn--primary btn--lg" onClick={() => setIsShown(!isShown)}>
        {isShown ? kkAbai.reflection.hideResults : kkAbai.reflection.showResults}
      </button>
      {isShown && <ReflectionResults method={method} answers={messages} />}
    </div>
  )
}

export const ReflectionPage = () => {
  const [params, setParams] = useSearchParams()
  const method = findMethod(params.get(METHOD_PARAM)) ?? findMethod(DEFAULT_METHOD_ID)

  return (
    <div className="reflection">
      <section>
        <h2 className="abai-section-title">{kkAbai.reflection.methodsTitle}</h2>
        <p className="muted">{kkAbai.reflection.pickHint}</p>
        <MethodPicker activeId={method?.id ?? DEFAULT_METHOD_ID} onPick={(id) => setParams({ [METHOD_PARAM]: id }, { replace: true })} />
      </section>
      {method && <MethodBoard key={method.id} method={method} />}
    </div>
  )
}
