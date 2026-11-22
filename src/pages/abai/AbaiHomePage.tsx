import { Link } from 'react-router-dom'
import { CafeDecor } from '@/components/abai/CafeDecor'
import { QuoteCard } from '@/components/abai/QuoteCard'
import { ABAI_QUOTES, ABAI_STAGES, ENEMIES, LESSON_SUBTITLE, LESSON_TITLE, VIRTUES } from '@/data/abai/lesson'
import { kkAbai } from '@/i18n/kkAbai'

const portrait = `${import.meta.env.BASE_URL}abai/abai-portrait.jpg`
const firstStage = ABAI_STAGES[0]

const QualityColumn = ({ title, items, tone }: { title: string; items: readonly string[]; tone: 'good' | 'bad' }) => (
  <section className={`quality quality--${tone}`}>
    <h2>{title}</h2>
    <ol>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ol>
  </section>
)

export const AbaiHomePage = () => (
  <div className="abai-home">
    <section className="abai-hero">
      <img className="abai-hero__portrait" src={portrait} alt="Абай Құнанбаев" />
      <div className="abai-hero__text">
        <p className="abai-hero__eyebrow">☕ {LESSON_SUBTITLE}</p>
        <h1>{LESSON_TITLE}</h1>
        <p className="abai-hero__welcome">{kkAbai.welcome}</p>
        <p>{kkAbai.welcomeLead}</p>
        {firstStage && (
          <Link to={`/abai/${firstStage.slug}`} className="btn btn--primary btn--lg">
            📖 {kkAbai.start}
          </Link>
        )}
      </div>
      <CafeDecor className="abai-hero__decor" />
    </section>

    <div className="quality-pair">
      <QualityColumn title={`🌿 ${kkAbai.virtuesTitle}`} items={VIRTUES} tone="good" />
      <QualityColumn title={`🍂 ${kkAbai.enemiesTitle}`} items={ENEMIES} tone="bad" />
    </div>

    <div className="quotes-grid">
      {ABAI_QUOTES.map((q) => (
        <QuoteCard key={q.id} quote={q} />
      ))}
    </div>

    <section>
      <h2 className="abai-section-title">🗺️ {kkAbai.lessonMap}</h2>
      <ol className="stage-map">
        {ABAI_STAGES.map((s, i) => (
          <li key={s.slug}>
            <Link to={`/abai/${s.slug}`} className="stage-map__card">
              <span className="stage-map__num">{i + 1}</span>
              <span className="stage-map__emoji" aria-hidden="true">{s.emoji}</span>
              <b>{s.title}</b>
              <small>{s.lead}</small>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  </div>
)
