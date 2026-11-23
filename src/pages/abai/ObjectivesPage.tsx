import { LEARNING_OBJECTIVES } from '@/data/abai/lesson'
import { kkAbai } from '@/i18n/kkAbai'

export const ObjectivesPage = () => (
  <section className="objectives">
    <p className="objectives__intro">{kkAbai.objectives.intro}</p>
    <ol className="objectives__list">
      {LEARNING_OBJECTIVES.map((o) => (
        <li key={o.code} className="objectives__item">
          <span className="objectives__code">{o.code}</span>
          <span className="objectives__text">{o.text}</span>
        </li>
      ))}
    </ol>
  </section>
)
