import { useEffect, useRef } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { ABAI_QUOTES, ABAI_STAGES, LESSON_SUBTITLE, LESSON_TITLE } from '@/data/abai/lesson'
import { kkAbai } from '@/i18n/kkAbai'
import { QuoteCard } from './QuoteCard'

const stagePath = (slug: string) => `/abai/${slug}`

const StageNav = ({ pathname }: { pathname: string }) => {
  const navRef = useRef<HTMLElement>(null)

  // The stage list is wider than the screen: keep the current stage visible in it.
  useEffect(() => {
    navRef.current?.querySelector('.active')?.scrollIntoView({ inline: 'center', block: 'nearest' })
  }, [pathname])

  return (
    <nav ref={navRef} className="stage-nav" aria-label={kkAbai.lessonMap}>
      <ol>
        {ABAI_STAGES.map((s, i) => (
          <li key={s.slug}>
            <NavLink to={stagePath(s.slug)} className="stage-nav__link">
              <span className="stage-nav__num">{i + 1}</span>
              <span aria-hidden="true">{s.emoji}</span> {s.title}
            </NavLink>
          </li>
        ))}
      </ol>
    </nav>
  )
}

const StagePager = ({ index }: { index: number }) => {
  const prev = ABAI_STAGES[index - 1]
  const next = ABAI_STAGES[index + 1]
  return (
    <nav className="stage-pager">
      <Link to={prev ? stagePath(prev.slug) : '/abai'} className="btn btn--secondary">
        {kkAbai.prev}
      </Link>
      <span className="stage-pager__count">{kkAbai.stageOf(index + 1, ABAI_STAGES.length)}</span>
      {next && (
        <Link to={stagePath(next.slug)} className="btn btn--primary">
          {kkAbai.next}
        </Link>
      )}
    </nav>
  )
}

export const AbaiLayout = () => {
  const { pathname } = useLocation()
  const slug = pathname.replace(/^\/abai\/?/, '')
  const index = ABAI_STAGES.findIndex((s) => s.slug === slug)
  const stage = ABAI_STAGES[index]
  const quote = ABAI_QUOTES[(index + 1) % ABAI_QUOTES.length]

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [pathname])

  return (
    <div className="abai">
      <header className="abai-header">
        <Link to="/" className="abai-header__back">
          {kkAbai.backToSite}
        </Link>
        <Link to="/abai" className="abai-header__brand">
          <span className="abai-header__icon" aria-hidden="true">📚</span>
          <span>
            <b>{LESSON_TITLE}</b>
            <small>{LESSON_SUBTITLE}</small>
          </span>
        </Link>
      </header>
      <StageNav pathname={pathname} />
      <main className="abai-main">
        {stage && (
          <header className="stage-head">
            <span className="stage-head__emoji" aria-hidden="true">{stage.emoji}</span>
            <div>
              <p className="stage-head__count">{kkAbai.stageOf(index + 1, ABAI_STAGES.length)}</p>
              <h1>{stage.title}</h1>
              <p className="stage-head__lead">{stage.lead}</p>
            </div>
          </header>
        )}
        <Outlet />
        {stage && <StagePager index={index} />}
      </main>
      {stage && quote && (
        <footer className="abai-footer">
          <QuoteCard quote={quote} variant="strip" />
        </footer>
      )}
    </div>
  )
}
