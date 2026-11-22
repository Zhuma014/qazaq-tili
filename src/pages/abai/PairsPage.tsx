import { useState } from 'react'
import { FortuneWheel } from '@/components/abai/FortuneWheel'
import { PairCardView } from '@/components/abai/PairCardView'
import { WheelControls } from '@/components/abai/WheelControls'
import { WinnerOverlay } from '@/components/abai/WinnerOverlay'
import { PAIR_CARDS } from '@/data/abai/tasks'
import { useWheelPicker } from '@/hooks/useWheelPicker'
import { kkAbai } from '@/i18n/kkAbai'

const PAIR_ITEMS = PAIR_CARDS.map((c) => ({ id: String(c.number), label: kkAbai.wheel.pair(c.number) }))
const cardById = (id: string) => PAIR_CARDS.find((c) => String(c.number) === id)

export const PairsPage = () => {
  const picker = useWheelPicker(PAIR_ITEMS)
  const [openedId, setOpenedId] = useState<string | null>(null)
  const winnerCard = picker.winner ? cardById(picker.winner.id) : undefined
  const openedCard = openedId ? cardById(openedId) : undefined

  return (
    <div className="wheel-page">
      <div className="wheel-page__main">
        {picker.items.length > 0 ? (
          <FortuneWheel items={picker.items} onResult={picker.setWinner} ariaLabel={kkAbai.wheel.allPairs} />
        ) : (
          <p className="muted">{kkAbai.wheel.empty}</p>
        )}
        <WheelControls shouldRemove={picker.shouldRemove} onToggleRemove={picker.setShouldRemove} onRefill={picker.refill} />
      </div>

      <aside className="wheel-page__side">
        <h2 className="abai-section-title">{kkAbai.wheel.allPairs}</h2>
        <ul className="pair-buttons">
          {PAIR_ITEMS.map((p) => (
            <li key={p.id}>
              <button type="button" className={openedId === p.id ? 'pair-btn pair-btn--active' : 'pair-btn'} onClick={() => setOpenedId(p.id)}>
                {p.label}
              </button>
            </li>
          ))}
        </ul>
        {openedCard && <PairCardView card={openedCard} />}
      </aside>

      {winnerCard && (
        <WinnerOverlay onContinue={picker.accept}>
          <PairCardView card={winnerCard} />
        </WinnerOverlay>
      )}
    </div>
  )
}
