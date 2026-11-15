import { useState } from 'react'
import { kk } from '@/i18n/kk'
import { shuffle } from '@/lib/random'
import type { MatchTask } from '@/types/content'
import { TaskFooter } from './TaskFooter'
import { useTaskResult } from './useTaskResult'

interface MatchTaskViewProps {
  task: MatchTask
  onSolved?: () => void
}

const PAIR_COLORS = 6
const isEmojiOnly = (s: string) => /^\p{Extended_Pictographic}/u.test(s) && !/\p{L}/u.test(s)

export const MatchTaskView = ({ task, onSolved }: MatchTaskViewProps) => {
  const [lefts] = useState(() => shuffle(task.pairs.map((p) => p.left)))
  const [rights] = useState(() => shuffle(task.pairs.map((p) => p.right)))
  /** left → right */
  const [links, setLinks] = useState<Readonly<Record<string, string>>>({})
  const [activeLeft, setActiveLeft] = useState<string | null>(null)
  const { result, isChecked, check, reset } = useTaskResult(onSolved)

  const linkedLeftOf = (right: string) => Object.keys(links).find((l) => links[l] === right)
  const colorOf = (left: string) => (lefts.indexOf(left) % PAIR_COLORS) + 1

  const pickLeft = (left: string) => {
    if (links[left]) setLinks(Object.fromEntries(Object.entries(links).filter(([l]) => l !== left)))
    setActiveLeft(left)
  }

  const pickRight = (right: string) => {
    const owner = linkedLeftOf(right)
    const withoutOwner = owner ? Object.fromEntries(Object.entries(links).filter(([l]) => l !== owner)) : links
    if (!activeLeft) {
      setLinks(withoutOwner)
      return
    }
    setLinks({ ...withoutOwner, [activeLeft]: right })
    setActiveLeft(null)
  }

  const handleCheck = () => {
    const ok = task.pairs.filter((p) => links[p.left] === p.right).length
    check(ok, task.pairs.length)
  }

  const markOf = (left: string) => {
    if (!isChecked) return ''
    return task.pairs.some((p) => p.left === left && links[left] === p.right) ? 'is-right' : 'is-wrong'
  }

  return (
    <div className="task-body">
      <p className="task-hint">{kk.task.matchHint}</p>
      <div className="match">
        <div className="match__col">
          {lefts.map((left) => {
            const linked = Boolean(links[left])
            return (
              <button
                key={left}
                type="button"
                disabled={isChecked}
                className={`match__item ${isEmojiOnly(left) ? 'match__item--emoji' : ''} ${activeLeft === left ? 'is-active' : ''} ${linked ? `is-linked pair-${colorOf(left)}` : ''} ${markOf(left)}`}
                aria-pressed={activeLeft === left}
                onClick={() => pickLeft(left)}
              >
                {left}
              </button>
            )
          })}
        </div>
        <div className="match__col">
          {rights.map((right) => {
            const owner = linkedLeftOf(right)
            return (
              <button
                key={right}
                type="button"
                disabled={isChecked}
                className={`match__item ${owner ? `is-linked pair-${colorOf(owner)}` : ''} ${owner ? markOf(owner) : ''}`}
                onClick={() => pickRight(right)}
              >
                {owner && isEmojiOnly(owner) && (
                  <span className="match__tag" aria-hidden="true">
                    {owner}
                  </span>
                )}
                {right}
              </button>
            )
          })}
        </div>
      </div>
      <TaskFooter
        result={result}
        canCheck={Object.keys(links).length === task.pairs.length}
        onCheck={handleCheck}
        onReset={() => {
          setLinks({})
          reset()
        }}
      />
    </div>
  )
}
