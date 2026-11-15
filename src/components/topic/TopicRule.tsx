import { RichText } from '@/components/ui/RichText'
import { kk } from '@/i18n/kk'
import type { Topic } from '@/types/content'

export const TopicRule = ({ topic }: { topic: Topic }) => (
  <div className="rule">
    <section className="card rule__definition">
      <h2 className="section-title">📌 {kk.topic.definition}</h2>
      <RichText as="p" text={topic.definition} className="rule__lead" />
      <div className="rule__questions">
        <span className="rule__questions-label">{kk.topic.questions}:</span>
        {topic.questions.length > 0 ? (
          topic.questions.map((q) => (
            <span key={q} className="question-pill">
              {q}
            </span>
          ))
        ) : (
          <span className="question-pill question-pill--muted">{kk.topic.noQuestions}</span>
        )}
      </div>
    </section>

    <div className="rule__grid">
      {topic.rules.map((r) => (
        <section key={r.title} className="card rule__section">
          <h3>{r.title}</h3>
          {r.paragraphs?.map((p) => <RichText key={p} as="p" text={p} />)}
          {r.bullets && (
            <ul>
              {r.bullets.map((b) => (
                <li key={b}>
                  <RichText text={b} />
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </div>

    {topic.table && (
      <section className="card">
        {topic.table.caption && <h2 className="section-title">📊 {topic.table.caption}</h2>}
        <div className="table-wrap">
          <table className="rule-table">
            <thead>
              <tr>
                {topic.table.headers.map((h) => (
                  <th key={h} scope="col">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {topic.table.rows.map((row) => (
                <tr key={row.join('|')}>
                  {row.map((cell, i) => (
                    <td key={`${i}-${cell}`} data-label={topic.table?.headers[i]}>
                      <RichText text={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    )}

    <section>
      <h2 className="section-title">💡 {kk.topic.examples}</h2>
      <div className="examples">
        {topic.examples.map((e) => (
          <figure key={e.text} className="example">
            {e.emoji && (
              <span className="example__emoji" aria-hidden="true">
                {e.emoji}
              </span>
            )}
            <blockquote>
              <RichText text={e.text} />
            </blockquote>
            {e.note && <figcaption>{e.note}</figcaption>}
          </figure>
        ))}
      </div>
    </section>
  </div>
)
