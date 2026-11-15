import { RamHorn } from '@/components/ui/Ornament'
import { AUTHOR } from '@/data/site'
import { kk } from '@/i18n/kk'

const initials = AUTHOR.name
  .split(' ')
  .map((w) => w[0])
  .join('')

export const AuthorCard = () => (
  <section className="author-card">
    <RamHorn className="author-card__horn" />
    <span className="author-card__avatar" aria-hidden="true">{initials}</span>
    <div>
      <p className="author-card__label">{kk.home.authorTitle}</p>
      <h2 className="author-card__name">{AUTHOR.name}</h2>
      <p>{AUTHOR.role}</p>
      <p className="muted">🏫 {AUTHOR.school}</p>
    </div>
  </section>
)
