import { Link } from 'react-router-dom'
import { kk } from '@/i18n/kk'
import { selectDoneTasks, useProgress } from '@/lib/progressStore'
import type { Topic } from '@/types/content'

export const TopicCard = ({ topic }: { topic: Topic }) => {
  const done = useProgress(selectDoneTasks)
  const doneCount = topic.tasks.filter((t) => done[t.id]).length
  return (
    <Link to={`/taqyryp/${topic.id}/ereje`} className={`topic-card accent-${topic.color}`}>
      <span className="topic-card__order">{topic.order}</span>
      <span className="topic-card__emoji" aria-hidden="true">
        {topic.emoji}
      </span>
      <h3 className="topic-card__title">{topic.title}</h3>
      <p className="topic-card__tagline">{topic.tagline}</p>
      <span className="topic-card__progress" aria-label={`${doneCount} / ${topic.tasks.length}`}>
        {topic.tasks.map((t) => (
          <i key={t.id} className={done[t.id] ? 'is-done' : ''} />
        ))}
      </span>
      <span className="topic-card__cta">{kk.sections.openTopic} →</span>
    </Link>
  )
}
