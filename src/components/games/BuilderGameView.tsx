import { useState } from 'react'
import { kk } from '@/i18n/kk'
import { buildWord, hasGap } from '@/lib/buildWord'
import { progressActions, selectGameBest, useProgress } from '@/lib/progressStore'
import { shuffle } from '@/lib/random'
import type { BuilderGame } from '@/types/content'
import { GameIntro } from './GameIntro'
import { GameOver } from './GameOver'

interface BuilderGameViewProps {
  game: BuilderGame
  gameId: string
}

const prepare = (game: BuilderGame) => shuffle(game.items).map((i) => ({ ...i, options: shuffle(i.options) }))

export const BuilderGameView = ({ game, gameId }: BuilderGameViewProps) => {
  const [phase, setPhase] = useState<'intro' | 'play' | 'over'>('intro')
  const [items, setItems] = useState(() => prepare(game))
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [chosen, setChosen] = useState<string | null>(null)
  const best = useProgress(selectGameBest)[gameId]

  const start = () => {
    setItems(prepare(game))
    setIndex(0)
    setScore(0)
    setChosen(null)
    setPhase('play')
  }

  const choose = (option: string) => {
    if (chosen) return
    setChosen(option)
    if (option === items[index].answer) setScore(score + 1)
  }

  const next = () => {
    if (index + 1 >= items.length) {
      progressActions.saveGameScore(gameId, score)
      setPhase('over')
      return
    }
    setIndex(index + 1)
    setChosen(null)
  }

  if (phase === 'intro') {
    return <GameIntro emoji="🧱" description={game.description} best={best} total={game.items.length} onStart={start} />
  }
  if (phase === 'over') return <GameOver message={kk.game.result(score, items.length)} onAgain={start} />

  const item = items[index]
  const isRight = chosen === item.answer
  return (
    <div className="builder">
      <div className="game-stats">
        <span>🧩 {index + 1} / {items.length}</span>
        <span>⭐ {kk.game.score}: <b>{score}</b></span>
      </div>
      <div className={`builder__word ${chosen ? (isRight ? 'is-right' : 'is-wrong') : ''}`} aria-live="polite">
        {chosen ? buildWord(item.stem, item.answer) : buildWord(item.stem, hasGap(item.stem) ? '＿＿' : '-＿＿')}
      </div>
      {item.hint && <p className="builder__hint">💡 {item.hint}</p>}
      <div className="builder__options">
        {item.options.map((o) => (
          <button
            key={o}
            type="button"
            disabled={Boolean(chosen)}
            className={`bucket ${chosen && o === item.answer ? 'is-right' : ''} ${chosen === o && !isRight ? 'is-wrong' : ''}`}
            onClick={() => choose(o)}
          >
            {o}
          </button>
        ))}
      </div>
      {chosen && (
        <button type="button" className="btn btn--primary" onClick={next}>
          {kk.topic.next} →
        </button>
      )}
    </div>
  )
}
