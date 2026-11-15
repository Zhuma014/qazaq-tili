import { useCallback, useState } from 'react'
import { useCountdown } from '@/hooks/useCountdown'
import { kk } from '@/i18n/kk'
import { progressActions, selectGameBest, useProgress } from '@/lib/progressStore'
import { shuffle } from '@/lib/random'
import type { QuickfireGame } from '@/types/content'
import { GameIntro } from './GameIntro'
import { GameOver } from './GameOver'

interface QuickfireGameViewProps {
  game: QuickfireGame
  gameId: string
}

const GAME_SECONDS = 60
const FLASH_MS = 650

type Phase = 'intro' | 'play' | 'over'
type Flash = { isRight: boolean; bucket: string } | null

export const QuickfireGameView = ({ game, gameId }: QuickfireGameViewProps) => {
  const [phase, setPhase] = useState<Phase>('intro')
  const [queue, setQueue] = useState(() => shuffle(game.items))
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [flash, setFlash] = useState<Flash>(null)
  const best = useProgress(selectGameBest)[gameId]

  const finish = useCallback(() => setPhase('over'), [])
  const { left, restart } = useCountdown(GAME_SECONDS, phase === 'play', finish)

  const start = () => {
    setQueue(shuffle(game.items))
    setIndex(0)
    setScore(0)
    setStreak(0)
    setFlash(null)
    restart()
    setPhase('play')
  }

  const answer = (bucket: string) => {
    if (flash) return
    const item = queue[index]
    const isRight = item.bucket === bucket
    const nextScore = isRight ? score + 1 : score
    setScore(nextScore)
    setStreak(isRight ? streak + 1 : 0)
    setFlash({ isRight, bucket: item.bucket })
    window.setTimeout(() => {
      setFlash(null)
      if (index + 1 >= queue.length) {
        progressActions.saveGameScore(gameId, nextScore)
        setPhase('over')
      } else {
        setIndex(index + 1)
      }
    }, FLASH_MS)
  }

  if (phase === 'intro') {
    return <GameIntro emoji="⚡" description={game.description} best={best} total={game.items.length} onStart={start} />
  }
  if (phase === 'over') {
    return <GameOver message={kk.game.result(score, game.items.length)} onAgain={start} />
  }

  const item = queue[index]
  return (
    <div className="quickfire">
      <div className="game-stats">
        <span>⏱ {kk.game.time}: <b>{left}</b></span>
        <span>⭐ {kk.game.score}: <b>{score}</b></span>
        <span>🔥 {kk.game.streak}: <b>{streak}</b></span>
      </div>
      <div className="timer-bar" aria-hidden="true">
        <span className="timer-bar__fill" style={{ inlineSize: `${(left / GAME_SECONDS) * 100}%` }} />
      </div>
      <div
        key={index}
        className={`quickfire__word ${flash ? (flash.isRight ? 'is-right' : 'is-wrong') : ''}`}
        aria-live="polite"
      >
        {item.text}
        {flash && !flash.isRight && <small className="quickfire__correct">→ {flash.bucket}</small>}
      </div>
      <div className={`quickfire__buckets quickfire__buckets--${game.buckets.length}`}>
        {game.buckets.map((b) => (
          <button key={b} type="button" className="bucket" onClick={() => answer(b)} disabled={Boolean(flash)}>
            {b}
          </button>
        ))}
      </div>
      <p className="quickfire__progress">
        {index + 1} / {queue.length}
      </p>
    </div>
  )
}
