import { useEffect, useState } from 'react'
import { kk } from '@/i18n/kk'
import { shuffle } from '@/lib/random'
import type { MemoryGame } from '@/types/content'
import { GameIntro } from './GameIntro'
import { GameOver } from './GameOver'

interface MemoryGameViewProps {
  game: MemoryGame
}

interface Card {
  key: string
  pairId: number
  text: string
}

const FLIP_BACK_MS = 900

const buildDeck = (game: MemoryGame): Card[] =>
  shuffle(
    game.pairs.flatMap((p, pairId) => [
      { key: `${pairId}-a`, pairId, text: p.a },
      { key: `${pairId}-b`, pairId, text: p.b },
    ]),
  )

export const MemoryGameView = ({ game }: MemoryGameViewProps) => {
  const [phase, setPhase] = useState<'intro' | 'play' | 'over'>('intro')
  const [deck, setDeck] = useState(() => buildDeck(game))
  const [open, setOpen] = useState<readonly string[]>([])
  const [matched, setMatched] = useState<ReadonlySet<number>>(new Set())
  const [moves, setMoves] = useState(0)

  useEffect(() => {
    if (open.length !== 2) return
    const id = window.setTimeout(() => setOpen([]), FLIP_BACK_MS)
    return () => window.clearTimeout(id)
  }, [open])

  const start = () => {
    setDeck(buildDeck(game))
    setOpen([])
    setMatched(new Set())
    setMoves(0)
    setPhase('play')
  }

  const flip = (card: Card) => {
    if (open.length === 2 || open.includes(card.key) || matched.has(card.pairId)) return
    if (open.length === 0) {
      setOpen([card.key])
      return
    }
    setMoves(moves + 1)
    const first = deck.find((c) => c.key === open[0])
    if (first?.pairId !== card.pairId) {
      setOpen([...open, card.key])
      return
    }
    const next = new Set(matched).add(card.pairId)
    setMatched(next)
    setOpen([])
    if (next.size === game.pairs.length) setPhase('over')
  }

  if (phase === 'intro') return <GameIntro emoji="🃏" description={game.description} onStart={start} />
  if (phase === 'over') return <GameOver message={kk.game.memoryWin(moves)} onAgain={start} />

  return (
    <div className="memory">
      <div className="game-stats">
        <span>👆 {kk.game.moves}: <b>{moves}</b></span>
        <span>✅ {kk.game.pairs}: <b>{matched.size} / {game.pairs.length}</b></span>
      </div>
      <div className="memory__grid">
        {deck.map((card, i) => {
          const isFaceUp = open.includes(card.key) || matched.has(card.pairId)
          return (
            <button
              key={card.key}
              type="button"
              className={`memory-card ${isFaceUp ? 'is-up' : ''} ${matched.has(card.pairId) ? 'is-matched' : ''}`}
              aria-label={isFaceUp ? card.text : `${kk.game.card} ${i + 1}, ${kk.game.hidden}`}
              onClick={() => flip(card)}
            >
              <span className="memory-card__inner">
                <span className="memory-card__back" aria-hidden="true">?</span>
                <span className="memory-card__face">{card.text}</span>
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
