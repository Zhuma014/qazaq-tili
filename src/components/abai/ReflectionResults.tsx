import type { ReflectionMethod } from '@/data/abai/reflection'
import { kkAbai } from '@/i18n/kkAbai'
import type { LiveMessage } from '@/lib/liveBoard'
import type { ReflectionAnswer } from '@/types/abai'

interface ReflectionResultsProps {
  method: ReflectionMethod
  answers: readonly LiveMessage<ReflectionAnswer>[]
}

const percent = (count: number, total: number) => (total === 0 ? 0 : Math.round((count / total) * 100))

export const ReflectionResults = ({ method, answers }: ReflectionResultsProps) => {
  if (answers.length === 0) return <p className="muted">{kkAbai.reflection.noAnswers}</p>

  return (
    <section className="result-card">
      <h3>{method.title}</h3>
      <ul className="bars">
        {method.options.map((o) => {
          const count = answers.filter((a) => a.data.value === o.id).length
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
    </section>
  )
}
