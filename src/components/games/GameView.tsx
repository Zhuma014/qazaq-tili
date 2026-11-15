import { GradeBadge } from '@/components/ui/GradeBadge'
import type { Game } from '@/types/content'
import { BuilderGameView } from './BuilderGameView'
import { MemoryGameView } from './MemoryGameView'
import { QuickfireGameView } from './QuickfireGameView'

interface GameViewProps {
  game: Game
  gameId: string
}

const GameBody = ({ game, gameId }: GameViewProps) => {
  switch (game.kind) {
    case 'quickfire':
      return <QuickfireGameView game={game} gameId={gameId} />
    case 'memory':
      return <MemoryGameView game={game} />
    case 'builder':
      return <BuilderGameView game={game} gameId={gameId} />
  }
}

export const GameView = ({ game, gameId }: GameViewProps) => (
  <article className="card game">
    <header className="task__head">
      <h2 className="task__title">🎮 {game.title}</h2>
      <GradeBadge band={game.grade} />
    </header>
    <GameBody key={gameId} game={game} gameId={gameId} />
  </article>
)
