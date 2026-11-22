import type { ChoiceMethod, ReflectionMethod } from '@/data/abai/reflection'
import { kkAbai } from '@/i18n/kkAbai'
import type { LiveMessage } from '@/lib/liveBoard'
import type { ReflectionAnswer } from '@/types/abai'

type Answers = readonly LiveMessage<ReflectionAnswer>[]

interface ResultsProps<M extends ReflectionMethod> {
  method: M
  answers: Answers
}

const percent = (count: number, total: number) => (total === 0 ? 0 : Math.round((count / total) * 100))
const countOf = (answers: Answers, id: string) => answers.filter((a) => a.data.value === id).length
const nameOf = (a: LiveMessage<ReflectionAnswer>) => a.data.name?.trim() || kkAbai.reflection.anonymous

const TrafficLightResult = ({ method, answers }: ResultsProps<ChoiceMethod>) => {
  const needHelp = answers.filter((a) => a.data.value === 'red')
  return (
    <>
      <ul className="light-results">
        {method.options.map((o) => {
          const count = countOf(answers, o.id)
          return (
            <li key={o.id} className={`light-results__item light-results__item--${o.id}`}>
              <span className="light-results__lamp" aria-hidden="true" />
              <b>{count}</b>
              <span>{o.label}</span>
              <small>{percent(count, answers.length)}%</small>
            </li>
          )
        })}
      </ul>
      {needHelp.length > 0 && (
        <p className="light-results__help">
          {kkAbai.reflection.whoNeedsHelp} {needHelp.map(nameOf).join(', ')}
        </p>
      )}
    </>
  )
}

const BarResult = ({ method, answers }: ResultsProps<ChoiceMethod>) => (
  <ul className="bars">
    {method.options.map((o) => {
      const count = countOf(answers, o.id)
      return (
        <li key={o.id} className="bars__row">
          <span className="bars__label">
            {o.icon} {o.label}
          </span>
          <span className="bars__track">
            <span className="bars__fill" style={{ width: `${percent(count, answers.length)}%` }} />
          </span>
          <b className="bars__count">{count}</b>
        </li>
      )
    })}
  </ul>
)

const SentenceResult = ({ answers }: { answers: Answers }) => (
  <ul className="sentences">
    {answers.map((a) => (
      <li key={a.id}>
        «{a.data.value}»{a.data.name && <small> — {a.data.name}</small>}
      </li>
    ))}
  </ul>
)

export const ReflectionResults = ({ method, answers }: ResultsProps<ReflectionMethod>) => {
  if (answers.length === 0) return <p className="muted">{kkAbai.reflection.noAnswers}</p>

  return (
    <section className="result-card">
      <h3>{method.title}</h3>
      {method.kind === 'text' && <SentenceResult answers={answers} />}
      {method.kind === 'choice' && method.variant === 'light' && <TrafficLightResult method={method} answers={answers} />}
      {method.kind === 'choice' && method.variant !== 'light' && <BarResult method={method} answers={answers} />}
    </section>
  )
}
