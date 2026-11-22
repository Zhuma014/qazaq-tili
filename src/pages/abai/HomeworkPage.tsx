import { CafeDecor } from '@/components/abai/CafeDecor'
import { HOMEWORK, VIRTUES } from '@/data/abai/lesson'
import { kkAbai } from '@/i18n/kkAbai'

export const HomeworkPage = () => (
  <article className="homework">
    <p className="homework__label">🏠 {kkAbai.homework.label}</p>
    <h2 className="homework__title">{HOMEWORK.title}</h2>
    <p className="homework__task">{HOMEWORK.task}</p>
    <p className="homework__choose">{kkAbai.homework.choose}</p>
    <ul className="chips chips--large">
      {VIRTUES.map((v) => (
        <li key={v} className="chip">
          ✨ {v}
        </li>
      ))}
    </ul>
    <p className="homework__volume">✍️ {kkAbai.homework.volume}</p>
    <CafeDecor className="homework__decor" />
  </article>
)
