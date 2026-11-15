import { Link } from 'react-router-dom'
import { AuthorCard } from '@/components/home/AuthorCard'
import { LetterTiles } from '@/components/home/LetterTiles'
import { NAV_ITEMS } from '@/components/layout/navItems'
import { GradePicker } from '@/components/ui/GradePicker'
import { RamHorn } from '@/components/ui/Ornament'
import { TOPICS } from '@/data/topics'
import { kk } from '@/i18n/kk'

const STATS = [
  { value: TOPICS.length, label: kk.home.statsTopics },
  { value: TOPICS.reduce((n, t) => n + t.tasks.length, 0), label: kk.home.statsTasks },
  { value: TOPICS.length, label: kk.home.statsGames },
  { value: TOPICS.reduce((n, t) => n + t.test.length, 0), label: kk.home.statsTests },
]

const PATH_EMOJI = ['📖', '✍️', '🎮', '📝', '📄'] as const

export const HomePage = () => (
  <div className="home">
    <section className="hero">
      <div className="hero__text">
        <RamHorn className="hero__horn" />
        <h1 className="hero__title">{kk.siteName}</h1>
        <p className="hero__slogan">{kk.siteSlogan}</p>
        <p className="hero__lead">{kk.home.heroLead}</p>
        <div className="hero__actions">
          <Link to="/taqyryp/zat-esim/ereje" className="btn btn--primary btn--lg">
            🚀 {kk.home.start}
          </Link>
          <Link to="/oiyndar" className="btn btn--secondary btn--lg">
            🎮 {kk.nav.games}
          </Link>
        </div>
      </div>
      <LetterTiles />
    </section>

    <ul className="stats">
      {STATS.map((s) => (
        <li key={s.label} className="stats__item">
          <b>{s.value}</b>
          <span>{s.label}</span>
        </li>
      ))}
    </ul>

    <section className="card grade-card">
      <div>
        <h2 className="section-title">🎒 {kk.home.gradeTitle}</h2>
        <p>{kk.home.gradeLead}</p>
      </div>
      <GradePicker />
    </section>

    <section>
      <h2 className="section-title">🗺️ {kk.home.pathTitle}</h2>
      <p className="muted">{kk.home.pathLead}</p>
      <ol className="path">
        {kk.home.path.map((step, i) => (
          <li key={step} className="path__step">
            <span className="path__emoji" aria-hidden="true">{PATH_EMOJI[i]}</span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
    </section>

    <section>
      <h2 className="section-title">🧭 {kk.home.sectionsTitle}</h2>
      <div className="section-grid">
        {NAV_ITEMS.map((item) => (
          <Link key={item.to} to={item.to} className="section-tile">
            <span className="section-tile__emoji" aria-hidden="true">{item.emoji}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </section>

    <AuthorCard />
  </div>
)
