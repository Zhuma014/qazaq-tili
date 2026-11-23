import { useState } from 'react'
import { FortuneWheel } from '@/components/abai/FortuneWheel'
import { NamesEditor } from '@/components/abai/NamesEditor'
import { WheelControls } from '@/components/abai/WheelControls'
import { WinnerOverlay } from '@/components/abai/WinnerOverlay'
import { CLASS_6A_STUDENTS } from '@/data/abai/students'
import { useStoredState } from '@/hooks/useStoredState'
import { useWheelPicker } from '@/hooks/useWheelPicker'
import { kkAbai } from '@/i18n/kkAbai'

// A new key, so devices that already stored the old «N-оқушы» placeholders pick up the class list.
const NAMES_KEY = 'abai-student-names-6a'
const defaultNames = () => [...CLASS_6A_STUDENTS]

export const NameWheelPage = () => {
  const [names, setNames] = useStoredState<string[]>(NAMES_KEY, defaultNames)
  const [isEditing, setIsEditing] = useState(false)
  const picker = useWheelPicker(names.map((name, i) => ({ id: `${i}-${name}`, label: name })))

  const save = (next: string[]) => {
    setNames(next)
    picker.refill()
    setIsEditing(false)
  }

  return (
    <div className="wheel-page">
      <div className="wheel-page__main">
        {picker.items.length > 0 ? (
          <FortuneWheel items={picker.items} onResult={picker.setWinner} ariaLabel={kkAbai.wheel.studentsAria} />
        ) : (
          <p className="muted">{kkAbai.wheel.empty}</p>
        )}
        <WheelControls shouldRemove={picker.shouldRemove} onToggleRemove={picker.setShouldRemove} onRefill={picker.refill} />
      </div>

      <aside className="wheel-page__side">
        {isEditing ? (
          <NamesEditor names={names} onSave={save} onCancel={() => setIsEditing(false)} />
        ) : (
          <button type="button" className="btn btn--secondary" onClick={() => setIsEditing(true)}>
            {kkAbai.wheel.editNames} ({names.length})
          </button>
        )}
      </aside>

      {picker.winner && (
        <WinnerOverlay onContinue={picker.accept}>
          <p className="winner__name">{picker.winner.label}</p>
        </WinnerOverlay>
      )}
    </div>
  )
}
