import { useState } from 'react'
import { kk } from '@/i18n/kk'
import { shuffle } from '@/lib/random'
import type { SelectTask } from '@/types/content'
import { TaskFooter } from './TaskFooter'
import { useTaskResult } from './useTaskResult'

interface SelectTaskViewProps {
  task: SelectTask
  onSolved?: () => void
}

export const SelectTaskView = ({ task, onSolved }: SelectTaskViewProps) => {
  const [words] = useState(() => shuffle(task.words))
  const [picked, setPicked] = useState<ReadonlySet<string>>(new Set())
  const { result, isChecked, check, reset } = useTaskResult(onSolved)

  const toggle = (text: string) => {
    const next = new Set(picked)
    if (next.has(text)) next.delete(text)
    else next.add(text)
    setPicked(next)
  }

  const handleCheck = () => {
    const ok = words.filter((w) => picked.has(w.text) === w.isCorrect).length
    check(ok, words.length)
  }

  const stateOf = (text: string, isCorrect: boolean) => {
    const isPicked = picked.has(text)
    if (!isChecked) return isPicked ? 'is-picked' : ''
    if (isPicked) return isCorrect ? 'is-right' : 'is-wrong'
    return isCorrect ? 'is-missed' : ''
  }

  return (
    <div className="task-body">
      <p className="task-hint">{kk.task.selectHint}</p>
      <div className="chip-grid">
        {words.map((w) => (
          <button
            key={w.text}
            type="button"
            className={`chip ${w.emoji ? 'chip--pic' : ''} ${stateOf(w.text, w.isCorrect)}`}
            aria-pressed={picked.has(w.text)}
            disabled={isChecked}
            onClick={() => toggle(w.text)}
          >
            {w.emoji && (
              <span className="chip__emoji" aria-hidden="true">
                {w.emoji}
              </span>
            )}
            {w.text}
          </button>
        ))}
      </div>
      <TaskFooter
        result={result}
        canCheck={picked.size > 0}
        onCheck={handleCheck}
        onReset={() => {
          setPicked(new Set())
          reset()
        }}
      />
    </div>
  )
}
