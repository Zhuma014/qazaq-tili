import { VIRTUES } from '@/data/abai/lesson'
import { CUP_LEVELS, MOODS, REFLECTION_METHODS, TRAFFIC_LIGHTS } from '@/data/abai/reflection'
import { kkAbai } from '@/i18n/kkAbai'
import { countBy } from '@/lib/abaiAnswers'
import type { LiveMessage } from '@/lib/liveBoard'
import type { ReflectionAnswer, TrafficLight } from '@/types/abai'

type Answers = readonly LiveMessage<ReflectionAnswer>[]

interface BarRow {
  id: string
  icon: string
  label: string
  count: number
}

const percent = (count: number, total: number) => (total === 0 ? 0 : Math.round((count / total) * 100))

const BarList = ({ title, rows }: { title: string; rows: readonly BarRow[] }) => {
  const total = rows.reduce((sum, r) => sum + r.count, 0)
  return (
    <section className="result-card">
      <h3>{title}</h3>
      <ul className="bars">
        {rows.map((r) => (
          <li key={r.id} className="bars__row">
            <span className="bars__label">
              {r.icon} {r.label}
            </span>
            <span className="bars__track">
              <span className="bars__fill" style={{ width: `${percent(r.count, total)}%` }} />
            </span>
            <b className="bars__count">{r.count}</b>
          </li>
        ))}
      </ul>
    </section>
  )
}

const namesFor = (answers: Answers, light: TrafficLight) =>
  answers.filter((a) => a.data.light === light).map((a) => ({ id: a.id, name: a.data.name?.trim() || kkAbai.reflection.anonymous }))

const TrafficLightResult = ({ answers }: { answers: Answers }) => {
  const total = answers.length
  const help = namesFor(answers, 'red')
  return (
    <section className="result-card result-card--light">
      <h3>{REFLECTION_METHODS.light.title}</h3>
      <ul className="light-results">
        {TRAFFIC_LIGHTS.map((option) => {
          const count = answers.filter((a) => a.data.light === option.id).length
          return (
            <li key={option.id} className={`light-results__item light-results__item--${option.id}`}>
              <span className="light-results__lamp" aria-hidden="true" />
              <b>{count}</b>
              <span>{option.label}</span>
              <small>{percent(count, total)}%</small>
            </li>
          )
        })}
      </ul>
      {help.length > 0 && (
        <p className="light-results__help">
          {kkAbai.reflection.whoNeedsHelp} {help.map((h) => h.name).join(', ')}
        </p>
      )}
    </section>
  )
}

export const ReflectionResults = ({ answers }: { answers: Answers }) => {
  if (answers.length === 0) return <p className="muted">{kkAbai.reflection.noAnswers}</p>

  const data = answers.map((a) => a.data)
  const withMeta = <T extends string>(options: readonly { id: T; icon: string; label: string }[], values: readonly (T | undefined)[]) =>
    countBy(values, options.map((o) => o.id)).map((c, i) => ({ ...options[i], count: c.count }))
  const sentences = answers.filter((a) => a.data.sentence?.trim())

  return (
    <div className="results">
      <TrafficLightResult answers={answers} />
      <div className="results__grid">
        <BarList title={REFLECTION_METHODS.cup.title} rows={withMeta(CUP_LEVELS, data.map((d) => d.cup))} />
        <BarList title={REFLECTION_METHODS.mood.title} rows={withMeta(MOODS, data.map((d) => d.mood))} />
        <BarList
          title={REFLECTION_METHODS.virtue.title}
          rows={countBy(data.map((d) => d.virtue), VIRTUES).map((c) => ({ id: c.id, icon: '✨', label: c.id, count: c.count }))}
        />
      </div>
      {sentences.length > 0 && (
        <section className="result-card">
          <h3>
            {REFLECTION_METHODS.sentence.title} — {kkAbai.reflection.sentences}
          </h3>
          <ul className="sentences">
            {sentences.map((a) => (
              <li key={a.id}>
                «{a.data.sentence}»{a.data.name && <small> — {a.data.name}</small>}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
