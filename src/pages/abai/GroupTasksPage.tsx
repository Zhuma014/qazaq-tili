import { GROUP_TASKS, type GroupTask } from '@/data/abai/tasks'
import { kkAbai } from '@/i18n/kkAbai'

const GroupTaskCard = ({ group }: { group: GroupTask }) => (
  <article className={`group-card group-card--${group.kind}`}>
    <header className="group-card__head">
      <span className="group-card__num">{kkAbai.groups.group(group.number)}</span>
      <h2>«{group.name}»</h2>
      <p className="group-card__place">{group.place}</p>
    </header>
    <h3>🧩 {kkAbai.groups.qualities}</h3>
    <p className="group-card__qualities">{group.qualities}</p>
    <h3>📝 {kkAbai.groups.task}</h3>
    <p>{group.task}</p>
    <h3>⚖️ {kkAbai.groups.citizen}</h3>
    <p className="group-card__question">{group.citizenQuestion}</p>
    <h3>🖋️ {kkAbai.groups.authorImage}</h3>
    <p>{group.authorImage}</p>
  </article>
)

export const GroupTasksPage = () => (
  <div className="group-grid">
    {GROUP_TASKS.map((g) => (
      <GroupTaskCard key={g.id} group={g} />
    ))}
  </div>
)
