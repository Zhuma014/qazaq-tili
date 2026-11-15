import { Link } from 'react-router-dom'
import { PageHeader } from '@/components/ui/PageHeader'
import { TOPICS } from '@/data/topics'
import { kk } from '@/i18n/kk'
import { selectTestBest, useProgress } from '@/lib/progressStore'

export const TestsPage = () => {
  const best = useProgress(selectTestBest)
  return (
    <>
      <PageHeader emoji="📝" title={kk.pages.testsTitle} lead={kk.pages.testsLead} color="teal" />
      <ul className="test-list">
        {TOPICS.map((t) => {
          const score = best[t.id]
          return (
            <li key={t.id} className={`test-row accent-${t.color}`}>
              <span className="test-row__emoji" aria-hidden="true">{t.emoji}</span>
              <div className="test-row__main">
                <h3>{t.title}</h3>
                <p className="muted">
                  🏆 {kk.test.best}: {score !== undefined ? `${score} / ${t.test.length}` : kk.test.notTaken}
                </p>
              </div>
              <Link to={`/taqyryp/${t.id}/test`} className="btn btn--primary">
                {kk.pages.takeTest}
              </Link>
            </li>
          )
        })}
      </ul>
    </>
  )
}
