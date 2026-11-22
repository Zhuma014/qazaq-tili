import { PAIR_ROLES, type PairCard } from '@/data/abai/tasks'
import { kkAbai } from '@/i18n/kkAbai'

export const PairCardView = ({ card }: { card: PairCard }) => (
  <article className="pair-card">
    <h2 className="pair-card__title">{kkAbai.wheel.pair(card.number)}</h2>
    <p className="pair-card__situation">{card.situation}</p>
    <ul className="pair-card__roles">
      <li>
        <span aria-hidden="true">🅰️</span> {PAIR_ROLES.a}
      </li>
      <li>
        <span aria-hidden="true">📗</span> {PAIR_ROLES.b}
      </li>
      <li>
        <span aria-hidden="true">🤝</span> {PAIR_ROLES.both}
      </li>
    </ul>
  </article>
)
