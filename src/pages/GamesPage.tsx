import { useState } from 'react'
import { GameView } from '@/components/games/GameView'
import { GradePicker } from '@/components/ui/GradePicker'
import { PageHeader } from '@/components/ui/PageHeader'
import { TOPICS } from '@/data/topics'
import { kk } from '@/i18n/kk'
import { matchesGrade, selectGrade, useProgress } from '@/lib/progressStore'

const ALL = 'all'
const GAME_ICONS = { quickfire: '⚡', memory: '🃏', builder: '🧱' } as const

export const GamesPage = () => {
  const grade = useProgress(selectGrade)
  const [topicFilter, setTopicFilter] = useState<string>(ALL)
  const [activeId, setActiveId] = useState<string | null>(null)

  const visible = TOPICS.filter(
    (t) => (topicFilter === ALL || t.id === topicFilter) && matchesGrade(t.game.grade, grade),
  )
  const active = TOPICS.find((t) => t.id === activeId)

  return (
    <>
      <PageHeader emoji="🎮" title={kk.pages.gamesTitle} lead={kk.pages.gamesLead} color="violet" />
      <div className="filters">
        <label className="field">
          <span>{kk.pages.filterTopic}</span>
          <select value={topicFilter} onChange={(e) => setTopicFilter(e.target.value)}>
            <option value={ALL}>{kk.pages.filterAll}</option>
            {TOPICS.map((t) => (
              <option key={t.id} value={t.id}>
                {t.emoji} {t.title}
              </option>
            ))}
          </select>
        </label>
        <div className="field">
          <span>{kk.grade.label}</span>
          <GradePicker compact />
        </div>
      </div>

      {active && (
        <div className="active-game" id="active-game">
          <GameView game={active.game} gameId={active.id} />
        </div>
      )}

      {visible.length === 0 && <p className="empty">{kk.pages.gamesEmpty}</p>}
      <div className="topic-grid">
        {visible.map((t) => (
          <button
            key={t.id}
            type="button"
            className={`topic-card topic-card--game accent-${t.color} ${t.id === activeId ? 'is-active' : ''}`}
            onClick={() => {
              setActiveId(t.id)
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          >
            <span className="topic-card__emoji" aria-hidden="true">{GAME_ICONS[t.game.kind]}</span>
            <h3 className="topic-card__title">{t.game.title}</h3>
            <p className="topic-card__tagline">{t.emoji} {t.title}</p>
            <span className="topic-card__cta">▶ {kk.pages.play}</span>
          </button>
        ))}
      </div>
    </>
  )
}
