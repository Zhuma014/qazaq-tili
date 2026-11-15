import { kk } from '@/i18n/kk'

interface GameOverProps {
  message: string
  onAgain: () => void
}

export const GameOver = ({ message, onAgain }: GameOverProps) => (
  <div className="game-over" role="status">
    <span className="game-over__emoji" aria-hidden="true">
      🏁
    </span>
    <h3>{kk.game.over}</h3>
    <p className="game-over__score">{message}</p>
    <button type="button" className="btn btn--primary" onClick={onAgain}>
      🔄 {kk.game.again}
    </button>
  </div>
)
