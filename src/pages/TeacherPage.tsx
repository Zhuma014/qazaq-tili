import { PageHeader } from '@/components/ui/PageHeader'
import { METHOD_GUIDE } from '@/data/site'
import { TOPICS } from '@/data/topics'
import { kk } from '@/i18n/kk'
import { gameAnswerLines, taskAnswerLines } from '@/lib/answerKey'
import type { Topic } from '@/types/content'

/** Closed <details> hide their content in print, so expand every key first. */
const printKeys = () => {
  document.querySelectorAll<HTMLDetailsElement>('details.key').forEach((d) => {
    d.open = true
  })
  window.print()
}

const TopicKey = ({ topic }: { topic: Topic }) => (
  <details className={`key accent-${topic.color}`}>
    <summary>
      <span aria-hidden="true">{topic.emoji}</span> {topic.title}
    </summary>
    <div className="key__body">
      <h4>{kk.pages.tasksKey}</h4>
      <ol>
        {topic.tasks.map((t) => (
          <li key={t.id}>
            <b>{t.title}.</b>
            <ul>
              {taskAnswerLines(t).map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
      <h4>{kk.pages.gameKey}</h4>
      <ul>
        {gameAnswerLines(topic.game).map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
      <h4>{kk.pages.testKey}</h4>
      <ol className="key__test">
        {topic.test.map((q) => (
          <li key={q.question}>
            {q.options[q.answer]}
          </li>
        ))}
      </ol>
      <h4>{kk.pages.tipsTitle}</h4>
      <ul>
        {topic.teacherTips.map((tip) => (
          <li key={tip}>{tip}</li>
        ))}
      </ul>
    </div>
  </details>
)

export const TeacherPage = () => (
  <>
    <PageHeader emoji="👩‍🏫" title={kk.pages.teacherTitle} lead={kk.pages.teacherLead} color="indigo" />
    <section className="stack">
      <h2 className="section-title">📘 {kk.pages.methodTitle}</h2>
      <div className="rule__grid">
        {METHOD_GUIDE.map((m) => (
          <article key={m.title} className="card rule__section">
            <h3>{m.title}</h3>
            <p>{m.text}</p>
          </article>
        ))}
      </div>
    </section>
    <section className="stack">
      <div className="row-between">
        <h2 className="section-title">🔑 {kk.pages.keysTitle}</h2>
        <button type="button" className="btn btn--ghost no-print" onClick={printKeys}>
          🖨️ {kk.pages.print}
        </button>
      </div>
      {TOPICS.map((t) => (
        <TopicKey key={t.id} topic={t} />
      ))}
    </section>
  </>
)
