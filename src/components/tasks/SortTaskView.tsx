import { type DragEvent, useState } from 'react'
import { kk } from '@/i18n/kk'
import { shuffle } from '@/lib/random'
import type { SortTask } from '@/types/content'
import { TaskFooter } from './TaskFooter'
import { useTaskResult } from './useTaskResult'

interface SortTaskViewProps {
  task: SortTask
  onSolved?: () => void
}

/** item → group title, absent while the item sits in the pool */
type Placement = Readonly<Record<string, string>>

export const SortTaskView = ({ task, onSolved }: SortTaskViewProps) => {
  const [items] = useState(() => shuffle(task.groups.flatMap((g) => g.items)))
  const [placement, setPlacement] = useState<Placement>({})
  const [active, setActive] = useState<string | null>(null)
  const { result, isChecked, check, reset } = useTaskResult(onSolved)

  const pool = items.filter((i) => !placement[i])
  const groupOf = (item: string) => task.groups.find((g) => g.items.includes(item))?.title

  const place = (item: string, group: string) => {
    setPlacement({ ...placement, [item]: group })
    setActive(null)
  }
  const unplace = (item: string) =>
    setPlacement(Object.fromEntries(Object.entries(placement).filter(([i]) => i !== item)))

  const handleDrop = (e: DragEvent, group: string) => {
    e.preventDefault()
    const item = e.dataTransfer.getData('text/plain')
    if (item) place(item, group)
  }

  const handleCheck = () => check(items.filter((i) => placement[i] === groupOf(i)).length, items.length)

  const markOf = (item: string) => (isChecked ? (placement[item] === groupOf(item) ? 'is-right' : 'is-wrong') : '')

  return (
    <div className="task-body">
      <p className="task-hint">{kk.task.sortHint}</p>
      <div className="sort-pool" aria-label={kk.task.sortPool}>
        {pool.length === 0 && <span className="sort-pool__empty">{kk.task.sortEmpty} ✨</span>}
        {pool.map((item) => (
          <button
            key={item}
            type="button"
            draggable
            onDragStart={(e) => e.dataTransfer.setData('text/plain', item)}
            className={`chip ${active === item ? 'is-picked' : ''}`}
            aria-pressed={active === item}
            onClick={() => setActive(active === item ? null : item)}
          >
            {item}
          </button>
        ))}
      </div>
      <div className={`sort-groups sort-groups--${task.groups.length}`}>
        {task.groups.map((g) => (
          <div
            key={g.title}
            className={`sort-group ${active ? 'is-target' : ''}`}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, g.title)}
          >
            <button
              type="button"
              className="sort-group__title"
              disabled={!active || isChecked}
              onClick={() => active && place(active, g.title)}
            >
              {g.title}
            </button>
            <div className="sort-group__items">
              {items
                .filter((i) => placement[i] === g.title)
                .map((item) => (
                  <button
                    key={item}
                    type="button"
                    disabled={isChecked}
                    className={`chip chip--sm ${markOf(item)}`}
                    onClick={() => unplace(item)}
                  >
                    {item}
                  </button>
                ))}
            </div>
          </div>
        ))}
      </div>
      <TaskFooter
        result={result}
        canCheck={pool.length === 0}
        onCheck={handleCheck}
        onReset={() => {
          setPlacement({})
          reset()
        }}
      />
    </div>
  )
}
