import { kk } from '@/i18n/kk'

interface GameIntroProps {
  emoji: string
  description: string
  best?: number
  total?: number
  onStart: () => void
}

export const GameIntro = ({ emoji, description, best, total, onStart }: GameIntroProps) => (
  <div className="game-intro">
    <span className="game-intro__emoji" aria-hidden="true">
      {emoji}
    </span>
    <p>{description}</p>
    {best !== undefined && total !== undefined && (
      <p className="game-intro__best">
        🏆 {kk.game.best}: {best} / {total}
      </p>
    )}
    <button type="button" className="btn btn--primary btn--lg" onClick={onStart}>
      ▶ {kk.game.start}
    </button>
  </div>
)
